import React, { useEffect, useState, useMemo, useRef } from 'react';
import type { Book, Category, FilterState } from '../types/Book';
import { bookService, INITIAL_CATEGORIES } from '../services/bookService';
import { cartItemApi, orderApi, orderItemApi } from '../services/apiService';
import { Navbar } from '../components/Navbar';
import { CategorySidebar } from '../components/CategorySidebar';
import { BookFilters } from '../components/BookFilters';
import { BookSection } from '../components/BookSection';
import { BookDetailPage } from './BookDetailPage';
import { CartDrawer } from '../components/CartDrawer';
import type { CartItem } from '../components/CartDrawer';
import { CheckoutPage } from './CheckoutPage';

// Simulated past order history — categories/tags the user has previously bought
const ORDER_HISTORY_TAGS = ['Self Help', 'Non-fiction'];

interface HomePageProps {
  userName?: string;
  onLogout?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ userName, onLogout }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Real cart state: list of items with quantities
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Map of bookId → backend cart item id (for PUT/DELETE)
  const cartItemIds = useRef<Map<number | string, number>>(new Map());
  // Mirror of cartItems kept in sync for reads inside event handlers
  const cartItemsRef = useRef<CartItem[]>([]);

  // Simulated order history: book ids the user has "previously purchased"
  const [orderHistory, setOrderHistory] = useState<(number | string)[]>([1, 3]);

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedCategory: 'All',
    language: 'All',
    format: 'All',
    priceRange: 'All',
    sortBy: 'relevance',
    allCategoryClicked: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [fetchedBooks, fetchedCategories] = await Promise.all([
          bookService.getBooks(),
          bookService.getCategories(),
        ]);
        setBooks(fetchedBooks);
        if (fetchedCategories && fetchedCategories.length > 0) {
          setCategories(fetchedCategories);
        }
      } catch (err) {
        console.error('Error fetching books data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      // If user changes a secondary filter while "All" is selected, keep showing flat view
      allCategoryClicked: prev.allCategoryClicked,
    }));
  };

  const handleCategorySelect = (categoryName: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedCategory: categoryName,
      // Track when "All" is explicitly clicked so isFiltered shows the flat full list
      allCategoryClicked: categoryName === 'All',
    }));
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const handleAddToCart = (book: Book) => {
    // Read current cart from ref (safe to read outside updater)
    const existingItem = cartItemsRef.current.find((i) => i.book.id === book.id);

    if (existingItem) {
      const newQty = existingItem.quantity + 1;
      const backendId = cartItemIds.current.get(book.id);
      if (backendId !== undefined) {
        cartItemApi.update(backendId, book.id, newQty).catch(console.error);
      }
      const updated = cartItemsRef.current.map((i) =>
        i.book.id === book.id ? { ...i, quantity: newQty } : i
      );
      cartItemsRef.current = updated;
      setCartItems(updated);
    } else {
      // New item — POST to backend once (outside updater avoids StrictMode double-call)
      cartItemApi.create(book.id, 1)
        .then((res) => cartItemIds.current.set(book.id, res.id))
        .catch(console.error);
      const updated = [...cartItemsRef.current, { book, quantity: 1 }];
      cartItemsRef.current = updated;
      setCartItems(updated);
    }
    // Buying a book adds it to order history
    setOrderHistory((prev) =>
      prev.includes(book.id) ? prev : [...prev, book.id]
    );
    setCartOpen(true);
  };

  const handleRemoveFromCart = (bookId: number | string) => {
    const backendId = cartItemIds.current.get(bookId);
    if (backendId !== undefined) {
      cartItemApi.delete(backendId).catch(console.error);
      cartItemIds.current.delete(bookId);
    }
    const updated = cartItemsRef.current.filter((i) => i.book.id !== bookId);
    cartItemsRef.current = updated;
    setCartItems(updated);
  };

  const handleUpdateQuantity = (bookId: number | string, delta: number) => {
    const existingItem = cartItemsRef.current.find((i) => i.book.id === bookId);
    if (!existingItem) return;
    const newQty = Math.max(1, existingItem.quantity + delta);
    const backendId = cartItemIds.current.get(bookId);
    if (backendId !== undefined) {
      cartItemApi.update(backendId, bookId, newQty).catch(console.error);
    }
    const updated = cartItemsRef.current.map((i) =>
      i.book.id === bookId ? { ...i, quantity: newQty } : i
    );
    cartItemsRef.current = updated;
    setCartItems(updated);
  };

  const handlePlaceOrder = async (cartSnapshot: CartItem[]) => {
    try {
      // 1. Create the order as PENDING
      const order = await orderApi.create();
      // 2. Create an order item for each cart entry
      await orderItemApi.createAll(
        order.id,
        cartSnapshot.map((i) => ({ productId: i.book.id, quantity: i.quantity }))
      );
      // 3. Payment succeeded — confirm the order
      await orderApi.updateStatus(order.id, 'CONFIRMED');
      // 4. Clear the server-side cart
      await cartItemApi.clearCart();
    } catch (err) {
      console.error('Failed to persist order to backend:', err);
    }
    // Always clear local cart regardless of backend result
    cartItemIds.current.clear();
    cartItemsRef.current = [];
    setCartItems([]);
  };

  const handleGoToCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromCheckout = () => {
    setCheckoutOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setSelectedBook(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered & Sorted books
  const processedBooks = useMemo(() => {
    let result = [...books];

    // Filter by Category
    if (filters.selectedCategory && filters.selectedCategory !== 'All') {
      result = result.filter(
        (b) =>
          b.category.toLowerCase() === filters.selectedCategory.toLowerCase() ||
          b.tags.some((t) => t.toLowerCase().includes(filters.selectedCategory.toLowerCase()))
      );
    }

    // Filter by Search Query
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q)
      );
    }

    // Filter by Language
    if (filters.language && filters.language !== 'All') {
      result = result.filter(
        (b) => (b.language || 'English').toLowerCase() === filters.language.toLowerCase()
      );
    }

    // Filter by Format
    if (filters.format && filters.format !== 'All') {
      result = result.filter((b) =>
        b.format.toLowerCase().replace(/\s+/g, '') === filters.format.toLowerCase().replace(/\s+/g, '')
      );
    }

    // Filter by Price Range
    if (filters.priceRange === 'under-200') {
      result = result.filter((b) => b.price < 200);
    } else if (filters.priceRange === '200-400') {
      result = result.filter((b) => b.price >= 200 && b.price <= 400);
    } else if (filters.priceRange === 'above-400') {
      result = result.filter((b) => b.price > 400);
    }

    // Sorting
    if (filters.sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [books, filters]);

  // Show sectioned layout only on the default home state (no active filters, no sidebar click).
  // Clicking "All" in the sidebar sets selectedCategory='All' which still means "show everything"
  // but in a flat list — tracked via a dedicated flag separate from the filter value.
  const isFiltered =
    filters.selectedCategory !== 'All' ||       // specific category selected
    filters.allCategoryClicked ||               // "All" explicitly clicked in sidebar
    filters.searchQuery.trim() !== '' ||
    filters.language !== 'All' ||
    filters.format !== 'All' ||
    filters.priceRange !== 'All' ||
    filters.sortBy !== 'relevance';

  // Order-history-based recommendations:
  // 1. Collect the categories/tags of previously-ordered books
  // 2. Score every un-ordered book by how many of those tags it shares
  // 3. Return the top matches (fallback to section='recommended' if history is empty)
  const recommendedBooks = useMemo(() => {
    const orderedBooks = books.filter((b) => orderHistory.includes(b.id));

    if (orderedBooks.length === 0) {
      // No history yet — fall back to editorially-tagged recommended books
      return processedBooks.filter((b) => b.section === 'recommended' || !b.section);
    }

    // Build a frequency map of tags from ordered books
    const tagFreq: Record<string, number> = {};
    orderedBooks.forEach((b) => {
      b.tags.forEach((t) => { tagFreq[t] = (tagFreq[t] || 0) + 1; });
      // Also weight by category
      tagFreq[b.category] = (tagFreq[b.category] || 0) + 2;
    });

    // Add ORDER_HISTORY_TAGS baseline (simulating historical purchase data)
    ORDER_HISTORY_TAGS.forEach((t) => { tagFreq[t] = (tagFreq[t] || 0) + 1; });

    // Score books not yet ordered, not in cart
    const cartBookIds = cartItems.map((i) => i.book.id);
    const scored = processedBooks
      .filter((b) => !orderHistory.includes(b.id) && !cartBookIds.includes(b.id))
      .map((b) => {
        const score =
          b.tags.reduce((s, t) => s + (tagFreq[t] || 0), 0) +
          (tagFreq[b.category] || 0);
        return { book: b, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.book);

    // If nothing scores, fall back to all processedBooks not yet ordered
    return scored.length > 0
      ? scored
      : processedBooks.filter((b) => !orderHistory.includes(b.id));
  }, [books, processedBooks, orderHistory, cartItems]);

  const bestsellerBooks = useMemo(
    () => processedBooks.filter((b) => b.section === 'bestsellers'),
    [processedBooks]
  );
  const newLaunchBooks = useMemo(
    () => processedBooks.filter((b) => b.section === 'new-launches'),
    [processedBooks]
  );

  /* ── Render checkout page ── */
  if (checkoutOpen) {
    return (
      <div className="min-h-screen bg-[#0d0e12] text-gray-100 flex flex-col font-sans">
        <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} userName={userName} onLogout={onLogout} />
        <CheckoutPage
          items={cartItems}
          onBack={handleBackFromCheckout}
          onUpdateQuantity={handleUpdateQuantity}
          onRemove={handleRemoveFromCart}
          onPlaceOrder={(address) => handlePlaceOrder([...cartItems])}
        />
        <CartDrawer
          open={cartOpen}
          items={cartItems}
          onClose={() => setCartOpen(false)}
          onRemove={handleRemoveFromCart}
          onCheckout={handleGoToCheckout}
        />
      </div>
    );
  }

  /* ── Render book detail page when a book is selected ── */
  if (selectedBook) {
    return (
      <div className="min-h-screen bg-[#0d0e12] text-gray-100 flex flex-col font-sans">
        <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} userName={userName} onLogout={onLogout} />
        <BookDetailPage
          book={selectedBook}
          allBooks={books}
          onBack={handleBackToHome}
          onBookSelect={handleBookClick}
          onAddToCart={handleAddToCart}
        />
        <CartDrawer
          open={cartOpen}
          items={cartItems}
          onClose={() => setCartOpen(false)}
          onRemove={handleRemoveFromCart}
          onCheckout={handleGoToCheckout}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0e12] text-gray-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} userName={userName} onLogout={onLogout} />

      {/* Cart Drawer (portal-style slide-in) */}
      <CartDrawer
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onRemove={handleRemoveFromCart}
        onCheckout={handleGoToCheckout}
      />

      {/* Main Layout: Category Sidebar on Left + Content on Right */}
      <div className="flex flex-1">
        {/* Left Category Sidebar */}
        <CategorySidebar
          categories={categories}
          selectedCategory={filters.selectedCategory}
          onSelectCategory={handleCategorySelect}
        />

        {/* Right Content Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#0d0e12]">
          {/* Top Filters Bar */}
          <BookFilters filters={filters} onFilterChange={handleFilterChange} />

          {/* Book Sections Container */}
          <div className="p-7 max-w-7xl">
            {loading ? (
              <div className="flex items-center justify-center py-20 text-gray-400">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-3"></div>
                <span>Loading books...</span>
              </div>
            ) : isFiltered ? (
              // Filtered results view
              <BookSection
                title={`Books (${processedBooks.length} results)`}
                books={processedBooks}
                onAddToCart={handleAddToCart}
                onBookClick={handleBookClick}
              />
            ) : (
              // Default 3-section layout matching UI design
              <>
                <BookSection
                  title="Recommended for You"
                  books={recommendedBooks}
                  onAddToCart={handleAddToCart}
                  onBookClick={handleBookClick}
                />

                <BookSection
                  title="Bestsellers this Month"
                  books={bestsellerBooks}
                  onAddToCart={handleAddToCart}
                  onBookClick={handleBookClick}
                />

                <BookSection
                  title="New Launches"
                  books={newLaunchBooks}
                  onAddToCart={handleAddToCart}
                  onBookClick={handleBookClick}
                />
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

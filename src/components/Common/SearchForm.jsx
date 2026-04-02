import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { products } from "../../data/product";
import { formatCurrency } from "../../utils/formatCurrency";
import useDebounce from "../../hooks/useDebounce";

const MAX_DROPDOWN_RESULTS = 5;

function SearchForm({
  placeholder = "Search products...",
  className = "",
  onSearchSuccess,
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Debounce the query — only filter after user pauses typing for 300ms
  const debouncedQuery = useDebounce(query, 300);

  const results =
    debouncedQuery.trim().length < 2
      ? []
      : products.filter((p) => {
          const q = debouncedQuery.toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
          );
        });

  const totalMatches = results.length;
  const displayResults = results.slice(0, MAX_DROPDOWN_RESULTS);
  const hasMoreResults = totalMatches > MAX_DROPDOWN_RESULTS;

  useEffect(() => {
    setIsOpen(debouncedQuery.trim().length >= 2);
  }, [debouncedQuery]);

  // Close dropdown when clicking outside the component
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClear = () => {
    setQuery("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleNavigateToResults = () => {
    if (!query.trim()) return;
    navigate(`/product?search=${encodeURIComponent(query.trim())}`);
    setQuery("");
    setIsOpen(false);
    if (onSearchSuccess) onSearchSuccess();
  };

  // Allow pressing Enter to navigate to full results page
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNavigateToResults();
    }
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleResultClick = () => {
    setQuery("");
    setIsOpen(false);
    if (onSearchSuccess) onSearchSuccess();
  };

  return (
    // aria-haspopup + aria-expanded tell screen readers this input controls a listbox
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary size-4 pointer-events-none"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label="Search products"
          aria-autocomplete="list"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-10 pr-8 py-3 rounded-lg bg-section/50 border border-border-main text-text placeholder-secondary focus:outline-none focus:ring-1 focus:ring-primary transition-all text-sm"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-text transition-colors"
          >
            <X size={14} aria-hidden="true" />
          </button>
        )}
      </div>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Search results"
          className="absolute top-full left-0 right-0 mt-1 bg-background border border-border-main rounded-xl shadow-xl z-[100] overflow-hidden"
        >
          {displayResults.length === 0 ? (
            <div className="px-4 py-6 text-center text-secondary text-sm">
              No products found for{" "}
              <span className="font-semibold text-text">
                "{debouncedQuery}"
              </span>
            </div>
          ) : (
            <>
              <ul>
                {displayResults.map((product) => (
                  <li key={product.id} role="option">
                    <Link
                      to={`/products/${product.id}`}
                      onClick={handleResultClick}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-section transition-colors"
                    >
                      <img
                        src={product.image}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-text text-sm font-medium truncate">
                          {product.name}
                        </p>
                        <p className="text-secondary text-xs truncate">
                          {product.category}
                        </p>
                      </div>
                      <span className="text-text text-sm font-semibold shrink-0">
                        {formatCurrency(product.price)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="border-t border-border-main">
                <button
                  type="button"
                  onClick={handleNavigateToResults}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm text-primary hover:bg-section transition-colors font-medium"
                >
                  <span>
                    {hasMoreResults
                      ? `View all ${totalMatches} results for "${debouncedQuery}"`
                      : `View ${totalMatches} result${totalMatches !== 1 ? "s" : ""} for "${debouncedQuery}"`}
                  </span>
                  <ArrowRight size={14} aria-hidden="true" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchForm;

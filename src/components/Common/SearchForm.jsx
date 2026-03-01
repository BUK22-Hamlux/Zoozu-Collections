import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";

function SearchForm({
  placeholder = "Search products...",
  className = "",
  onSearchSuccess,
}) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/product?search=${encodeURIComponent(query)}`);
      setQuery("");
      if (onSearchSuccess) onSearchSuccess();
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary size-4" />
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        optionalClassName="w-full pl-10 bg-section/50 border-border-main focus:ring-1 focus:ring-primary"
      />
    </form>
  );
}

export default SearchForm;

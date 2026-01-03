import { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ value, onChange, placeholder = 'Buscar...' }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div 
      className={`relative flex items-center gap-3 bg-white/5 border rounded-xl px-4 py-3 transition-all duration-200 ${
        isFocused ? 'border-red-600/50 bg-white/10' : 'border-white/10'
      }`}
    >
      <Search className={`w-5 h-5 transition-colors ${isFocused ? 'text-red-600' : 'text-gray-500'}`} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-white placeholder:text-gray-500 text-sm font-medium outline-none"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="p-1 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      )}
    </div>
  );
};
export default SearchBar;


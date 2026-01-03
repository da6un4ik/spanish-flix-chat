const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Buscar …"
      className="w-full px-4 py-3 bg-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none"
    />
  );
};

export default SearchBar;

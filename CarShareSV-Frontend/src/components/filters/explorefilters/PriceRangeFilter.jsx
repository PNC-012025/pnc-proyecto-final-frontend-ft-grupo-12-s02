const PriceRangeFilter = () => {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-700">
      <input
        type="number"
        placeholder="Min $"
        className="bg-white border border-gray-300 rounded-md px-2 py-1 w-20 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <span className="text-gray-400">-</span>
      <input
        type="number"
        placeholder="Max $"
        className="bg-white border border-gray-300 rounded-md px-2 py-1 w-20 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <span className="text-xs text-gray-500 ml-1 whitespace-nowrap">/día</span>
    </div>
  );
};

export default PriceRangeFilter;

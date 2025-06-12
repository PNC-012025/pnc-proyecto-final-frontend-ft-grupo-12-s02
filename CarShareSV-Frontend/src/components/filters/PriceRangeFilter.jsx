const PriceRangeFilter = () => {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-white/30 backdrop-blur-md border text-lg h-12 px-4 font-light">
      <input
        type="number"
        placeholder="Min $"
        className="rounded px-2 py-1 w-20"
      />
      <span>-</span>
      <input
        type="number"
        placeholder="Max $"
        className="rounded px-2 py-1 w-20"
      />
    </div>
  );
};

export default PriceRangeFilter;

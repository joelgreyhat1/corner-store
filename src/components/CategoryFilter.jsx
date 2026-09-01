"use client";

export default function CategoryFilter({ categories, active, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect("")}
        className={`font-mono text-xs uppercase tracking-wide px-3 py-1.5 rounded-full transition ${
          active === "" ? "bg-mustard text-evergreen" : "bg-ivory/10 text-ivory/70 hover:bg-ivory/20"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`font-mono text-xs uppercase tracking-wide px-3 py-1.5 rounded-full transition ${
            active === cat ? "bg-mustard text-evergreen" : "bg-ivory/10 text-ivory/70 hover:bg-ivory/20"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
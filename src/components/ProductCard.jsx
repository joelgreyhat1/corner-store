"use client";

import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <div className="relative bg-ivory rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
      <div className="relative h-44 bg-black/5">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 -right-2 bg-mustard text-evergreen font-mono text-sm font-medium px-3 py-1 rotate-3 shadow">
          ${product.price.toFixed(2)}
        </div>
      </div>
      <div className="p-4">
        <p className="font-mono text-[10px] uppercase tracking-wide text-evergreen/50 mb-1">
          {product.category}
        </p>
        <h3 className="font-display text-base font-semibold text-evergreen mb-1">
          {product.name}
        </h3>
        <p className="text-evergreen/60 text-sm line-clamp-2 mb-3">{product.description}</p>
        <button
          onClick={() => addItem(product)}
          className="w-full bg-evergreen text-ivory rounded-md py-2 text-sm font-medium hover:bg-evergreen/90 transition"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
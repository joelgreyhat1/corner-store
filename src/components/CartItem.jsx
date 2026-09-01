"use client";

import { useCart } from "@/context/CartContext";

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex items-center gap-4 bg-ivory rounded-lg p-4">
      <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded" />
      <div className="flex-1">
        <h3 className="font-display font-semibold text-evergreen">{item.name}</h3>
        <p className="font-mono text-sm text-evergreen/60">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="w-7 h-7 rounded bg-evergreen/10 text-evergreen hover:bg-evergreen/20"
        >
          −
        </button>
        <span className="w-6 text-center font-mono text-sm">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-7 h-7 rounded bg-evergreen/10 text-evergreen hover:bg-evergreen/20"
        >
          +
        </button>
      </div>
      <button
        onClick={() => removeItem(item.id)}
        className="text-rust text-sm hover:underline"
      >
        Remove
      </button>
    </div>
  );
}
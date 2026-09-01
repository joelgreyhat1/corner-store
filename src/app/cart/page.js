"use client";

import { useCart } from "@/context/CartContext";
import CartItem from "@/components/CartItem";
import CartSummary from "@/components/CartSummary";
import Navbar from "@/components/Navbar";

export default function CartPage() {
  const { items } = useCart();

  return (
    <main className="min-h-screen bg-evergreen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="font-display text-3xl font-semibold text-ivory mb-6">Your Cart</h1>

        {items.length === 0 ? (
          <p className="text-ivory/60">Your cart is empty.</p>
        ) : (
          <div className="flex flex-col gap-3 mb-6">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        )}

        {items.length > 0 && <CartSummary />}
      </div>
    </main>
  );
}
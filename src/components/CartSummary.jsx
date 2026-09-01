"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { placeOrder } from "@/lib/orders";
import { createClient } from "@/lib/supabaseClient";

export default function CartSummary() {
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  async function handleCheckout() {
    setError(null);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login?redirect=/cart");
      return;
    }

    setLoading(true);
    try {
      await placeOrder(items, total);
      clearCart();
      router.push("/orders");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-ivory rounded-lg p-5">
      <div className="flex justify-between text-evergreen font-mono text-sm mb-4">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      {error && <p className="text-rust text-sm mb-3">{error}</p>}
      <button
        onClick={handleCheckout}
        disabled={loading || items.length === 0}
        className="w-full bg-mustard text-evergreen font-medium rounded-md py-3 hover:brightness-95 disabled:opacity-50 transition"
      >
        {loading ? "Placing order..." : "Checkout"}
      </button>
    </div>
  );
}
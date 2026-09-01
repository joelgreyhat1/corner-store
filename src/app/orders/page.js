"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import { getOrders } from "@/lib/orders";
import Navbar from "@/components/Navbar";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/login?redirect=/orders");
        return;
      }
      getOrders().then((data) => {
        setOrders(data);
        setLoading(false);
      });
    });
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-evergreen">
        <Navbar />
        <p className="text-ivory/60 text-center mt-10">Loading orders...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-evergreen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="font-display text-3xl font-semibold text-ivory mb-6">Your Orders</h1>

        {orders.length === 0 ? (
          <p className="text-ivory/60">No orders yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-ivory rounded-lg p-5">
                <div className="flex justify-between mb-3">
                  <span className="font-mono text-xs text-evergreen/50">
                    {new Date(order.created_at).toLocaleDateString()}
                  </span>
                  <span className="font-mono text-sm font-medium text-evergreen">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {order.order_items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.products?.image_url}
                        alt={item.products?.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <span className="text-sm text-evergreen">
                        {item.products?.name} × {item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
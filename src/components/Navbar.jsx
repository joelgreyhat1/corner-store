"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { count } = useCart();

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-ivory/10">
      <Link href="/" className="font-display text-xl font-semibold text-ivory">
        The Corner Store
      </Link>
      <div className="flex items-center gap-5">
        <Link href="/orders" className="text-ivory/70 text-sm hover:text-ivory transition">
          Orders
        </Link>
        <Link href="/cart" className="relative text-ivory/70 text-sm hover:text-ivory transition">
          Cart
          {count > 0 && (
            <span className="absolute -top-2 -right-3 bg-rust text-ivory text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              {count}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
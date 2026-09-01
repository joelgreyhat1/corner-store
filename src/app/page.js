"use client";

import { useEffect, useState, useCallback } from "react";
import { getProducts, getCategories } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  const loadProducts = useCallback(async () => {
    try {
      const data = await getProducts({ category: activeCategory });
      setProducts(data);
    } catch (err) {
      console.error(err.message);
    }
  }, [activeCategory]);

  useEffect(() => {
    getCategories().then(setCategories).catch((err) => console.error(err.message));
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <main className="min-h-screen bg-evergreen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="font-display text-3xl font-semibold text-ivory mb-2">Catalog</h1>
        <p className="text-ivory/60 text-sm mb-6">Browse everything we've got.</p>

        <div className="mb-8">
          <CategoryFilter categories={categories} active={activeCategory} onSelect={setActiveCategory} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push(redirect);
    router.refresh();
  }

  return (
    <div className="bg-ivory rounded-2xl p-8 w-full max-w-sm shadow-xl">
      <h1 className="font-display text-2xl font-semibold text-evergreen mb-1">The Corner Store</h1>
      <p className="text-evergreen/60 text-sm mb-6">Welcome back</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-evergreen/20 rounded-lg px-4 py-3 bg-white/60 text-evergreen focus:outline-none focus:ring-2 focus:ring-mustard"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-evergreen/20 rounded-lg px-4 py-3 bg-white/60 text-evergreen focus:outline-none focus:ring-2 focus:ring-mustard"
        />
        {error && <p className="text-rust text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-mustard text-evergreen font-medium rounded-lg py-3 hover:brightness-95 disabled:opacity-50 transition"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <p className="text-evergreen/60 text-sm mt-6 text-center">
        Don't have an account?{" "}
        <a href="/signup" className="text-mustard font-medium hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-evergreen flex items-center justify-center px-4">
      <Suspense fallback={<p className="text-ivory/60">Loading...</p>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
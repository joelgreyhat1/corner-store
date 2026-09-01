"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-evergreen flex items-center justify-center px-4">
      <div className="bg-ivory rounded-2xl p-8 w-full max-w-sm shadow-xl">
        <h1 className="font-display text-2xl font-semibold text-evergreen mb-1">The Corner Store</h1>
        <p className="text-evergreen/60 text-sm mb-6">Create your account</p>

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
            minLength={6}
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
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="text-evergreen/60 text-sm mt-6 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-mustard font-medium hover:underline">
            Log in
          </a>
        </p>
      </div>
    </main>
  );
}
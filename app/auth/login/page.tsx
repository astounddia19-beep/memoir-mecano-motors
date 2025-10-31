"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const auth = useAuth(); // structure attendue : { user, signIn, signInWithGoogle, isLoading }
  const { user } = auth ?? {};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // ne pas pré-remplir avec dernier utilisateur ; effacer si présent
    try { localStorage.removeItem("lastLoggedUser") } catch {}
  }, []);

  useEffect(() => {
    if (user) {
      // déjà connecté -> rediriger accueil
      router.push("/");
    }
  }, [user, router]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      if (auth?.signInWithGoogle) {
        await auth.signInWithGoogle();
        router.push("/");
      } else {
        throw new Error("Connexion Google non configurée");
      }
    } catch (err: any) {
      setError(err?.message ?? "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (auth?.signIn) {
        await auth.signIn(email, password);
        router.push("/");
      } else {
        throw new Error("Authentification non configurée");
      }
    } catch (err: any) {
      setError(err?.message ?? "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Se connecter</h2>

        {error && <div className="mb-4 text-red-600">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="w-full btn-primary p-2 rounded">
            {loading ? "Chargement..." : "Se connecter"}
          </button>
        </form>

        <div className="my-4 text-center">ou</div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full btn-outline p-2 rounded"
        >
          Se connecter avec Google
        </button>

        <p className="mt-4 text-sm">
          Pas de compte ? <Link href="/auth/signup" className="text-primary">S'inscrire</Link>
        </p>
      </div>
    </div>
  );
}
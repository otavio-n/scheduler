"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminLoginForm() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setUser(data.user);

    if (res.ok && data.user.role === "ADMIN") {
      router.push("/admin/agendamentos");
    } else {
      router.push("/cliente/agendamentos");
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-col items-center gap-3">
        <Image src="/logo.svg" alt="Company Logo" width={50} height={50} />
        <h1 className="text-xl font-semibold">Login Admin</h1>
      </div>
      <div className="w-full max-w-md rounded-sm border-1 border-[#d6d6cd] bg-white p-8 shadow-sm">
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-medium">
              E-mail <span className="text-gray-500">(Obrigatório)</span>
            </label>
            <input
              type="email"
              placeholder="seu@email.com"
              className="w-full rounded-md border-1 border-[#d6d6cd] px-3 py-2 text-sm focus:border-black focus:outline-none"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">
              Senha de acesso{" "}
              <span className="text-gray-500">(Obrigatório)</span>
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full rounded-md border-1 border-[#d6d6cd] px-3 py-2 pr-10 text-sm focus:border-black focus:outline-none"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-black py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Acessar conta
          </button>
        </form>
      </div>
    </div>
  );
}

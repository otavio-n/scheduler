"use client";

import { useAuth } from "@/context/AuthContext";
import { Calendar, FileText, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SIDEBAR_ITEMS = [
  {
    label: "Agendamentos",
    href: "/cliente/agendamentos",
    icon: Calendar,
  },
  {
    label: "Logs",
    href: "/cliente/logs",
    icon: FileText,
  },
  {
    label: "Minha Conta",
    href: "/cliente/account",
    icon: User,
  },
];

export default function SidebarCustomer() {
  const { user } = useAuth();
  const pathname = usePathname();
  return (
    <aside className="w-64 border-r bg-[#f7f5f2] flex flex-col justify-between">
      <div>
        <div className="p-6 text-xl font-bold">
          <Image src="/logo.svg" alt="Company Logo" width={50} height={50} />
        </div>

        <nav className="space-y-2 px-4">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-4 py-2 text-sm transition
                  ${
                    isActive
                      ? "bg-black text-white"
                      : "text-black hover:bg-black/5"
                  }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t p-4 text-sm">
        <p className="font-medium">{user?.name}</p>
        <p className="text-gray-500">
          {user?.role === "ADMIN" ? "Admin" : "Cliente"}
        </p>
      </div>
    </aside>
  );
}

"use client";

import { useMemo, useState } from "react";
import { Search, Calendar } from "lucide-react";
import { CUSTOMERS } from "@/data/customers.mock";
import { Customer } from "@/types/customer";

const PER_PAGE = 6;

export default function CustomersTable() {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return CUSTOMERS.filter((c) => {
      const matchName = c.nome.toLowerCase().includes(search.toLowerCase());
      const matchDate = date
        ? c.createdAt.toISOString().split("T")[0] === date
        : true;
      return matchName && matchDate;
    });
  }, [search, date]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const data = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="rounded-lg border bg-white p-6">
      {/* Filters */}
      <div className="mb-4 flex gap-3">
        <Input
          icon={<Search size={16} />}
          placeholder="Filtre por nome"
          value={search}
          onChange={(e: any) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <Input
          icon={<Calendar size={16} />}
          type="date"
          value={date}
          onChange={(e: any) => {
            setDate(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* Table */}
      <table className="w-full text-sm">
        <thead className="border-b text-left text-gray-500">
          <tr>
            <th className="py-3">Data de cadastro</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Permissões</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((cliente) => (
            <Row key={cliente.id} cliente={cliente} />
          ))}
        </tbody>
      </table>

      <Pagination page={page} setPage={setPage} total={totalPages} />
    </div>
  );
}

function Row({ cliente }: { cliente: Customer }) {
  return (
    <tr className="border-b">
      <td className="py-4">{cliente.createdAt.toLocaleString("pt-BR")}</td>

      <td>
        <p className="font-medium">{cliente.nome}</p>
        <p className="text-xs text-gray-500">Cliente</p>
      </td>

      <td>{cliente.endereco}</td>

      <td className="flex gap-2 py-3">
        {cliente.permissoes.agendamentos && <Tag>Agendamentos</Tag>}
        {cliente.permissoes.logs && <Tag>Logs</Tag>}
      </td>

      <td>
        <Toggle active={cliente.ativo} />
      </td>
    </tr>
  );
}

function Input({ icon, ...props }: any) {
  return (
    <div className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
      {icon}
      <input className="outline-none" {...props} />
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border px-3 py-1 text-xs">{children}</span>
  );
}

function Toggle({ active }: { active: boolean }) {
  return (
    <div
      className={`h-5 w-9 rounded-full ${
        active ? "bg-black" : "bg-gray-300"
      } relative`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition ${
          active ? "right-0.5" : "left-0.5"
        }`}
      />
    </div>
  );
}

function Pagination({
  page,
  total,
  setPage,
}: {
  page: number;
  total: number;
  setPage: (p: number) => void;
}) {
  if (total <= 1) return null;

  return (
    <div className="mt-4 flex justify-center gap-2">
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        ‹
      </button>
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          className={page === i + 1 ? "font-bold" : ""}
        >
          {i + 1}
        </button>
      ))}
      <button onClick={() => setPage(page + 1)} disabled={page === total}>
        ›
      </button>
    </div>
  );
}

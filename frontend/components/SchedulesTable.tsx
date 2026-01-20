"use client";

import { Search, Calendar, X, Check } from "lucide-react";
import { useMemo, useState } from "react";
import { Row, Input, PageButton } from "./ui/Row";
import SchedulingAdjustmentsModal from "@/components/SchedulingAdjustmentsModal";

import { SCHEDULES } from "@/data/schedules.mock";

const ITEMS_PER_PAGE = 5;

export default function SchedulesTable() {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredData = useMemo(() => {
    return SCHEDULES.filter((item) => {
      const matchName = item.customer.toLowerCase().includes(search.toLowerCase());

      const matchDate = date
        ? item.date.toISOString().split("T")[0] === date
        : true;

      return matchName && matchDate;
    });
  }, [search, date]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, page]);

  return (
    <div className="rounded-lg border bg-white p-6">
      {/* Filters */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-3">
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

        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-black/90"
        >
          Ajustes de agendamento
        </button>
      </div>

      {/* Table */}
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-gray-500">
            <th className="py-3">Data agendamento</th>
            <th>Nome</th>
            <th>Sala</th>
            <th>Status</th>
            <th>Ação</th>
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((item) => (
            <Row key={item.id} data={item} />
          ))}

          {paginatedData.length === 0 && (
            <tr>
              <td colSpan={5} className="py-6 text-center text-gray-500">
                Nenhum agendamento encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <SchedulingAdjustmentsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          <PageButton
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ‹
          </PageButton>

          {Array.from({ length: totalPages }).map((_, i) => (
            <PageButton
              key={i}
              active={page === i + 1}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </PageButton>
          ))}

          <PageButton
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            ›
          </PageButton>
        </div>
      )}
    </div>
  );
}

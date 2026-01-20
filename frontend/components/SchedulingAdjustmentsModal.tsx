"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SchedulingAdjustmentsModal({ isOpen, onClose }: Props) {
  // Fecha com ESC
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Ajustes de agendamento</h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Nome da sala</label>
            <input
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
              defaultValue="Sala 012"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Horário Inicial & Final da sala
            </label>
            <input
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
              defaultValue="08:00 - 18:00"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Bloco de horários de agendamento
            </label>
            <select className="mt-1 w-full rounded-md border px-3 py-2 text-sm">
              <option>15 minutos</option>
              <option>30 minutos</option>
              <option>60 minutos</option>
            </select>
          </div>

          <button className="flex items-center gap-2 text-sm font-medium">
            + Adicionar nova sala
          </button>
        </div>

        {/* Footer */}
        <button className="mt-6 w-full rounded-md bg-black py-3 text-sm font-semibold text-white hover:bg-black/90">
          Salvar
        </button>
      </div>
    </div>
  );
}

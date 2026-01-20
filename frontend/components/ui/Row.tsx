import { Schedule } from "@/types/schedule";
import { X, Check } from "lucide-react";

export function Input({ icon, ...props }: any) {
  return (
    <div className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
      {icon}
      <input className="outline-none" {...props} />
    </div>
  );
}

export function Row({ data }: { data: Schedule }) {
  return (
    <tr
      className={`border-b ${
        data.status === "AGENDADO"
          ? "bg-emerald-50"
          : data.status === "CANCELADO"
          ? "bg-red-50"
          : ""
      }`}
    >
      <td className="py-4">
        {data.date.toLocaleDateString("pt-BR")} às{" "}
        {data.date.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </td>

      <td>
        <p className="font-medium">{data.customer}</p>
        <p className="text-xs text-gray-500">Cliente</p>
      </td>

      <td>
        <span className="rounded-full bg-black px-3 py-1 text-xs text-white">
          {data.room}
        </span>
      </td>

      <td>
        <StatusBadge status={data.status} />
      </td>

      <td className="flex gap-2 py-3">
        {data.status === "EM_ANALISE" ? (
          <>
            <ActionButton icon={<X size={14} />} />
            <ActionButton icon={<Check size={14} />} />
          </>
        ) : data.status === "AGENDADO" ? (
          <>
            <ActionButton icon={<X size={14} />} />
          </>
        ) : (
          <span />
        )}
      </td>
    </tr>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map = {
    AGENDADO: "border-emerald-400 text-emerald-600",
    CANCELADO: "border-red-400 text-red-600",
    EM_ANALISE: "border-gray-400 text-gray-500",
  };

  const statusMap = {
    AGENDADO: "Agendado",
    CANCELADO: "Cancelado",
    EM_ANALISE: "Em análise",
  };

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs ${
        map[status as keyof typeof map]
      }`}
    >
      {statusMap[status as keyof typeof statusMap]}
    </span>
  );
}

export function ActionButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
      {icon}
    </button>
  );
}

export function PageButton({ active, disabled, children, ...props }: any) {
  return (
    <button
      disabled={disabled}
      className={`h-8 w-8 rounded-md text-sm ${
        active ? "bg-black text-white" : "border"
      } disabled:opacity-40`}
      {...props}
    >
      {children}
    </button>
  );
}

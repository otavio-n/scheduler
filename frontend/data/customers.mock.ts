import { Customer } from "@/types/customer";

export const CUSTOMERS: Customer[] = [
  {
    id: 1,
    nome: "Camila Mendes",
    endereco: "R. Coronel Irineu de Castro nº43, São Paulo - SP",
    createdAt: new Date("2025-01-22T16:00"),
    ativo: true,
    permissoes: { agendamentos: true, logs: true },
  },
  {
    id: 2,
    nome: "Lucas Coutinho",
    endereco: "R. Coronel Irineu de Castro nº43, São Paulo - SP",
    createdAt: new Date("2025-01-22T13:00"),
    ativo: false,
    permissoes: { agendamentos: true, logs: true },
  },
];

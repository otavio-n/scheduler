export type Status = "EM_ANALISE" | "AGENDADO" | "CANCELADO";

export interface Schedule {
  id: number;
  date: Date;
  customer: string;
  room: string;
  status: Status;
}

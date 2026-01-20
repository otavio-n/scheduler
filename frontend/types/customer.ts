export interface Customer {
  id: number;
  nome: string;
  endereco: string;
  createdAt: Date;
  ativo: boolean;
  permissoes: {
    agendamentos: boolean;
    logs: boolean;
  };
}

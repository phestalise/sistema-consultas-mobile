import { Medico } from "./medico";

export interface Paciente {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone?: string;
}

export interface Consulta {
  id: number;
  medico: Medico;
  paciente: Paciente;
  data: Date;
  valor: number;
  status: "agendada" | "confirmada" | "cancelada";
  observacoes?: string;
}
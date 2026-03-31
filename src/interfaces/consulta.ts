import { Medico } from "./medico";


export interface Consulta {
  id: number;
  medico: Medico;
  paciente: Paciente;
  data: Date;
  valor: number;
  status: "agendada" | "confirmada" | "cancelada";
  observacoes: string;
}

export interface Paciente {
  nome: string;
  cpf: string;
  email: string;
  telefone?: string;
}
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Consulta, Paciente } from "../interfaces/consulta";

const KEYS = {
  CONSULTAS: "@consultas",
  PACIENTES: "@pacientes",
  PACIENTE_LOGADO: "@paciente_logado",
};

export async function obterConsultas(): Promise<Consulta[]> {
  const dados = await AsyncStorage.getItem(KEYS.CONSULTAS);
  return dados ? JSON.parse(dados) : [];
}

export async function salvarConsultas(lista: Consulta[]) {
  await AsyncStorage.setItem(KEYS.CONSULTAS, JSON.stringify(lista));
}

export async function obterPacientes(): Promise<Paciente[]> {
  const dados = await AsyncStorage.getItem(KEYS.PACIENTES);
  return dados ? JSON.parse(dados) : [];
}

export async function salvarPacientes(lista: Paciente[]) {
  await AsyncStorage.setItem(KEYS.PACIENTES, JSON.stringify(lista));
}

export async function salvarPacienteLogado(paciente: Paciente) {
  await AsyncStorage.setItem(KEYS.PACIENTE_LOGADO, JSON.stringify(paciente));
}

export async function obterPacienteLogado(): Promise<Paciente | null> {
  const dados = await AsyncStorage.getItem(KEYS.PACIENTE_LOGADO);
  return dados ? JSON.parse(dados) : null;
}

export async function removerPacienteLogado() {
  await AsyncStorage.removeItem(KEYS.PACIENTE_LOGADO);
}

export async function inicializarDados() {
  const pacientes = await obterPacientes();

  if (pacientes.length === 0) {
    const iniciais: Paciente[] = [
      {
        id: 1,
        nome: "Maria Silva",
        cpf: "13110521835",
        email: "maria@email.com",
      },
      {
        id: 2,
        nome: "João Santos",
        cpf: "12345678900",
        email: "joao@email.com",
      },
    ];

    await salvarPacientes(iniciais);
  }
}
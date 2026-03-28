import AsyncStorage from "@react-native-async-storage/async-storage";
import { Consulta } from "../interfaces/consulta";

const KEY = "@consultas";

export async function getConsultas(): Promise<Consulta[]> {
  const json = await AsyncStorage.getItem(KEY);
  return json ? JSON.parse(json) : [];
}

export async function saveConsultas(lista: Consulta[]): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(lista));
}

export async function addConsulta(nova: Consulta): Promise<void> {
  const lista = await getConsultas();
  const novaLista: Consulta[] = [...lista, nova];
  await saveConsultas(novaLista);
}

export async function updateStatus(
  id: number,
  status: "agendada" | "confirmada" | "cancelada"
): Promise<void> {
  const lista = await getConsultas();

  const novaLista: Consulta[] = lista.map((c) => {
    if (c.id === id) {
      return { ...c, status };
    }
    return c;
  });

  await saveConsultas(novaLista);
}
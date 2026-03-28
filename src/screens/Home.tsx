import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Especialidade } from "../types/especialidade";
import { Paciente } from "../types/paciente";
import { Medico } from "../interfaces/medico";
import { Consulta } from "../interfaces/consulta";

import ConsultaCard from "../components/ConsultaCard";
import { styles } from "../styles/app.styles";

import { getConsultas, saveConsultas } from "../services/storage";

export default function Home() {
  const cardiologia: Especialidade = {
    id: 1,
    nome: "Cardiologia",
    descricao: "Cuidados com o coração",
  };

  const medico1: Medico = {
    id: 1,
    nome: "Dr. Roberto Silva",
    crm: "CRM12345",
    especialidade: cardiologia,
    ativo: true,
  };

  const paciente1: Paciente = {
    id: 1,
    nome: "Carlos Andrade",
    cpf: "123.456.789-00",
    email: "carlos@email.com",
    telefone: "(11) 98765-4321",
  };

  const consultaInicial: Consulta = {
    id: 1,
    medico: medico1,
    paciente: paciente1,
    data: new Date(),
    valor: 350,
    status: "agendada",
    observacoes: "Consulta de rotina",
  };

  const [consultas, setConsultas] = useState<Consulta[]>([]);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const dados = await getConsultas();

    if (dados.length === 0) {
      const lista = [consultaInicial];
      setConsultas(lista);
      await saveConsultas(lista);
    } else {
      const listaConvertida = dados.map((c) => ({
        ...c,
        data: new Date(c.data),
      }));
      setConsultas(listaConvertida);
    }
  }

  async function atualizarStatus(id: number, status: "confirmada" | "cancelada") {
    const novaLista = consultas.map((c) =>
      c.id === id ? { ...c, status } : c
    );

    setConsultas(novaLista);
    await saveConsultas(novaLista);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Sistema de Consultas</Text>
        </View>

        {consultas.map((consulta) => (
          <ConsultaCard
            key={consulta.id}
            consulta={consulta}
            onConfirmar={() => atualizarStatus(consulta.id, "confirmada")}
            onCancelar={() => atualizarStatus(consulta.id, "cancelada")}
          />
        ))}
      </ScrollView>
    </View>
  );
}
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Especialidade } from "../types/especialidade";
import { Paciente } from "../types/paciente";
import { Medico } from "../interfaces/medico";
import { Consulta } from "../interfaces/consulta";

import ConsultaCard from "../components/ConsultaCard";
import { styles } from "../styles/app.styles";

const STORAGE_KEY = "@consultas:consulta_atual";

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

  const [consulta, setConsulta] = useState<Consulta>(consultaInicial);

  useEffect(() => {
    carregarConsulta();
  }, []);

  async function carregarConsulta() {
    try {
      const dados = await AsyncStorage.getItem(STORAGE_KEY);

      if (dados) {
        const consultaObj = JSON.parse(dados);
        consultaObj.data = new Date(consultaObj.data);
        setConsulta(consultaObj);
      }
    } catch (erro) {
      console.error("Erro ao carregar:", erro);
    }
  }

  async function salvarConsulta(consultaAtualizada: Consulta) {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(consultaAtualizada)
      );
    } catch (erro) {
      console.error("Erro ao salvar:", erro);
    }
  }

  function confirmarConsulta() {
    const nova = {
      ...consulta,
      status: "confirmada" as const,
    };

    setConsulta(nova);
    salvarConsulta(nova);
  }

  function cancelarConsulta() {
    const nova = {
      ...consulta,
      status: "cancelada" as const,
    };

    setConsulta(nova);
    salvarConsulta(nova);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Sistema de Consultas</Text>
          <Text style={styles.subtitulo}>
            Consulta #{consulta.id}
          </Text>
        </View>

        <ConsultaCard
          consulta={consulta}
          onConfirmar={confirmarConsulta}
          onCancelar={cancelarConsulta}
        />
      </ScrollView>
    </View>
  );
}
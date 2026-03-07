import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";

import { Especialidade } from "./src/types/especialidade";
import { Paciente } from "./src/types/paciente";
import { Medico } from "./src/interfaces/medico";
import { Consulta } from "./src/interfaces/consulta";

import ConsultaCard from "./src/components/ConsultaCard";

export default function App() {

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

  const [consulta, setConsulta] = useState<Consulta>({
    id: 1,
    medico: medico1,
    paciente: paciente1,
    data: new Date(2026, 2, 10),
    valor: 350,
    status: "agendada",
    observacoes: "Consulta de rotina",
  });

  function confirmarConsulta() {
    setConsulta({ ...consulta, status: "confirmada" });
  }

  function cancelarConsulta() {
    setConsulta({ ...consulta, status: "cancelada" });
  }

  return (
    <View
      style={[
        styles.container,
        consulta.status === "confirmada" && styles.containerConfirmado,
        consulta.status === "cancelada" && styles.containerCancelado,
      ]}
    >
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={styles.content}>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1565C0",
  },
  containerConfirmado: {
    backgroundColor: "#2E7D32",
  },
  containerCancelado: {
    backgroundColor: "#C62828",
  },
  content: {
    padding: 24,
    paddingTop: 50,
  },
  header: {
    marginBottom: 25,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  subtitulo: {
    fontSize: 15,
    color: "#FFFFFF",
    opacity: 0.9,
  },
});
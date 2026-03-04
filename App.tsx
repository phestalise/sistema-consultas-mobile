import React, { useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";

import { Especialidade } from "./src/types/especialidade";
import { Paciente } from "./src/types/paciente";
import { Medico } from "./src/interfaces/medico";
import { Consulta } from "./src/interfaces/consulta";

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

  function formatarValor(valor: number): string {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function formatarData(data: Date): string {
    return data.toLocaleDateString("pt-BR");
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
          <Text style={styles.subtitulo}>Consulta #{consulta.id}</Text>
        </View>

        <View style={styles.card}>
          <View
            style={[
              styles.statusBadge,
              consulta.status === "confirmada" && styles.badgeConfirmado,
              consulta.status === "cancelada" && styles.badgeCancelado,
            ]}
          >
            <Text style={styles.statusText}>
              {consulta.status.toUpperCase()}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>MÉDICO</Text>
            <Text style={styles.mainText}>{consulta.medico.nome}</Text>
            <Text style={styles.secondaryText}>
              CRM {consulta.medico.crm}
            </Text>
            <Text style={styles.secondaryText}>
              {consulta.medico.especialidade.nome}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PACIENTE</Text>
            <Text style={styles.mainText}>{consulta.paciente.nome}</Text>
            <Text style={styles.secondaryText}>
              CPF {consulta.paciente.cpf}
            </Text>
            <Text style={styles.secondaryText}>
              {consulta.paciente.email}
            </Text>
            {consulta.paciente.telefone && (
              <Text style={styles.secondaryText}>
                {consulta.paciente.telefone}
              </Text>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CONSULTA</Text>
            <Text style={styles.mainText}>
              {formatarData(consulta.data)}
            </Text>
            <Text style={styles.mainText}>
              {formatarValor(consulta.valor)}
            </Text>
            {consulta.observacoes && (
              <Text style={styles.obs}>
                {consulta.observacoes}
              </Text>
            )}
          </View>

          {consulta.status === "agendada" && (
            <View style={styles.actions}>
              <View style={styles.buttonWrapper}>
                <Button
                  title="Confirmar Consulta"
                  onPress={confirmarConsulta}
                  color="#2E7D32"
                />
              </View>

              <View style={styles.buttonWrapper}>
                <Button
                  title="Cancelar Consulta"
                  onPress={cancelarConsulta}
                  color="#C62828"
                />
              </View>
            </View>
          )}

          {consulta.status === "confirmada" && (
            <Text style={styles.msgConfirmado}>
              Consulta confirmada com sucesso
            </Text>
          )}

          {consulta.status === "cancelada" && (
            <Text style={styles.msgCancelado}>
              Consulta cancelada
            </Text>
          )}
        </View>
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
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 22,
    elevation: 6,
  },
  statusBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#42A5F5",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20,
  },
  badgeConfirmado: {
    backgroundColor: "#2E7D32",
  },
  badgeCancelado: {
    backgroundColor: "#C62828",
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 6,
  },
  mainText: {
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryText: {
    fontSize: 14,
    color: "#555",
  },
  obs: {
    marginTop: 8,
    fontSize: 13,
    fontStyle: "italic",
    color: "#666",
  },
  actions: {
    marginTop: 10,
  },
  buttonWrapper: {
    marginBottom: 12,
  },
  msgConfirmado: {
    marginTop: 15,
    color: "#2E7D32",
    fontWeight: "bold",
    textAlign: "center",
  },
  msgCancelado: {
    marginTop: 15,
    color: "#C62828",
    fontWeight: "bold",
    textAlign: "center",
  },
});
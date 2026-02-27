import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

type Consulta = {
  id: number;
  paciente: string;
  medico: string;
  data: string;
  status: "agendada" | "confirmada" | "cancelada" | "realizada";
};

export default function App() {
  const [consulta, setConsulta] = useState<Consulta>({
    id: 1,
    paciente: "Carlos Andrade",
    medico: "Dr. Roberto Silva",
    data: "28/02/2026",
    status: "agendada",
  });

  function confirmarConsulta() {
    setConsulta({
      ...consulta,
      status: "confirmada",
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sistema de Consultas</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Paciente</Text>
        <Text style={styles.valor}>{consulta.paciente}</Text>

        <Text style={styles.label}>Médico</Text>
        <Text style={styles.valor}>{consulta.medico}</Text>

        <Text style={styles.label}>Data</Text>
        <Text style={styles.valor}>{consulta.data}</Text>

        <Text style={styles.label}>Status</Text>
        <Text
          style={[
            styles.status,
            consulta.status === "confirmada"
              ? styles.confirmada
              : styles.agendada,
          ]}
        >
          {consulta.status}
        </Text>

        {consulta.status === "agendada" && (
          <View style={styles.botao}>
            <Button title="Confirmar Consulta" onPress={confirmarConsulta} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 30,
  },
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 25,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  label: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 10,
  },
  valor: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 15,
  },
  confirmada: {
    color: "#16A34A",
  },
  agendada: {
    color: "#F59E0B",
  },
  botao: {
    marginTop: 10,
  },
});
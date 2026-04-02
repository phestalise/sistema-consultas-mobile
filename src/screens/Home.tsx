import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFocusEffect } from "@react-navigation/native";
import { Consulta } from "../interfaces/consulta";
import ConsultaCard from "../components/ConsultaCard";
import { styles } from "../styles/app.styles";
import {
  obterConsultas,
  salvarConsultas,
  obterPacienteLogado,
  removerPacienteLogado,
} from "../services/storage";

export default function Home({ navigation }: any) {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [nomePaciente, setNomePaciente] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      carregar();
    }, [])
  );

  async function carregar() {
    const paciente = await obterPacienteLogado();

    if (!paciente) {
      navigation.replace("Login");
      return;
    }

    setNomePaciente(paciente.nome);

    const todas = await obterConsultas();

    const filtradas = todas.filter(
      (c) => c.paciente.id === paciente.id
    );

    setConsultas(filtradas);
  }

  async function confirmar(id: number) {
    const todas = await obterConsultas();

    const atualizadas: Consulta[] = todas.map((c) =>
      c.id === id ? { ...c, status: "confirmada" as const } : c
    );

    await salvarConsultas(atualizadas);
    carregar();
  }

  async function cancelar(id: number) {
    const todas = await obterConsultas();

    const atualizadas: Consulta[] = todas.map((c) =>
      c.id === id ? { ...c, status: "cancelada" as const } : c
    );

    await salvarConsultas(atualizadas);
    carregar();
  }

  function logout() {
    Alert.alert("Sair", "Deseja sair?", [
      { text: "Cancelar" },
      {
        text: "Sair",
        onPress: async () => {
          await removerPacienteLogado();
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.titulo}>Olá, {nomePaciente}</Text>

        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate("Agendamento")}>
          <Text style={styles.botaoTexto}>Agendar Consulta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={logout}>
          <Text style={styles.botaoTexto}>Sair</Text>
        </TouchableOpacity>

        {consultas.map((c) => (
          <ConsultaCard
            key={c.id}
            consulta={c}
            onConfirmar={() => confirmar(c.id)}
            onCancelar={() => cancelar(c.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
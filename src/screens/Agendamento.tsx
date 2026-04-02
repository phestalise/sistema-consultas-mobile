import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { styles } from "../styles/app.styles";
import {
  obterConsultas,
  salvarConsultas,
  obterPacienteLogado,
} from "../services/storage";

export default function Agendamento({ navigation }: any) {
  const [data, setData] = useState("");

  async function agendar() {
    if (!data) {
      Alert.alert("Erro", "Informe a data");
      return;
    }

    const paciente = await obterPacienteLogado();

    if (!paciente) {
      navigation.replace("Login");
      return;
    }

    const consultas = await obterConsultas();

    const nova = {
      id: Date.now(),
      medico: {
        id: 1,
        nome: "Dr. Teste",
        crm: "123",
        especialidade: { id: 1, nome: "Clínico", descricao: "" },
        ativo: true,
      },
      paciente,
      data: new Date(),
      valor: 300,
      status: "agendada" as const,
      observacoes: "",
    };

    await salvarConsultas([...consultas, nova]);

    Alert.alert("Sucesso", "Consulta agendada");

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Agendamento</Text>

      <TextInput
        style={styles.input}
        placeholder="Data"
        value={data}
        onChangeText={setData}
      />

      <TouchableOpacity style={styles.botao} onPress={agendar}>
        <Text style={styles.botaoTexto}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
}
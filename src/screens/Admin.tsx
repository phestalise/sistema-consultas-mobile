import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { addConsulta } from "../services/storage";
import { styles } from "../styles/app.styles";

export default function Admin({ navigation }: any) {
  const [paciente, setPaciente] = useState("");
  const [medico, setMedico] = useState("");

  async function salvar() {
    if (!paciente || !medico) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    const nova = {
      id: Date.now(),
      status: "agendada",
      data: new Date(),
      valor: 350,
      observacoes: "Criada via Admin",

      paciente: {
        id: Date.now(),
        nome: paciente,
        cpf: "000.000.000-00",
        email: "email@email.com",
        telefone: "",
      },

      medico: {
        id: Date.now(),
        nome: medico,
        crm: "CRM000",
        ativo: true,
        especialidade: {
          id: 1,
          nome: "Clínico Geral",
          descricao: "Atendimento geral",
        },
      },
    };

    await addConsulta(nova);

    Alert.alert("Sucesso", "Consulta criada!");
    navigation.goBack();
  }

  return (
    <View style={[styles.container, { padding: 20 }]}>
      <Text style={{ color: "#fff", fontSize: 20, marginBottom: 20 }}>
        Nova Consulta
      </Text>

      <TextInput
        placeholder="Nome do paciente"
        placeholderTextColor="#ccc"
        style={{
          backgroundColor: "#fff",
          marginBottom: 10,
          padding: 10,
          borderRadius: 8,
        }}
        onChangeText={setPaciente}
      />

      <TextInput
        placeholder="Nome do médico"
        placeholderTextColor="#ccc"
        style={{
          backgroundColor: "#fff",
          marginBottom: 20,
          padding: 10,
          borderRadius: 8,
        }}
        onChangeText={setMedico}
      />

      <Button title="Salvar Consulta" onPress={salvar} />

      <View style={{ marginTop: 10 }}>
        <Button title="Voltar" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}
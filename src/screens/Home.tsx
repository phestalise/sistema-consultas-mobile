import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Consulta } from "../interfaces/consulta";
import ConsultaCard from "../components/ConsultaCard";
import { obterConsultas, salvarConsultas } from "../services/storage";

export default function Home({ navigation }: any) {
  const [consultas, setConsultas] = useState<Consulta[]>([]);

  useEffect(() => {
    carregarConsultas();
  }, []);

  async function carregarConsultas() {
    const consultasSalvas = await obterConsultas();
    setConsultas(consultasSalvas);
  }

  async function confirmarConsulta(consultaId: number) {
    const consultasAtualizadas = consultas.map((c) =>
      c.id === consultaId ? { ...c, status: "confirmada" as const } : c
    );
    setConsultas(consultasAtualizadas);
    await salvarConsultas(consultasAtualizadas);
  }

  async function cancelarConsulta(consultaId: number) {
    const consultasAtualizadas = consultas.map((c) =>
      c.id === consultaId ? { ...c, status: "cancelada" as const } : c
    );
    setConsultas(consultasAtualizadas);
    await salvarConsultas(consultasAtualizadas);
  }

  return (
    <View>
      <StatusBar style="light" />

      <ScrollView>
        <View>
          <Text>Minhas Consultas</Text>
          <Text>{consultas.length} consulta(s) agendada(s)</Text>
        </View>

        {consultas.length === 0 ? (
          <View>
            <Text>Nenhuma consulta agendada ainda</Text>

            <Button
              title="Ir para Admin"
              onPress={() => navigation.navigate("Admin")}
            />
          </View>
        ) : (
          consultas.map((consulta) => (
            <ConsultaCard
              key={consulta.id}
              consulta={consulta}
              onConfirmar={() => confirmarConsulta(consulta.id)}
              onCancelar={() => cancelarConsulta(consulta.id)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}
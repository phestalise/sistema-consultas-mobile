import React from "react";
import { View, Text, Button } from "react-native";
import { Consulta } from "../interfaces/consulta";
import { styles } from "../styles/consultaCard.styles";

type Props = {
  consulta: Consulta;
  onConfirmar?: () => void;
  onCancelar?: () => void;
};

export default function ConsultaCard({
  consulta,
  onConfirmar,
  onCancelar,
}: Props) {
  function formatarValor(valor: number) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function formatarData(data: any) {
    return new Date(data).toLocaleDateString("pt-BR");
  }

  return (
    <View style={styles.card}>
      <View
        style={[
          styles.statusBadge,
          consulta.status === "confirmada" && styles.statusConfirmada,
          consulta.status === "cancelada" && styles.statusCancelada,
        ]}
      >
        <Text style={styles.statusTexto}>
          {consulta.status.toUpperCase()}
        </Text>
      </View>

      <Text>{consulta.medico.nome}</Text>
      <Text>{consulta.paciente.nome}</Text>
      <Text>{formatarData(consulta.data)}</Text>
      <Text>{formatarValor(consulta.valor)}</Text>

      {consulta.status === "agendada" && (
        <>
          {onConfirmar && (
            <Button title="Confirmar" onPress={onConfirmar} />
          )}
          {onCancelar && (
            <Button title="Cancelar" onPress={onCancelar} />
          )}
        </>
      )}
    </View>
  );
}
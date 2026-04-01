
import React from "react";
import { View, Text, Button } from "react-native";
import { Consulta } from "../interfaces/consulta";
import { styles } from "../styles/consultaCard.styles";
type ConsultaCardProps = {
  consulta: Consulta;
  onConfirmar?: () => void;
  onCancelar?: () => void;
};
export default function ConsultaCard({
  consulta,
  onConfirmar,
  onCancelar,
}: ConsultaCardProps) {
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

      <View style={styles.secao}>
        <Text style={styles.label}>Médico</Text>
        <Text style={styles.info}>{consulta.medico.nome}</Text>
        <Text style={styles.info}>{consulta.medico.especialidade.nome}</Text>
      </View>

      <View style={styles.secao}>
        <Text style={styles.label}>Paciente</Text>
        <Text style={styles.info}>{consulta.paciente.nome}</Text>
        <Text style={styles.info}>{consulta.paciente.cpf}</Text>
      </View>

      <View style={styles.secao}>
        <Text style={styles.label}>Data</Text>
        <Text style={styles.info}>{formatarData(consulta.data)}</Text>
      </View>

      <View style={styles.secao}>
        <Text style={styles.label}>Valor</Text>
        <Text style={styles.valor}>{formatarValor(consulta.valor)}</Text>
      </View>

      {consulta.observacoes ? (
        <View style={styles.secao}>
          <Text style={styles.label}>Observações</Text>
          <Text style={styles.observacoes}>{consulta.observacoes}</Text>
        </View>
      ) : null}

      <View style={styles.acoes}>
        {onConfirmar ? (
          <View style={styles.botaoContainer}>
            <Button
              title="Confirmar"
              onPress={onConfirmar}
              disabled={consulta.status === "confirmada"}
            />
          </View>
        ) : null}
        {onCancelar ? (
          <View style={styles.botaoContainer}>
            <Button
              title="Cancelar"
              onPress={onCancelar}
              color="#F44336"
              disabled={consulta.status === "cancelada"}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
}
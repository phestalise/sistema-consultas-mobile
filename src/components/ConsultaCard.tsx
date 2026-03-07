import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Consulta } from "../interfaces/consulta";

interface Props {
  consulta: Consulta;
  onConfirmar: () => void;
  onCancelar: () => void;
}

export default function ConsultaCard({ consulta, onConfirmar, onCancelar }: Props) {

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
        <Text style={styles.secondaryText}>CRM {consulta.medico.crm}</Text>
        <Text style={styles.secondaryText}>
          {consulta.medico.especialidade.nome}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PACIENTE</Text>
        <Text style={styles.mainText}>{consulta.paciente.nome}</Text>
        <Text style={styles.secondaryText}>CPF {consulta.paciente.cpf}</Text>
        <Text style={styles.secondaryText}>{consulta.paciente.email}</Text>

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
          <Text style={styles.obs}>{consulta.observacoes}</Text>
        )}
      </View>

      {consulta.status === "agendada" && (
        <View style={styles.actions}>

          <View style={styles.buttonWrapper}>
            <Button
              title="Confirmar Consulta"
              onPress={onConfirmar}
              color="#2E7D32"
            />
          </View>

          <View style={styles.buttonWrapper}>
            <Button
              title="Cancelar Consulta"
              onPress={onCancelar}
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
  );
}

const styles = StyleSheet.create({
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
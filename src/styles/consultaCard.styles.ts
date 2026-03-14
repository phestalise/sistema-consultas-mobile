import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: "#FFA000",
    marginBottom: 10,
  },
  statusConfirmada: {
    backgroundColor: "#2E7D32",
  },
  statusCancelada: {
    backgroundColor: "#C62828",
  },
  statusTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  secao: {
    marginBottom: 14,
  },
  label: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
  },
  valor: {
    fontSize: 15,
    fontWeight: "600",
  },
  info: {
    fontSize: 13,
    color: "#555",
  },
  observacoes: {
    marginTop: 6,
    fontStyle: "italic",
    color: "#333",
  },
  acoes: {
    marginTop: 10,
  },
  botaoContainer: {
    marginBottom: 8,
  },
  mensagem: {
    backgroundColor: "#C8E6C9",
    padding: 10,
    borderRadius: 6,
  },
  mensagemCancelada: {
    backgroundColor: "#FFCDD2",
    padding: 10,
    borderRadius: 6,
  },
  mensagemTexto: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
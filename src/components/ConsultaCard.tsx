import React from "react";
import { View, Text, Button } from "react-native";
import { Consulta } from "../interfaces/consulta";

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
    <View>
      <View>
        <Text>{consulta.status.toUpperCase()}</Text>
      </View>

      <View>
        <Text>Médico</Text>
        <Text>{consulta.medico.nome}</Text>
        <Text>{consulta.medico.especialidade.nome}</Text>
      </View>

      <View>
        <Text>Paciente</Text>
        <Text>{consulta.paciente.nome}</Text>
        <Text>{consulta.paciente.cpf}</Text>
      </View>

      <View>
        <Text>Data</Text>
        <Text>{formatarData(consulta.data)}</Text>
      </View>

      <View>
        <Text>Valor</Text>
        <Text>{formatarValor(consulta.valor)}</Text>
      </View>

      {consulta.observacoes ? (
        <View>
          <Text>Observações</Text>
          <Text>{consulta.observacoes}</Text>
        </View>
      ) : null}

      <View>
        {onConfirmar ? (
          <View>
            <Button
              title="Confirmar"
              onPress={onConfirmar}
              disabled={consulta.status === "confirmada"}
            />
          </View>
        ) : null}

        {onCancelar ? (
          <View>
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
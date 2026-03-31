import { Consulta } from "../interfaces/consulta";

type ConsultaCardProps = {
  consulta: Consulta;          // OBRIGATÓRIA
  onConfirmar?: () => void;    // OPCIONAL
  onCancelar?: () => void;     // OPCIONAL
};
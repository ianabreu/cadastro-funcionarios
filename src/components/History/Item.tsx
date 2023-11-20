import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { historyProps } from ".";
import styles from "./history.module.css";
interface ItemHistoryProps {
  item: historyProps;
}

const labels = {
  firstName: "Nome",
  lastName: "Sobrenome",
  phone: "Telefone",
  address: "Endereço",
  birth: "Data de Nascimento",
  gender: "Gênero",

  admission: "Data de Admissão",
  wage: "Salário",
  sector: "Setor",
  role: "Cargo",

  status: "Status",
};

const types = {
  promotion: "Promoção",
  contact: "Contato",
  status: "Status",
};
function convertData(timestamp: { seconds: number; nanoseconds: number }) {
  const miliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6;

  const date = new Date(miliseconds);
  const formattedDate = date.toLocaleString("pt-br", {
    dateStyle: "full",
    timeStyle: "medium",
  });
  return formattedDate;
}

const renderObject = (
  prevObj: Record<string, any>,
  newObj: Record<string, any>
) => {
  return Object.entries(newObj).map(([key, value], index) => (
    <div key={index} className={styles.areaItens}>
      {prevObj[key] !== value && key !== "status" ? (
        <Typography borderBottom={"1px solid var(--gray-500)"}>
          <strong>{labels[key as keyof typeof labels]}:</strong> {prevObj[key]}
          <strong style={{ color: "var(--red-500)" }}>
            {" "}
            alterado para:
          </strong>{" "}
          {value}
        </Typography>
      ) : key !== "status" ? (
        <Typography borderBottom={"1px solid var(--gray-500)"}>
          <strong>{labels[key as keyof typeof labels]}:</strong> {value}
        </Typography>
      ) : (
        <Typography borderBottom={"1px solid var(--gray-500)"}>
          <strong>Status:</strong>{" "}
          {prevObj[key] === "ACTIVE"
            ? "Ativo"
            : prevObj[key] === "FIRED"
            ? "Demitido"
            : "Contrato Encerrrado"}
          <strong> alterado para</strong>{" "}
          {value === "ACTIVE"
            ? "Ativo"
            : value === "FIRED"
            ? "Demitido"
            : "Contrato Encerrrado"}
        </Typography>
      )}
    </div>
  ));
};

export function ItemHistory({ item }: ItemHistoryProps) {
  return (
    <Accordion className={styles.acordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div className={styles.header}>
          <Typography variant="subtitle1">
            <strong>Criado em:</strong> {convertData(item.createdAt)}
          </Typography>
          <div
            className={styles.type}
            style={{
              backgroundColor:
                item.type === "status"
                  ? "var(--green-500)"
                  : item.type === "contact"
                  ? "var(--blue-500)"
                  : "var(--red-500)",
            }}
          >
            <span>{types[item.type]}</span>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails className={styles.areaValues}>
        <div className={styles.values}>
          {renderObject(item.prevValue, item.newValue)}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

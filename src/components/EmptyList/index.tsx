import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./empty-list.module.css";

export default function EmptyList() {
  const navigate = useNavigate();

  return (
    <div className={styles.emptyArea}>
      <h6>Ops! Sua lista de funcionários está vazia.</h6>
      <p>Cadastre novos funcionários aqui!</p>
      <Button
        variant="contained"
        size="small"
        onClick={() => navigate("/funcionario")}
      >
        Cadastrar
      </Button>
    </div>
  );
}

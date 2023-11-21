import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import { CardList } from "../../components/CardList";
import { EmployeeContext } from "../../contexts/employee";

import styles from "./dashboard.module.css";

export default function Dashboard() {
  const { employees, loadingEmployee, getEmployees, status, setStatus } =
    useContext(EmployeeContext);
  const navigate = useNavigate();

  return (
    <main className={styles.container}>
      <div className={styles.title}>
        <h1>Funcionários</h1>
        <div className={styles.filter}>
          Filtrar por:
          <Button
            variant="text"
            color={status === "ACTIVE" ? "warning" : "primary"}
            size="large"
            onClick={() => {
              setStatus("ACTIVE");
              getEmployees("ACTIVE");
            }}
          >
            Ativo
          </Button>
          <Button
            variant="text"
            color={status === "FIRED" ? "warning" : "primary"}
            size="large"
            onClick={() => {
              setStatus("FIRED");
              getEmployees("FIRED");
            }}
          >
            Demitido
          </Button>
          <Button
            variant="text"
            color={status === "CONTRACT_END" ? "warning" : "primary"}
            size="large"
            onClick={() => {
              setStatus("CONTRACT_END");
              getEmployees("CONTRACT_END");
            }}
          >
            Contrato Encerrado
          </Button>
        </div>
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate("/funcionario")}
        >
          Novo Funcionário
        </Button>
      </div>
      <div className={styles.content}>
        <CardList
          employees={employees}
          isLoading={loadingEmployee}
          status={status}
        />
      </div>
    </main>
  );
}

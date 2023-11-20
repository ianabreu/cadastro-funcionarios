import { useContext, useRef } from "react";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import styles from "./sections.module.css";
import { Check as Icon } from "@mui/icons-material";
import { EmployeeContext } from "../../contexts/employee";

export default function Sectors() {
  const { sectors, roles, addSector, addRole, deleteSector, deleteRole } =
    useContext(EmployeeContext);
  const sectorRef = useRef<HTMLInputElement | null>(null);
  const roleRef = useRef<HTMLInputElement | null>(null);

  async function handleAdd(type: "sectors" | "roles") {
    let role = roleRef.current?.value;
    let sector = sectorRef.current?.value;

    if (type === "sectors" && sector) {
      if (sector.trim() === "") return;
      addSector(sector);
      sector = "";
    }
    if (type === "roles" && role) {
      if (role.trim() === "") return;
      addRole(role);
    }
    Array.from(document.querySelectorAll("input")).forEach((input) => {
      input.value = "";
    });
  }
  return (
    <main className={styles.container}>
      <div className={styles.title}>
        <h1>Setores e Cargos</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.area}>
          <h5>Setores</h5>
          <TextField
            type="text"
            variant="outlined"
            size="small"
            fullWidth
            label={"Nome do Setor"}
            color="primary"
            inputRef={sectorRef}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      handleAdd("sectors");
                    }}
                    edge="end"
                    color="primary"
                  >
                    <Icon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <div className={styles.listItens}>
            {sectors &&
              sectors.map(({ id, name }) => (
                <section key={id} className={styles.item}>
                  <p>{name}</p>
                  <div>
                    <Button
                      variant="text"
                      color="error"
                      onClick={() => deleteSector(id)}
                    >
                      Excluir
                    </Button>
                  </div>
                </section>
              ))}
          </div>
        </div>
        <div className={styles.area}>
          <h5>Cargos</h5>
          <TextField
            type="text"
            variant="outlined"
            size="small"
            fullWidth
            label={"Nome do Cargo"}
            color="primary"
            inputRef={roleRef}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      handleAdd("roles");
                    }}
                    edge="end"
                    color="primary"
                  >
                    <Icon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <div className={styles.listItens}>
            {roles &&
              roles.map(({ id, name }) => (
                <section key={id} className={styles.item}>
                  <p>{name}</p>
                  <div>
                    <Button
                      variant="text"
                      color="error"
                      onClick={() => deleteRole(id)}
                    >
                      Excluir
                    </Button>
                  </div>
                </section>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}

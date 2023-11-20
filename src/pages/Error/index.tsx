import { Home } from "@mui/icons-material";
import styles from "./error.module.css";
import { Button } from "@mui/material/";
export default function Error() {
  return (
    <div className={styles.error_container}>
      <span>404</span>
      <h6>Página não encontrada!</h6>
      <p>Essa página que está procurando não existe.</p>
      <Button href="/" variant="contained" size="large" endIcon={<Home />}>
        Voltar ao início
      </Button>
    </div>
  );
}

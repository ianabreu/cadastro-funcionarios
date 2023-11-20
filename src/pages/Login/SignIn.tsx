import { FormEvent, useState, useContext } from "react";
import styles from "./signin.module.css";
import "./signin.module.css";

import { AuthContext } from "../../contexts/auth";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Logo } from "../../components/Logo";
import { Typography } from "@mui/material";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext(AuthContext);

  async function handleSignIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (email !== "" && password !== "") {
      await signIn({ email, password });
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.content}>
        <Logo />
        <form className={styles.form} onSubmit={handleSignIn}>
          <Typography variant="h6">Bem vindo!</Typography>

          <TextField
            label="Email"
            variant="outlined"
            type="email"
            size="small"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            label="Senha"
            variant="outlined"
            autoComplete="on"
            type="password"
            size="small"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button className={styles.button} variant="contained" type="submit">
            Acessar
          </Button>
          <Button href="/registrar">Criar uma conta</Button>
        </form>
      </main>
    </div>
  );
}

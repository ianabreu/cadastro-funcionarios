import { FormEvent, useState, useContext } from "react";
import styles from "./signin.module.css";
import "./signin.module.css";

import { AuthContext } from "../../contexts/auth";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Logo } from "../../components/Logo";
import { Typography } from "@mui/material";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp } = useContext(AuthContext);

  async function handleSignUp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email !== "" && password !== "" && email && password) {
      await signUp({ email, password });
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.content}>
        <Logo />
        <form className={styles.form} onSubmit={handleSignUp}>
          <Typography variant="h6">Crie sua conta</Typography>
          <TextField
            id="email"
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
            id="senha"
            label="Senha"
            variant="outlined"
            size="small"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            autoComplete="on"
            type="password"
          />
          <Button className={styles.button} variant="contained" type="submit">
            Cadastrar
          </Button>
          <Button href="/">Já tenho uma conta!</Button>
        </form>
      </main>
    </div>
  );
}

// export default function Login() {

//   const handleLogin = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const email = inputEmail.current?.value;
//     const password = inputPassword.current?.value;

//     if (email === undefined || password === undefined) {
//       alert("Erro, tente novamente!");
//       return;
//     }

//     if (email === "" || password === "") {
//       alert("Preencha todos os campos");
//       return;
//     }
//     signIn({ email, password });
//   };

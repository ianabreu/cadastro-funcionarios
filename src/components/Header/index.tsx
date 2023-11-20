import { useContext } from "react";
import styles from "./header.module.css";
import { AuthContext } from "../../contexts/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import MenuDrawer from "./menu";
import { Logo } from "../Logo";
import { Button, Divider } from "@mui/material";
import { Person, AssignmentInd, Logout } from "@mui/icons-material";

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { logout } = useContext(AuthContext);
  function handleNavigate(path: string) {
    navigate(path);
  }
  async function handleLogout() {
    logout();
  }

  return (
    <header className={styles.header}>
      <div className={styles.header_content}>
        <Logo horizontal />
        <nav className={styles.links}>
          <Link
            to={"/"}
            className={pathname === "/" ? styles.active : undefined}
          >
            <Person />
            <span>Funcionários</span>
          </Link>
          <Divider />
          <Link
            to={"/setores"}
            className={pathname === "/setores" ? styles.active : undefined}
          >
            <AssignmentInd />
            <span>Setores</span>
          </Link>
          <Divider />
          <Button
            startIcon={<Logout />}
            onClick={handleLogout}
            variant="contained"
          >
            Sair
          </Button>
        </nav>
        <MenuDrawer handleLogout={handleLogout} navigate={handleNavigate} />
      </div>
    </header>
  );
}

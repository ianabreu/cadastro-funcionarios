import styles from "./logo.module.css";
import logo from "../../assets/logo1.svg";
import logo2 from "../../assets/logo2.svg";
interface LogoProps {
  horizontal?: boolean;
}
export function Logo({ horizontal = false }: LogoProps) {
  return (
    <div className={styles.logo}>
      <img src={horizontal ? logo2 : logo} alt="Logo da Taugor" />
    </div>
  );
}

import { ReactNode } from "react";
import styles from "./info.module.css";

interface InfoProps {
  label?: string;
  children: ReactNode;
  small?: boolean;
}
export function Info({ label, children, small = false }: InfoProps) {
  return (
    <div className={styles.infoContent} style={{ fontSize: small ? 14 : 16 }}>
      {label && <label style={{ padding: small ? 0 : 4 }}>{label}</label>}
      <span style={{ padding: small ? 0 : 8 }}>{children}</span>
    </div>
  );
}

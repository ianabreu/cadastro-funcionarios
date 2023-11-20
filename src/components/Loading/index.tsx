import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.area}>
      <div className={styles.circle}></div>
      <span className={styles.text}>Carregando</span>
    </div>
  );
}

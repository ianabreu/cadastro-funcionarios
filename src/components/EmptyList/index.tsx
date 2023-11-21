import styles from "./empty-list.module.css";
interface EmptyListProps {
  label: string;
}

export default function EmptyList({ label }: EmptyListProps) {
  return (
    <div className={styles.emptyArea}>
      <h6>{label}</h6>
    </div>
  );
}

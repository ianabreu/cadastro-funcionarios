import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../services/firebaseConnection";
import { TypeUpdateProps } from "../../@types/history";
import styles from "./history.module.css";

import { ItemHistory } from "./Item";

export interface historyProps {
  id: string;
  idEmployee: string;
  newValue: Record<string, any>;
  prevValue: Record<string, any>;
  type: TypeUpdateProps;
  createdAt: any;
}
export default function History({
  idEmployee,
}: {
  idEmployee: string | undefined;
}) {
  const [history, setHistory] = useState<historyProps[]>([]);

  async function loadHistory(id: string) {
    const historyRef = query(
      collection(db, "history"),
      where("idEmployee", "==", id),
      orderBy("createdAt", "desc")
    );

    onSnapshot(historyRef, (querySnapshot) => {
      let array: historyProps[] = [];
      querySnapshot.forEach(
        (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
          const object: historyProps = {
            id: doc.id,
            idEmployee: doc.data().idEmployee,
            newValue: doc.data().newValue,
            prevValue: doc.data().prevValue,
            type: doc.data().type,
            createdAt: doc.data().createdAt,
          };

          array.push(object);
        }
      );
      setHistory(array);
    });
  }
  useEffect(() => {
    if (!idEmployee) {
      console.log("teste");
    }
    if (idEmployee) {
      loadHistory(idEmployee);
    }
  }, [idEmployee]);

  return (
    <section className={styles.history}>
      <h2 className={styles.title}>Histórico</h2>

      {history.length > 0 ? (
        history.map((item) => <ItemHistory item={item} key={item.id} />)
      ) : (
        <span>Não há registros no histórico.</span>
      )}
    </section>
  );
}

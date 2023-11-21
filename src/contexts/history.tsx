import { createContext, ReactNode } from "react";
import { db } from "../services/firebaseConnection";

import { toast } from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { TypeUpdateProps } from "../@types/history";

type HistoryContextData = {
  addHistory: (
    type: TypeUpdateProps,
    idEmployee: string,
    prevValue: any,
    newValue: any
  ) => {};
};

type HistoryProviderProps = {
  children: ReactNode;
};

export const HistoryContext = createContext({} as HistoryContextData);

function HistoryProvider({ children }: HistoryProviderProps) {
  async function addHistory(
    type: TypeUpdateProps,
    idEmployee: string,
    prevValue: any,
    newValue: any
  ) {
    const docRef = collection(db, "history");
    await addDoc(docRef, {
      idEmployee: idEmployee,
      type: type,
      prevValue: { ...prevValue },
      newValue: { ...newValue },
      createdAt: serverTimestamp(),
    })
      .then(() => {
        toast.success("Histórico criado com sucesso!");
      })
      .catch((error) => {
        toast.error("Erro ao cadastrar!");
        console.log(error);
      });
  }

  return (
    <HistoryContext.Provider
      value={{
        addHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
}

export default HistoryProvider;

import { useState, createContext, useEffect, ReactNode } from "react";
import { db, storage } from "../services/firebaseConnection";

import { toast } from "react-toastify";
import { EmployeeProps, StatusProps } from "../@types/employee";
import {
  orderBy,
  addDoc,
  collection,
  query,
  where,
  QueryDocumentSnapshot,
  DocumentData,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { EmployeeFormType } from "../schemas/employee";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

type EmployeeContextData = {
  employees: EmployeeProps[] | null;
  addEmployee: (employee: EmployeeFormType, file: File) => Promise<void>;
  getEmployees: (status?: StatusProps) => void;
  loadingEmployee: boolean;
  loading: boolean;
  sectors: RoleOrSection[];
  roles: RoleOrSection[];
  addSector: (sector: string) => void;
  addRole: (role: string) => void;
  deleteSector: (sector: string) => void;
  deleteRole: (role: string) => void;
  getEmployee: (id: string) => Promise<EmployeeProps | void>;
  status: StatusProps;
  setStatus: (status: StatusProps) => void;
};
export type RoleOrSection = {
  id: string;
  name: string;
};

type EmployeeProviderProps = {
  children: ReactNode;
};

export const EmployeeContext = createContext({} as EmployeeContextData);

function EmployeeProvider({ children }: EmployeeProviderProps) {
  const [employees, setEmployees] = useState<EmployeeProps[] | null>(null);
  const [status, setStatus] = useState<StatusProps>("ACTIVE");
  const [, setLoadingEmployee] = useState<boolean>(false);
  const [sectors, setSectors] = useState<RoleOrSection[]>([]);
  const [roles, setRoles] = useState<RoleOrSection[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadEmployees() {
      getEmployees();
    }
    loadEmployees();
  }, []);

  async function getEmployees(status: StatusProps = "ACTIVE") {
    setLoadingEmployee(true);
    const queryRef = query(
      collection(db, "employees"),
      where("status", "==", status),
      orderBy("createdAt", "desc")
    );

    onSnapshot(queryRef, (querySnapshot) => {
      let array: EmployeeProps[] = [];
      querySnapshot.forEach(
        (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
          const object: EmployeeProps = {
            id: doc.id,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            gender: doc.data().gender,
            birth: doc.data().birth,
            address: doc.data().address,
            phone: doc.data().phone,
            admission: doc.data().admission,
            role: doc.data().role,
            sector: doc.data().sector,
            wage: doc.data().wage,
            status: doc.data().status,
            createdAt: doc.data().createdAt,
            updatedAt: doc.data().updatedAt,
            profileURL: doc.data().profileURL,
          };

          array.push(object);
        }
      );
      setEmployees(array);
    });
    setLoadingEmployee(false);
  }

  async function uploadProfileUrl(image: File) {
    let extension = image.name.split(".").pop();
    let nameFile = image.name.split(".")[0].replaceAll(" ", "-").toLowerCase();

    let name = `profile-${nameFile}.${extension}`;

    const profileRef = ref(storage, `images/${name}`);

    const url = await uploadBytes(profileRef, image)
      .then(async (e) => {
        const url = await getDownloadURL(profileRef);
        return url;
      })
      .catch((e) => {
        console.log(e);
        return "Erro";
      });
    return url;
  }

  async function addEmployee(employeeData: EmployeeFormType, file: File) {
    const url = await uploadProfileUrl(file);
    if (url === "Erro") {
      toast.error("Erro ao cadastrar!");
      return;
    }
    const timestamp = serverTimestamp();
    const data: EmployeeFormType = {
      ...employeeData,
      admission: employeeData.admission.split("-").reverse().join("/"),
      birth: employeeData.birth.split("-").reverse().join("/"),
    };

    const employee = {
      ...data,
      status: "ACTIVE",
      updatedAt: timestamp,
      createdAt: timestamp,
      profileURL: url,
    };
    const docRef = collection(db, "employees");
    await addDoc(docRef, employee)
      .then(() => {
        toast.success("Funcionário cadastrado com sucesso!");
      })
      .catch((error) => {
        toast.error("Erro ao cadastrar!");
        console.log(error);
      });
  }

  async function getEmployee(id: string) {
    const docRef = doc(db, "employees", id);
    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let response: EmployeeProps = {
          id: docSnap.id,
          firstName: docSnap.data().firstName,
          lastName: docSnap.data().lastName,
          gender: docSnap.data().gender,
          birth: docSnap.data().birth,
          address: docSnap.data().address,
          phone: docSnap.data().phone,
          admission: docSnap.data().admission,
          role: docSnap.data().role,
          sector: docSnap.data().sector,
          wage: docSnap.data().wage,
          status: docSnap.data().status,
          createdAt: docSnap.data().createdAt,
          updatedAt: docSnap.data().updatedAt,
          profileURL: docSnap.data().profileURL,
        };

        return response;
      }
    } catch (error) {
      console.log("erro", error);
    }
  }

  useEffect(() => {
    getSectors();
    getRoles();
  }, []);

  //sections functions

  async function getSectors() {
    const queryRef = query(collection(db, "sectors"), orderBy("name", "asc"));
    onSnapshot(queryRef, (querySnapshot) => {
      let itens: RoleOrSection[] = [];
      querySnapshot.forEach((doc) => {
        itens.push({ id: doc.id, name: doc.data().name });
      });
      setSectors(itens);
    });
  }

  async function addSector(sector: string) {
    setLoading(true);

    const docRef = collection(db, "sectors");

    await addDoc(docRef, { name: sector })
      .then(() => {
        toast.success("Cadastrado com sucesso!");
      })
      .catch((error) => {
        toast.error("Erro ao cadastrar!");
        console.log(error);
      })
      .finally(() => setLoading(false));
  }
  async function deleteSector(sector: string) {
    await deleteDoc(doc(db, "sectors", sector))
      .catch(() => {
        toast.success("Deletado como sucesso");
      })
      .catch((error) => {
        toast.error("Erro ao deletar");
        console.log(error);
      });
  }

  //roles functions
  async function getRoles() {
    const queryRef = query(collection(db, "roles"), orderBy("name", "asc"));
    onSnapshot(queryRef, (querySnapshot) => {
      let itens: RoleOrSection[] = [];
      querySnapshot.forEach((doc) => {
        itens.push({ id: doc.id, name: doc.data().name });
      });
      setRoles(itens);
    });
  }
  async function addRole(role: string) {
    setLoading(true);

    const docRef = collection(db, "roles");

    await addDoc(docRef, { name: role })
      .then(() => {
        toast.success("Cadastrado com sucesso!");
      })
      .catch((error) => {
        toast.error("Erro ao cadastrar!");
        console.log(error);
      })
      .finally(() => setLoading(false));
  }

  async function deleteRole(role: string) {
    await deleteDoc(doc(db, "roles", role))
      .catch(() => {
        toast.success("Deletado como sucesso");
      })
      .catch((error) => {
        toast.error("Erro ao deletar");
        console.log(error);
      });
  }
  return (
    <EmployeeContext.Provider
      value={{
        employees,
        addEmployee,
        getEmployees,
        loadingEmployee: !employees,
        loading,
        sectors,
        roles,
        addSector,
        addRole,
        deleteSector,
        deleteRole,
        getEmployee,
        status,
        setStatus,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

export default EmployeeProvider;

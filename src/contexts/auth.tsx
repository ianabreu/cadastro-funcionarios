import { useState, createContext, useEffect, ReactNode } from "react";
import { auth } from "../services/firebaseConnection";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type AuthContextData = {
  user: UserProps | null;
  signed: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  logout: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
  loadingAuth: boolean;
  loading: boolean;
};
export type UserProps = {
  uid: string;
  email: string;
};
type SignInProps = {
  email: string;
  password: string;
};
type SignUpProps = {
  email: string;
  password: string;
};
type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      const storageUser = localStorage.getItem("@taugor");

      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }

      setLoading(false);
    }

    loadUser();
  }, []);

  // Logar usuário
  async function signIn({ email, password }: SignInProps) {
    setLoadingAuth(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then(async ({ user: { uid } }: UserCredential) => {
        setUser({ uid, email });
        storageUser({ uid, email });
        setLoadingAuth(false);
        toast.success("Bem-vindo(a) de volta!");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setLoadingAuth(false);
        toast.error("Ops algo deu errado!");
      });
  }

  // Cadastrar novo usuário
  async function signUp({ email, password }: SignUpProps) {
    setLoadingAuth(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user: { uid } }: UserCredential) => {
        setUser({ email, uid });
        storageUser({ email, uid });
        setLoadingAuth(false);
        toast.success("Seja bem-vindo ao sistema!");
        navigate("/");
      })
      .catch((error) => {
        setLoadingAuth(false);
        toast.error("Erro ao cadastrar");
      });
  }

  function storageUser(data: UserProps) {
    localStorage.setItem("@taugor", JSON.stringify(data));
  }

  async function logout() {
    await signOut(auth);
    localStorage.removeItem("@taugor");
    setUser(null);
    navigate("/", { replace: true });
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signUp,
        logout,
        loadingAuth,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

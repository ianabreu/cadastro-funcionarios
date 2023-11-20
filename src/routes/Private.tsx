import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import EmployeProvider from "../contexts/employee";
import Header from "../components/Header";

interface PrivateProps {
  children: JSX.Element;
}
export default function Private({ children }: PrivateProps): JSX.Element {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return <div></div>;
  }

  if (!signed) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <EmployeProvider>{children}</EmployeProvider>;
    </>
  );
}

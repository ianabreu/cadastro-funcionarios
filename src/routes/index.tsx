import { Routes, Route } from "react-router-dom";

import SignIn from "../pages/Login/SignIn";
import SignUp from "../pages/Login/SignUp";
import Dashboard from "../pages/Dashboard";
import NewEmployee from "../pages/NewEmployee";
import Sectors from "../pages/Sectors";
import Details from "../pages/Details";

import Private from "./Private";
import Error from "../pages/Error";
import { AuthContext } from "../contexts/auth";
import { useContext } from "react";

function RoutesApp() {
  const { signed, loading } = useContext(AuthContext);
  if (loading) return <div></div>;
  return (
    <Routes>
      {!signed ? (
        <>
          <Route path="/" element={<SignIn />} />
          <Route path="/registrar" element={<SignUp />} />
          <Route path="*" element={<Error />} />
        </>
      ) : (
        <>
          <Route
            path="/"
            element={
              <Private>
                <Dashboard />
              </Private>
            }
          />
          <Route
            path="/funcionario"
            element={
              <Private>
                <NewEmployee />
              </Private>
            }
          />
          <Route
            path="/funcionario/detalhes/:id"
            element={
              <Private>
                <Details />
              </Private>
            }
          />
          <Route
            path="/setores"
            element={
              <Private>
                <Sectors />
              </Private>
            }
          />
          <Route path="*" element={<Error />} />
        </>
      )}
    </Routes>
  );
}

export default RoutesApp;

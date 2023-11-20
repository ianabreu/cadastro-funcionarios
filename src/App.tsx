import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes";

import AuthProvider from "./contexts/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeProvider from "./contexts/employee";
import HistoryProvider from "./contexts/history";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <EmployeeProvider>
          <HistoryProvider>
            <ToastContainer autoClose={2000} />
            <RoutesApp />
          </HistoryProvider>
        </EmployeeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

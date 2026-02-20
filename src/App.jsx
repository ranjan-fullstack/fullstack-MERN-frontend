import { useState, useContext } from "react";
import AuthContext from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  const [showRegister, setShowRegister] = useState(false);

  if (isLoggedIn) return <Dashboard />;

  return showRegister ? (
    <Register switchToLogin={() => setShowRegister(false)} />
  ) : (
    <Login switchToRegister={() => setShowRegister(true)} />
  );
}

export default App;

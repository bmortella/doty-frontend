import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import Welcome from "../pages/Welcome";
import ProtectedRoute from "../pages/auth/ProtectedRoute";

import { AuthContextComponent } from "../contexts/authContext";

function App() {
  return (
    <AuthContextComponent>
      <Routes>
        <Route path="/" element={<ProtectedRoute component={Home} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/welcome"
          element={<ProtectedRoute component={Welcome} />}
        />
      </Routes>
    </AuthContextComponent>
  );
}

// DUVIDA: COMO FAZER PARA IR PARA TAB CERTA NO SIGNUP DEPENDENDO DA ORIGEM -> usar provider

export default App;

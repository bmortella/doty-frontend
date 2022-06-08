import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import Welcome from "../pages/Welcome";
import ProtectedRoute from "../pages/auth/ProtectedRoute";
import GuardianPage from "../pages/GuardianPage";
import TermsOfUse from "../pages/TermsOfUse";

import { AuthContextComponent } from "../contexts/authContext";

function App() {
  return (
    <AuthContextComponent>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/guardian/:id" element={<GuardianPage />} />
        <Route path="/guardian/terms" element={<TermsOfUse />} />
      </Routes>
    </AuthContextComponent>
  );
}

// DUVIDA: COMO FAZER PARA IR PARA TAB CERTA NO SIGNUP DEPENDENDO DA ORIGEM -> usar provider

export default App;

import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import Welcome from "../pages/Welcome";
import WelcomeRegisterPet from "../pages/guardian/WelcomeRegisterPet";
import SignupConclusion from "../pages/guardian/SignupConclusion";
import ProtectedRoute from "../pages/auth/ProtectedRoute";
import GuardianPage from "../pages/GuardianPage";
import TermsOfUse from "../pages/adopter/TermsOfUse";
import FormForAdoption from "../pages/adopter/FormForAdoption2";

import { AuthContextComponent } from "../contexts/authContext";
import LoginPage from "../pages/LoginPage";

function App() {
  return (
    <AuthContextComponent>
      <Routes>
        {/* COMMON ROUTES */}
        <Route path="/" element={<ProtectedRoute component={Home} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginpage" element={<LoginPage />} />

        {/* COMMON PROTECTED */}
        <Route
          path="/welcome"
          element={<ProtectedRoute component={Welcome} />}
        />

        {/* GUARDIAN ROUTES */}
        <Route
          path="/guardian/welcome/registerPets"
          element={
            <ProtectedRoute component={WelcomeRegisterPet} role="guardian" />
          }
        />
        <Route
          path="/guardian/welcome/signupComplete"
          element={
            <ProtectedRoute component={SignupConclusion} role="guardian" />
          }
        />

        {/* Fluxo do adotante */}
        <Route path="/guardian/:id" element={<GuardianPage />} />
        <Route path="/adopter/:id/welcome" element={<Welcome />} />
        <Route path="/adopter/:id/terms" element={<TermsOfUse />} />
        <Route path="/adopter/:id/form" element={<FormForAdoption />} />
        {/* <Route path="/adopter/:id/singup" />
        <Route path="/adopter/:id/login" /> */}
      </Routes>
    </AuthContextComponent>
  );
}

export default App;

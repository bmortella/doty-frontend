import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Signup from "../pages/auth/Signup";
// import Login from "../pages/auth/Login";
import Welcome from "../pages/Welcome";
import WelcomeRegisterPet from "../pages/guardian/WelcomeRegisterPet";
import SignupConclusion from "../pages/guardian/SignupConclusion";
import ProtectedRoute from "../pages/auth/ProtectedRoute";
import GuardianPage from "../pages/GuardianPage";
import StackedLayout from "../components/StackedLayout";
import Profile from "../pages/dashboard/common/Profile";
import Pets from "../pages/dashboard/guardian/Pets";
import TermsOfUse from "../pages/adopter/TermsOfUse";
import FormForAdoption from "../pages/adopter/FormForAdoption";
import SignUpPage from "../pages/SignUpPage";
import GuardianHome from "../pages/dashboard/guardian/GuardianHome";
import Adopters from "../pages/dashboard/guardian/Adopters";
import AdopterDashboard from "../pages/adopter/AdopterDashboard";

import { AuthContextComponent } from "../contexts/authContext";
import LoginPage from "../pages/LoginPage";

function App() {
  return (
    <AuthContextComponent>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />

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

        <Route
          path="/guardian/dashboard"
          element={
            <ProtectedRoute
              component={StackedLayout}
              role="guardian"
              props={{
                navigation: [
                  { name: "Página Inicial", href: "", end: true },
                  { name: "Animais Cadastrados", href: "pets", end: false },
                  { name: "Adotantes", href: "adopters", end: false },
                ],
              }}
            />
          }
        >
          <Route path="" element={<GuardianHome />} />
          <Route path="profile" element={<Profile />} />
          <Route path="pets" element={<Pets />} />
          <Route path="adopters" element={<Adopters />} />
        </Route>

        {/* Fluxo do adotante */}

        <Route path="/guardian/:id" element={<GuardianPage />} />

        <Route path="/adopter/:id/welcome" element={<Welcome />} />

        <Route path="/adopter/:id/terms" element={<TermsOfUse />} />

        <Route path="/adopter/:id/form" element={<FormForAdoption />} />

        <Route path="/adopter/:id/signup" element={<SignUpPage />} />

        <Route path="/adopter/:id/login" element={<LoginPage />} />

        <Route
          path="adopter/dashboard/:id"
          element={
            <ProtectedRoute
              component={StackedLayout}
              role="adopter"
              props={{
                navigation: [],
              }}
            ></ProtectedRoute>
          }
        >
          <Route path="" element={<AdopterDashboard/>} />
        </Route>
      </Routes>
    </AuthContextComponent>
  );
}

export default App;

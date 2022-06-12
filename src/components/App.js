import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import Welcome from "../pages/Welcome";
import WelcomeRegisterPet from "../pages/guardian/WelcomeRegisterPet";
import SignupConclusion from "../pages/guardian/SignupConclusion";
import ProtectedRoute from "../pages/auth/ProtectedRoute";
import GuardianPage from "../pages/GuardianPage";
import TermsOfUse from "../pages/TermsOfUse";
import StackedLayout from "../components/StackedLayout";
import Profile from "../pages/dashboard/common/Profile";
import Pets from "../pages/dashboard/guardian/Pets";

// TODO: fix import hell

import { AuthContextComponent } from "../contexts/authContext";

function App() {
  return (
    <AuthContextComponent>
      <Routes>
        {/* COMMON ROUTES */}
        <Route path="/" element={<ProtectedRoute component={Home} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

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
          element={<ProtectedRoute component={StackedLayout} role="guardian" />}
        >
          <Route path="" element={<p>Home</p>} />
          <Route path="profile" element={<Profile />} />
          <Route path="pets" element={<Pets />} />
          <Route path="adopters" element={<p>Ola Mundo!</p>} />
        </Route>

        <Route path="/guardian/terms" element={<TermsOfUse />} />
        <Route path="/guardian/:id" element={<GuardianPage />} />
      </Routes>
    </AuthContextComponent>
  );
}

export default App;

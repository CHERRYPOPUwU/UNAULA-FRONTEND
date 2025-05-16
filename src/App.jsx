import { BrowserRouter, Routes, Route } from "react-router-dom";
import SwitchTheme from "./components/SwitchTheme";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import { ThemeProvider } from "./context/ThemeContext";
import CreateUser from "./pages/CreateUser";
import { ProjectDashboard } from "./pages/Projects/index";
import Layout from "./Layout";
import "./styles/theme.css";
import { NotFoundPage } from "./pages/404";
import { UserProvider } from "./context/UserContext";
import { AsesoresDashboard } from "./pages/Asesores";
import { CarrerasDashboard } from "./pages/Carreras";
import { EstudianteDashboard } from "./pages/Estudiantes";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<NotFoundPage />} />

              <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                  <Route path="/" element={<SwitchTheme />} />
                  <Route path="/projects" element={<ProjectDashboard />} />
                  <Route path="/asesores" element={<AsesoresDashboard />} />
                  <Route path="/carreras" element={<CarrerasDashboard />} />
                  <Route path="/estudiantes" element={<EstudianteDashboard />} />
                </Route>
              </Route>

            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;

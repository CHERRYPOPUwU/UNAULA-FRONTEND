import { BrowserRouter, Routes, Route } from "react-router-dom";
import SwitchTheme from "./components/SwitchTheme";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import { ThemeProvider } from "./context/ThemeContext";
import CreateUser from "./pages/CreateUser";
import { ProjectDashboard } from "./pages/Projects/Dashboard";
import Layout from "./Layout";
import "./styles/theme.css";
import { NotFoundPage } from "./pages/404";
import { UserProvider } from "./context/UserContext";

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
                  <Route path="/createUser" element={<CreateUser />} />
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

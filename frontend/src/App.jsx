import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddApplication from "./pages/AddApplication";
import EditApplication from "./pages/EditApplication";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/add-application"
                    element={
                        <ProtectedRoute>
                            <AddApplication />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/edit-application/:id"
                    element={
                        <ProtectedRoute>
                            <EditApplication />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />

                <Route
                    path="/reset-password/:token"
                    element={<ResetPassword />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
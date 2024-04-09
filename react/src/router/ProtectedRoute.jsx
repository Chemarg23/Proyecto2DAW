
import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectedRoute({ redirectPath = "/login", canActivate }) {
    const navigate = useNavigate();

    if (!canActivate) {
        navigate(redirectPath);
        return null; // Opcionalmente, podrías mostrar un mensaje de carga o algo similar mientras se realiza la redirección.
    } else {
        return <Outlet />;
    }
}

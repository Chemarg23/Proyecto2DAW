
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, canActivate }) {
   console.log(children,canActivate)

    if (!canActivate) {
        <Navigate to={"/ogin"}/>
    } else {
        return children;
    }
}

import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

 //if you have token can't go to login or signup page
// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
    const token = document.cookie.split("; ").find((c) => c.startsWith("token="));
    let decodedToken = null;

    if (token) {
        const tokenValue = token.split("=")[1];
        decodedToken = jwtDecode(tokenValue);
        console.log("decodedToken",decodedToken.role)
    }
    const location=useLocation();
    const role=location.pathname.split('/')[1]
    console.log(location.pathname.split('/')[1])
    return decodedToken?.role===role ? (
        children
    ) : (
        <Navigate to={'/login'} />
    );
};

export default ProtectedRoute;

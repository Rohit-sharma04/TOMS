import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

 //if you have token can't go to login or signup page
// eslint-disable-next-line react/prop-types
const PublicRoute = ({ children }) => {
    const token = document.cookie.split("; ").find((c) => c.startsWith("token="));
    let decodedToken = null;

    if (token) {
        const tokenValue = token.split("=")[1];
        decodedToken = jwtDecode(tokenValue);
    }

    return decodedToken ? (
        <Navigate to={`/${decodedToken.role}/dashboard`} />
    ) : (
        children
    );
};

export default PublicRoute;

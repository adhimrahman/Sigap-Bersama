import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useUser from "../context/useUser";

export default function ProtectedRoute({ element }) {
    const { user } = useUser();
    if (!user) return <Navigate to="/signin" />
    return element;
}

ProtectedRoute.propTypes = {
    element: PropTypes.node.isRequired,
};
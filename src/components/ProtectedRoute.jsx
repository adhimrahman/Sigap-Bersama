import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useUser from "../context/useUser";
import Spinner from "./Spinner";

export default function ProtectedRoute({ element }) {
    const { user, loading } = useUser();

    if (loading) {
        return <Spinner />    }

    if (!user) {
        return <Navigate to="/signin" />;
    }

    return element;
}

ProtectedRoute.propTypes = {
    element: PropTypes.node.isRequired,
};
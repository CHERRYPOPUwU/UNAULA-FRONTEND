import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet} from 'react-router-dom';

function ProtectedRoute (){

    const { isAuthenticated, loading} = useAuth();
    if (loading) return 
    if(!loading && !isAuthenticated) return <Navigate to="/login" replace/>
    
    return(
        <Outlet/>
    )

}

export default ProtectedRoute;
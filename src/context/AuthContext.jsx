import { createContext, useState , useContext, useEffect} from "react";
import { loginRequest } from "../api/auth";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = ()=>{
    const context = useContext(AuthContext);
    if (!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signin = async (user) => {
    try {
        const res = await loginRequest(user);
        const cookies = Cookies.get();
        setUser(cookies.token)
        setIsAuthenticated(true);
    } catch (err) {
      if(Array.isArray(err.response.data)){
        setErrors(err.response.data);
      }
    }
  };

  const logout = () => {
    Cookies.remove("token"); // Elimina la cookie
    setUser(null);           // Limpia el usuario
    setIsAuthenticated(false); // Cambia el estado
  };

  useEffect(()=>{
    if(errors.length > 0){
      console.log("ERROR")
      const timer = setTimeout(() => {
        setErrors([])
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors])                  

  useEffect(()=>{

    async function checkLogin(){

      const cookies = Cookies.get();
  
      if(!cookies.token){
      console.log("NO TOKEN")
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }

      try {
        // const res = await verifyTokenRequest(cookies.token)
        // if(!res.data){
        //   setIsAuthenticated(false);
        //   setLoading(false);
        //   return
        // } 

        setIsAuthenticated(true)
        setUser(cookies.token)
        setLoading(false);
        
      } catch (err) {
        setIsAuthenticated(false)
        setUser(null)
        setLoading(false);
      }
    }

    checkLogin()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signin,
        logout,
        user,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

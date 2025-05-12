import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import SwitchTheme from "../components/SwitchTheme";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import "../styles/pages/LoginPage.css";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, errors: signinError, isAuthenticated  } = useAuth();


  
  const navigate = useNavigate();

  const onSubmit = (data) => signin(data);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="login__content">
      <div className="switchTheme__position">
        <SwitchTheme />
      </div>
      <form className="form__login" onSubmit={handleSubmit(onSubmit)}>
        <img src="/img/logo.webp" alt="" />
        <div className="content__inputs">
          <Input
            label="Ingrese su nombre"
            type="text"
            name="nombre"
            placeholder="nombre..."
            // error={errors.emailOrUsername}
            {...register("nombre", { required: true })}
            autoFocus
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            error={errors.password}
            {...register("password", { required: true })}
          />
          <p>
            Forgot password? <Link to="/forgot-password">recover</Link>
          </p>
        </div>

        <Button>Login</Button>
      </form>
    </div>
  );
}

export default LoginPage;

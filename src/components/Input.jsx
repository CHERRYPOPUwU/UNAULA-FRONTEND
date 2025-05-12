import { forwardRef, useState } from "react";
import PropTypes from 'prop-types';
import "../styles/components/input.css";
import Icon from "./Icon";

const InputComponent = (props, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [className, setClassName] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e)=>{
    if(!props.error && e.target.value){
      setClassName("success")
    }else{
      setClassName("error")
    }
  }
  
  return (
    <div className="input__content">
      {props.label && <label htmlFor={props.id} className={`label ${className}`}>{props.label}</label>}
      <div style={{ position: 'relative' }}>
        <input
          {...props}
          ref={ref}
          className={`input ${className}`}
          type={showPassword ? 'text' : props.type} 
          onChange={handleChange}
        />
        {props.type === 'password' && ( 
           <Icon  className="password-toggle" url={showPassword ?  "solid/eye-slash.svg#eye-slash" : "solid/eye.svg#eye"} width={20} height={20} viewbox="0 0 20 20" onClick={togglePasswordVisibility} ariaLabel={showPassword ? 'Hide password' : 'Show password'}/> 
        )}
      </div>
      {(className == "error") && (<p className="error-message">Este campo es obligatorio</p>)}
    </div>
  );
};

InputComponent.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  error: PropTypes.bool,
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

InputComponent.displayName = "Input";

export const Input = forwardRef(InputComponent);

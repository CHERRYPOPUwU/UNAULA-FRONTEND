import { forwardRef, useState } from "react";
import PropTypes from 'prop-types';
import "../styles/components/Select.css";

const SelectComponent = (props, ref) => {
  const [className, setClassName] = useState(false);

  const handleChange = (e)=>{
    if(!props.error && e.target.value){
      setClassName("success")
    }else{
      setClassName("error")
    }
  }
  
  return (
    <div className="select__content">
      {props.label && <label htmlFor={props.id} className={`label ${className}`}>{props.label}</label>}
        <div style={{ position: 'relative' }}>
        <select 
            {...props}
            ref={ref}
            id={props.id}  
            name={props.name}
            value={props.value}
            onChange={handleChange}
            className={`select ${className}`}>
            <option value="">Seleccione una opción</option>
            {props.options.map((row, index) => (
                 <option key={index} value={row.id}>{row.option}</option>
            ))}
            
        </select>
      </div>
      {(className == "error") && (<p className="error-message">Este campo es obligatorio</p>)}
    </div>
  );
};

SelectComponent.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  label: PropTypes.string,
  error: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      option: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export const Select = forwardRef(SelectComponent)
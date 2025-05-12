import { useTheme } from '../context/ThemeContext';
import Icon from './Icon.jsx';
import '../styles/components/switchTheme.css';


const SwitchTheme = () => {
  const { isDarkMode, toggleTheme } = useTheme(); 

  return (
        <label className="toggle-wrap" >
             <input type="checkbox" className="toggle-switch" onChange={toggleTheme} checked={isDarkMode} onClick={toggleTheme} />
             <span className="toggle">
                 <Icon url='sun.svg#sun' width={16} height={16} viewbox='0 0 16 16' />
                 <Icon url='moon.svg#moon' />
             </span>
         </label>
  );
};

export default SwitchTheme;






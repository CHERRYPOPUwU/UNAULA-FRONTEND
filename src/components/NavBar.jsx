import "../styles/components/NavBar.css";
import SwitchTheme from "../components/SwitchTheme";
import { InputSearch } from "./InputSearch";
import { useAuth } from "../context/AuthContext";
import Icon from "./Icon";
import { useState } from "react";
import {Link} from 'react-router-dom';

export function NavBar() {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const {user, logout} = useAuth();

  return (
    <nav className="NavBar">
      {/* <InputSearch /> */}
      <SwitchTheme />
      <div className={`NavBar__options ${ isOptionsOpen ? "open" : ""}`} onClick={() => setIsOptionsOpen(!isOptionsOpen)}>
        <div className="NavBar__user">
          <p className="NavBar__user--name">{user}</p>
          <p className="NavBar__user--rol">Admin</p>
        </div>
        <Icon url="outline/chevron-down.svg#chevron-down"/>
      </div>
      <ul className={`NavBar__options--list ${ isOptionsOpen ? "open" : ""}`} onMouseLeave={() => setIsOptionsOpen(!isOptionsOpen)}>
        {/* <Link to="/perfil"><li>Profile <Icon url="outline/user-circle.svg#user-circle" /></li></Link> */}
        <li onClick={logout}>Log Out <Icon url="outline/logout.svg#logout" /></li>
      </ul>
    </nav>
  );
}

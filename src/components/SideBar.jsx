import { Link, useResolvedPath , useMatch } from "react-router-dom";
import Icon from "./Icon";
import { useState } from "react";
import '../styles/components/SideBar.css';

export function SideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className={`sideBar ${isSidebarOpen ? "open" : ""}`} role="navigation">
      <div className="sideBar__image">
        <img src="/img/logo.webp" alt="Coastline Logo" />
        <label
          className="sideBar__close"
          onClick={handleSidebarToggle}
        >
          <Icon
            url={`outline/${
              isSidebarOpen ? "bars.svg#bars" : "bars3.svg#bars3"
            }`}
          />
        </label>
      </div>
      <div className="sideBar__content">
        <div className="sideBar__content--group">
          <hr />
          <p className="sideBar__linkTitle">Modulos</p>
          <CustomLink to="/projects" title="Explore Projects">
            <Icon
              url="solid/projects.svg#projects"
              height={20}
              width={20}
              viewbox="0 0 20 20"
            />
            <p>Proyectos</p>
          </CustomLink>
          <CustomLink to="/asesores" title="Explore Asesores">
            <Icon
              url="solid/asesores.svg#asesores"
              height={20}
              width={20}
              viewbox="0 0 16 12"
            />
            <p>Asesores</p>
          </CustomLink>
          <CustomLink to="/carreras" title="Explore Carreras">
            <Icon
              url="solid/carreras.svg#carreras"
              height={18}
              width={18}
              viewbox="0 0 16 12"
            />
            <p>Carreras</p>
          </CustomLink>
          <CustomLink to="/estudiantes" title="Explore Estudiantes">
            <Icon
              url="solid/card-identification.svg#card-identification"
              height={18}
              width={18}
              viewbox="0 0 16 16"
            />
            <p>Estudiantes</p>
          </CustomLink>
        </div>
        {/* <div className="sideBar__content--group">
          <hr />
          <p className="sideBar__linkTitle">Gestion de  Usuarios</p>
          <CustomLink to="/users" title="Manage users">
            <Icon
              url="solid/user.svg#user"
              height={20}
              width={20}
              viewbox="0 0 20 20"
            />
            <p>Users</p>
          </CustomLink>
        </div> */}
      </div>
    </nav>
  );
}


function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  
    return (
      <Link to={to} className={isActive ? "sideBar__link active" : "sideBar__link"} {...props}>
        {children}
      </Link>
    )
  }
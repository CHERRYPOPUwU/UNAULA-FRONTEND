// Layout.js
import { NavBar } from './components/NavBar';
import { SideBar } from './components/SideBar';
import "./styles/layaout.css"
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="container__layout">
      <SideBar />
      <div className="content">
        <NavBar />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;

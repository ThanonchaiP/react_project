import React from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { UserStoreContext } from "../../context/UserContext";
import "./Navbar.css";

const Navbar = () => {
  //state & hook
  const [click, setClick] = React.useState(false);
  const userStore = React.useContext(UserStoreContext);
  const history = useHistory();

  //function
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const getProfile = () => {
    const profileValue = JSON.parse(localStorage.getItem("profile"));
    if (profileValue) {
      userStore.updateProfile(profileValue);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    userStore.updateProfile(null);
    history.replace("/login");
  };

  React.useEffect(() => {
    getProfile();
  }, []);

  return (
    <nav>
      <nav>
        <div className="navbar-logo">
          <Link
            to="/classroom"
            className="navbar-brand"
            style={{ textDecoration: "none" }}
          >
            <i className="fas fa-piggy-bank"></i>ระบบประเมินภาวะโภชนาการ
          </Link>
        </div>
        <div className="navbar-menu">
          <ul className={click ? "menu active" : "menu"}>
            <li>
              <NavLink
                to="/classroom"
                className="menu-link"
                onClick={closeMobileMenu}
              >
                นักเรียน <i className="fas fa-caret-down"></i>
              </NavLink>
              <ul className="submenu">
                <li>
                  <Link className="submenu-link" to="/classroom">
                    ข้อมูลนักเรียน
                  </Link>
                </li>
                <li>
                  <Link className="submenu-link" to="/student">
                    ข้อมูลนักเรียนรายบุคคล
                  </Link>
                </li>
                <li>
                  <Link className="submenu-link" to="/">
                    เพิ่มข้อมูลนักเรียน
                  </Link>
                </li>
                <li>
                  <Link className="submenu-link" to="/">
                    กรอกน้ำหนักและส่วนสูง
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to="/" className="menu-link" onClick={closeMobileMenu}>
                คุณครู <i className="fas fa-caret-down"></i>
              </NavLink>
              <ul className="submenu">
                <li>
                  <Link className="submenu-link" to="/">
                    ข้อมูลคุณครู
                  </Link>
                </li>
                <li>
                  <Link className="submenu-link" to="/">
                    เพิ่มข้อมูลคุณครู
                  </Link>
                </li>
                <li>
                  <Link className="submenu-link" to="/">
                    กรอกน้ำหนักและส่วนสูง
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to="/" className="menu-link" onClick={closeMobileMenu}>
                รายงาน
              </NavLink>
            </li>
          </ul>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
          <div className="navbar-signup">
            {userStore.profile && (
              <>
                <Link to="/profile" className="menu-link">
                  {userStore.profile.firstname +
                    " " +
                    userStore.profile.lastname}
                </Link>
                <button className="navbar-btn" onClick={logout}>
                  ออกกจากระบบ
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </nav>
  );
};

export default Navbar;

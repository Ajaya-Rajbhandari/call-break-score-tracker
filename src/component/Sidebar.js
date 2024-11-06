import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHistory,
  FaInfoCircle,
  FaCog,
  FaBars,
  FaTimes,
  FaHome,
} from "react-icons/fa";
import styles from "../styles/Sidebar.module.css"; // Import your CSS module

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
      <button onClick={toggleSidebar} className={styles.toggleButton}>
        {isCollapsed ? <FaBars /> : <FaTimes />}
      </button>
      <nav className={styles.nav}>
        <ul>
          <li onClick={toggleSidebar}>
            <Link to="/" className={styles.navLink}>
              {isCollapsed ? (
                <FaHome />
              ) : (
                <>
                  <FaHome /> Home
                </>
              )}
            </Link>
          </li>
          <li onClick={toggleSidebar}>
            <Link to="/history" className={styles.navLink}>
              {isCollapsed ? (
                <FaHistory />
              ) : (
                <>
                  <FaHistory /> History
                </>
              )}
            </Link>
          </li>
          <li onClick={toggleSidebar}>
            <Link to="/about" className={styles.navLink}>
              {isCollapsed ? (
                <FaInfoCircle />
              ) : (
                <>
                  <FaInfoCircle /> About
                </>
              )}
            </Link>
          </li>
          <li onClick={toggleSidebar}>
            <Link to="/settings" className={styles.navLink}>
              {isCollapsed ? (
                <FaCog />
              ) : (
                <>
                  <FaCog /> Settings
                </>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

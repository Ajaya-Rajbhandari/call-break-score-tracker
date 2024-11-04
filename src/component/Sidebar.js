import React, { useState } from "react";
import {
  FaHistory,
  FaInfoCircle,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import styles from "../styles/Sidebar.module.css"; // Import your CSS module

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
      <button onClick={toggleSidebar} className={styles.toggleButton}>
        {isCollapsed ? <FaBars /> : <FaTimes />}
      </button>
      <nav className={styles.nav}>
        <ul>
          <li>
            {isCollapsed ? (
              <FaHistory />
            ) : (
              <>
                <FaHistory /> History
              </>
            )}
          </li>
          <li>
            {isCollapsed ? (
              <FaInfoCircle />
            ) : (
              <>
                <FaInfoCircle /> About
              </>
            )}
          </li>
          <li>
            {isCollapsed ? (
              <FaCog />
            ) : (
              <>
                <FaCog /> Settings
              </>
            )}
          </li>
          {/* Add more items as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

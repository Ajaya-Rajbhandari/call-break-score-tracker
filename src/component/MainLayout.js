import React from "react";
import { Outlet } from "react-router-dom"; // Import Outlet for nested routes
import Sidebar from "./Sidebar";
import styles from "../styles/MainLayout.module.css"; // Import your main layout styles

const MainLayout = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.content}>
        <Outlet /> {/* This will render the matched child route */}
      </div>
    </div>
  );
};

export default MainLayout;

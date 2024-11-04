import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NameSetupPage from "./NameSetupPage";
import GamePage from "./GamePage";
import styles from "../styles/CallBreakScorer.module.css";

const CallBreakScorer = () => {
  return (
    <Router>
      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<NameSetupPage />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default CallBreakScorer;

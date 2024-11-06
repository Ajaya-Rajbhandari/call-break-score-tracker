import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./component/MainLayout";
import NameSetupPage from "./component/NameSetupPage";
import GamePage from "./component/GamePage";
import HistoryPage from "./component/HistoryPage";
import SettingsPage from "./component/SettingsPage";
import AboutPage from "./component/AboutPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<NameSetupPage />} /> {/* Default route */}
          <Route path="game" element={<GamePage />} /> {/* Game page */}
          <Route path="history" element={<HistoryPage />} /> {/* Game page */}
          <Route path="about" element={<AboutPage />} /> {/* Game page */}
          <Route path="settings" element={<SettingsPage />} /> {/* Game page */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

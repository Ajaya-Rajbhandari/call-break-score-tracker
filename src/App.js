import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./component/MainLayout";
import NameSetupPage from "./component/NameSetupPage";
import GamePage from "./component/GamePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<NameSetupPage />} /> {/* Default route */}
          <Route path="game" element={<GamePage />} /> {/* Game page */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

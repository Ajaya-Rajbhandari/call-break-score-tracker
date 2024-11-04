import React, { useState, useEffect } from "react";
import PlayerSetup from "./PlayerSetup"; // Import PlayerSetup component
import { useNavigate } from "react-router-dom"; // Use useNavigate for navigation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons"; // Import an icon
import styles from "../styles/NameSetupPage.module.css"; // Import styles
import CallBreakerImage from "../img/CallBreakScoreTraacker.png";
// import Sidebar from "./Sidebar";
import MainLayout from "./MainLayout";
const NameSetupPage = () => {
  const [players, setPlayers] = useState([
    { name: "Player 1", rounds: [], total: 0 },
    { name: "Player 2", rounds: [], total: 0 },
    { name: "Player 3", rounds: [], total: 0 },
    { name: "Player 4", rounds: [], total: 0 },
  ]);
  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    // Reset players state when the component mounts
    setPlayers([
      { name: "Player 1", rounds: [], total: 0 },
      { name: "Player 2", rounds: [], total: 0 },
      { name: "Player 3", rounds: [], total: 0 },
      { name: "Player 4", rounds: [], total: 0 },
    ]);
  }, []); // Empty dependency array means this runs once on mount

  const handleNameEdit = (playerIndex, newName) => {
    if (!isNaN(newName) || newName.trim() === "") {
      return;
    }
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex].name = newName;
    setPlayers(updatedPlayers);
  };

  const startGame = () => {
    navigate("/game", { state: { players } }); // Navigate to GamePage with players
  };

  return (
    <div className={styles.card}>
      {/* <MainLayout /> */}
      <div className={styles.headerContainer}>
        <img
          src={CallBreakerImage}
          alt="Call Break"
          className={styles.headerImage}
        />
        <h2 className={styles.titleFirstPage}>
          <FontAwesomeIcon icon={faUserPlus} /> Setup Player Names
        </h2>
      </div>
      <PlayerSetup
        players={players}
        handleNameEdit={handleNameEdit}
        startGame={startGame}
        styles={styles}
      />
    </div>
  );
};

export default NameSetupPage;

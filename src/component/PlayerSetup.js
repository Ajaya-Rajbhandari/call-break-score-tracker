import React from "react";
import styles from "../styles/PlayerSetup.module.css";

const PlayerSetup = ({ players = [], handleNameEdit, startGame }) => {
  return (
    <div className={styles.playerSetupContainer}>
      {players.map((player, index) => (
        <input
          key={index}
          type="text"
          value={player.name}
          onChange={(e) => handleNameEdit(index, e.target.value)}
          className={styles.playerInput}
        />
      ))}
      <button
        onClick={startGame}
        className={styles.startButton}
        disabled={players.some((p) => !p.name.trim())}
      >
        Start Game
      </button>
    </div>
  );
};

export default PlayerSetup;

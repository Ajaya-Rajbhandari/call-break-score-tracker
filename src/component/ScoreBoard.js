import React from "react";
import { FaTrophy, FaRedo } from "react-icons/fa";

const ScoreBoard = ({
  players,
  currentRound,
  handleCall,
  handleActual,
  validateRound,
  startNewGame,
  nextRound,
  getWinner,
  styles,
}) => {
  return (
    <>
      <div className={styles.cardHeader}>
        <div className={styles.roundInfo}>Round {currentRound} of 5</div>
      </div>
      <div className={styles.scoreBoard}>
        {players.map((player, index) => (
          <div key={index} className={styles.playerRow}>
            <span>{player.name}</span>
            <input
              type="number"
              placeholder="Call"
              onChange={(e) => handleCall(index, parseInt(e.target.value))}
              className={styles.input}
            />
            <input
              type="number"
              placeholder="Actual (Total 13)"
              onChange={(e) => {
                const actualValue = parseInt(e.target.value);
                if (actualValue <= 13) {
                  handleActual(index, actualValue);
                } else {
                  alert("Actual score must be 13 or less.");
                }
              }}
              className={styles.input}
            />
            <span>Total: {player.total ? player.total.toFixed(1) : 0}</span>
            <span>
              Rounds:{" "}
              {player.rounds
                .map((round) => `Round ${round.round}: ${round.score}`)
                .join(", ")}
            </span>
          </div>
        ))}
      </div>
      {currentRound < 5 ? (
        <button
          onClick={nextRound}
          className={styles.button}
          disabled={!validateRound()}
        >
          Next Round
        </button>
      ) : (
        <div>
          <div className={styles.winnerCard}>
            <FaTrophy className={styles.winnerIcon} size={24} />
            <span>
              <strong>Winner: {getWinner().name}</strong>
            </span>
            <span> with {getWinner().total.toFixed(1)} points</span>
          </div>
          <button onClick={startNewGame} className={styles.button}>
            <FaRedo size={16} />
            Start New Game
          </button>
        </div>
      )}
    </>
  );
};

export default ScoreBoard;

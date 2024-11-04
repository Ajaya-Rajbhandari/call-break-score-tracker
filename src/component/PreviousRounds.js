import React from "react";

const PreviousRounds = ({ players, currentRound, styles }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Previous Rounds</h3>
      </div>
      <div className={styles.previousRounds}>
        <div className={styles.roundRow}>
          <div>Round</div>
          {players.map((player) => (
            <div key={player.name}>{player.name}</div>
          ))}
        </div>
        {Array.from({ length: currentRound - 1 }).map((_, index) => (
          <div key={index} className={styles.roundRow}>
            <div>{index + 1}</div>
            {players.map((player) => (
              <div key={player.name}>
                {player.rounds[index]?.points?.toFixed(1) || 0}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviousRounds;

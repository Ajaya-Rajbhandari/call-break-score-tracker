import React, { useState } from "react";
import Footer from "./Footer";
import ScoreBoard from "./ScoreBoard";
import PreviousRounds from "./PreviousRounds";
import { useLocation } from "react-router-dom";
import styles from "../styles/CallBreakScorer.module.css";
import CallBreaker from "../img/CallBreakScoreTraacker.png";

const GamePage = () => {
  const location = useLocation();
  const initialPlayers = location.state.players; // Get players from the previous page
  const [currentRound, setCurrentRound] = useState(1);
  const [players, setPlayers] = useState(initialPlayers);

  // Handle player's call
  const handleCall = (playerIndex, callValue) => {
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex].call = callValue; // Store the call value for the player
    setPlayers(updatedPlayers);
  };

  // Handle player's actual score
  const handleActual = (playerIndex, actualValue) => {
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex].actual = actualValue; // Store the actual score for the player
    setPlayers(updatedPlayers);
  };

  // Validate if the round can proceed
  const validateRound = () => {
    return players.every(
      (player) => player.call !== undefined && player.actual !== undefined
    );
  };

  // Move to the next round
  const nextRound = () => {
    if (validateRound()) {
      const updatedPlayers = players.map((player, index) => {
        const newTotal = (player.total || 0) + player.actual; // Update total score
        return {
          ...player,
          total: newTotal,
          rounds: [
            ...(player.rounds || []),
            { round: currentRound, score: player.actual },
          ],
        };
      });
      setPlayers(updatedPlayers);
      setCurrentRound((prevRound) => prevRound + 1); // Increment the round
    } else {
      alert(
        "Please enter all calls and actual scores before proceeding to the next round."
      );
    }
  };

  // Get the winner of the game
  const getWinner = () => {
    return players.reduce((prev, current) =>
      prev.total > current.total ? prev : current
    ); // Find the player with the highest total score
  };

  return (
    <div className={styles.container}>
      <h1
        className={styles.title}
        style={{ display: "flex", justifyContent: "center" }}
      >
        Call Break Score Tracker
        <img
          src={CallBreaker}
          alt="callBreaker"
          width="50px"
          height="50px"
          className={styles.iconCall}
        />
      </h1>
      <div className={styles.card}>
        {currentRound <= 4 ? (
          <ScoreBoard
            players={players}
            currentRound={currentRound}
            handleCall={handleCall}
            handleActual={handleActual}
            validateRound={validateRound}
            startNewGame={() => setCurrentRound(1)} // Reset to round 1
            nextRound={nextRound}
            getWinner={getWinner}
            styles={styles}
          />
        ) : (
          <div>
            <h2>Results After Round 4</h2>
            <ScoreBoard
              players={players}
              currentRound={currentRound}
              handleCall={handleCall}
              handleActual={handleActual}
              validateRound={validateRound}
              startNewGame={() => setCurrentRound(1)} // Reset to round 1
              nextRound={nextRound}
              getWinner={getWinner}
              styles={styles}
            />
            <h3>
              Final Winner: {getWinner().name} with{" "}
              {getWinner().total.toFixed(1)} points
            </h3>
            <button
              onClick={() => setCurrentRound(1)}
              className={styles.button}
            >
              Start New Game
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default GamePage;

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
    if (callValue < 0) {
      alert("Call value cannot be negative."); // Alert for negative call value
      return;
    }
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex].call = callValue; // Store the call value for the player
    setPlayers(updatedPlayers);

    // if (playerIndex === players.length - 1) {
    //   setPlayers(updatedPlayers.map((player) => ({ ...player, call: 0 })));
    // }
  };

  // Handle player's actual score
  const handleActual = (playerIndex, actualValue) => {
    if (actualValue < 0) {
      alert("Actual score cannot be negative."); // Alert for negative actual score
      return;
    }
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex].actual = actualValue; // Store the actual score for the player
    setPlayers(updatedPlayers);

    // if (playerIndex === players.length - 1) {
    //   setPlayers(updatedPlayers.map((player) => ({ ...player, actual: 0 })));
    // }
  };

  // Validate if the round can proceed
  const validateRound = () => {
    const allCallsValid = players.every(
      (player) => player.call >= 1 && player.call <= 12 // Rule 2: Calls must be between 1 and 12
    );
    const totalCalls = players.reduce((sum, player) => sum + player.call, 0);
    const totalActual = players.reduce((sum, player) => sum + player.actual, 0);
    const actualMatchesCalls = totalCalls === totalActual; // Rule 3: Actual should match total calls

    return allCallsValid && actualMatchesCalls; // Combine both validations
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

  // Get the winner of the game based on calls and actual scores
  const getWinner = () => {
    return players.reduce((prev, current) => {
      const prevScore = prev.call + prev.actual; // Calculate score based on calls and actual
      const currentScore = current.call + current.actual;
      return prevScore > currentScore ? prev : current;
    }); // Find the player with the highest combined score
  };

  return (
    <div className={styles.card}>
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
        {currentRound < 5 ? (
          <div>
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
            {currentRound > 2 ? (
              <PreviousRounds
                styles={styles}
                players={players}
                currentRound={currentRound}
              />
            ) : (
              ""
            )}
          </div>
        ) : (
          <div>
            {currentRound === 4 && ( // Show results after round 4
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
              </div>
            )}
            {currentRound === 5 && (
              <h3>
                Final Winner: {getWinner().name} with{" "}
                {getWinner().total.toFixed(1)} points
              </h3>
            )}
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

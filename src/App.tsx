import { useState } from "react";
import "./App.css";
import styles from "./App.module.css";
import { Card } from "./components/Card";

type VoteState = "ongoing" | "notstarted" | "done";

type Vote = "ja" | "nein";

function App() {
  const [votes, setVotes] = useState<Vote[]>([]);
  const [voteState, setVoteState] = useState<VoteState>("notstarted");
  const onNewElection = () => {
    setVoteState("ongoing");
    setVotes([]);
  };
  const onJa = () => {
    setVotes((arr) => arr.concat("ja"));
  };
  const onNein = () => {
    setVotes((arr) => arr.concat("nein"));
  };
  return (
    <div className={styles.root}>
      <h1>Ja, Nein?</h1>
      {voteState === "notstarted" && (
        <>
          <p>
            A companion app that helps you vote for (or against) a fascist
            government.
          </p>
          <p>
            <s>
              Access this site on your phone when you're playing Secret Hilter
              so that poor sod doesn't have to keep reshuffling the voting
              ballots.
            </s>
          </p>
        </>
      )}
      {voteState === "ongoing" && (
        <div className={styles.ongoing}>
          <div className={styles.votingContainer}>
            <Card onClick={onJa}>Ja!</Card>
            <Card onClick={onNein}>Nein!</Card>
          </div>
          <h2>Number of Votes: {votes.length}</h2>
        </div>
      )}

      <div>
        <button onClick={onNewElection}>Start a new vote</button>
      </div>

      {/** debugging is not fun */}
      <div>
        <p>voteState: {voteState}</p>
        <p>votes: {JSON.stringify(votes)}</p>
      </div>
    </div>
  );
}

export default App;

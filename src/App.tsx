import { useMemo, useState } from "react";
import "./App.css";
import styles from "./App.module.css";
import { ButtonCard } from "./components/ButtonCard";
import { Vote, VoteState } from "./types";
import { VoteCounter } from "./components/VoteCounter";

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
  const onDone = () => {
    setVoteState("done");
  };
  const winner: Vote = useMemo(() => {
    let jaCount = 0;
    let neinCount = 0;
    votes.forEach((v) => {
      if (v === "ja") {
        jaCount += 1;
      } else {
        neinCount += 1;
      }
    });
    return jaCount > neinCount ? "ja" : "nein";
  }, [votes]);
  const shuffledVotes = useMemo(
    () => votes.concat().sort((a) => (a !== "ja" ? 1 : -1)),
    [votes]
  );
  return (
    <div className={styles.root}>
      {voteState === "notstarted" && (
        <>
          <h1>Ja, Nein?</h1>
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
            <ButtonCard onClick={onJa}>Ja!</ButtonCard>
            <ButtonCard onClick={onNein}>Nein!</ButtonCard>
          </div>
          <VoteCounter votes={votes} hideCounter />
          <h2 className={styles.voteCount}>Number of Votes: {votes.length}</h2>
        </div>
      )}

      {voteState === "done" && (
        <div>
          <h1>Result: {winner.toUpperCase()}!</h1>
          <p>Congratulations to the new government for winning the election.</p>
          <VoteCounter votes={shuffledVotes} />
        </div>
      )}

      <div className={styles.actions}>
        <button onClick={onNewElection}>Start a new vote</button>
        {voteState === "ongoing" && (
          <button onClick={onDone}>Finish voting</button>
        )}
      </div>

      {/** debugging is not fun */}
      {/* <div> */}
      {/* <p>voteState: {voteState}</p> */}
      {/* <p>votes: {JSON.stringify(votes)}</p> */}
      {/* </div> */}
    </div>
  );
}

export default App;

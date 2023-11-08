import { useMemo, useState } from "react";
import "./App.css";
import styles from "./App.module.css";
import { ButtonCard } from "./components/ButtonCard";
import { Vote, VoteState } from "./types";
import { VoteCounter } from "./components/VoteCounter";
import clsx from "clsx";

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
            government when playing Secret Hitler.
          </p>
          <p>
            Access this site on your phone when you're playing Secret Hilter{" "}
            <s>
              so that poor sod doesn't have to keep reshuffling the voting
              ballots.
            </s>
          </p>
          <section className={styles.instruction}>
            <h2>How to use</h2>
            <ol className={styles.instructionOrderedList}>
              <li>Nominate someone's phone</li>
              <li>
                Load the site{" "}
                <a href="https://www.janein.cc">https://www.janein.cc</a> on
                said phone
              </li>
              <li>Press "Start a new vote"</li>
              <li>Vote.</li>
              <li>
                Once a person is done voting, pass the phone onto the next
                person.
              </li>
              <li>Repeat step 4-5 until everyone has voted.</li>
              <li>Press "Finish voting" and get your results.</li>
            </ol>
          </section>
        </>
      )}
      {voteState === "ongoing" && (
        <div className={clsx(styles.ongoing, "fadeIn")}>
          <div className={styles.votingContainer}>
            <ButtonCard onClick={onJa} subtitle="Yes">
              Ja!
            </ButtonCard>
            <ButtonCard onClick={onNein} subtitle="No">
              Nein!
            </ButtonCard>
          </div>
          <VoteCounter votes={votes} hideCounter />
          <h2 className={styles.voteCount}>Number of Votes: {votes.length}</h2>
        </div>
      )}

      {voteState === "done" && (
        <div className="fadeIn">
          <h1 className={styles.winner}>
            {winner.toUpperCase()}! ({winner === "ja" ? "Yes" : "No"})
          </h1>
          {winner === "ja" && (
            <p>
              Congratulations to the new government for winning the election.
            </p>
          )}
          {winner === "nein" && <p>Oops, better luck next time.</p>}
          <VoteCounter votes={shuffledVotes} />
        </div>
      )}

      <div className={styles.row}>
        {voteState !== "ongoing" && (
          <button onClick={onNewElection}>Start a new vote</button>
        )}
        {voteState === "ongoing" && (
          <button onClick={onDone}>Finish voting</button>
        )}
      </div>
      <footer>
        <div className={clsx(styles.row, styles.rowDivider)}>
          <a href="https://patreon.com/verzac" target="_blank" rel="noopener">
            Buy me a coffee
          </a>
          <a
            href="https://github.com/verzac/janein"
            target="_blank"
            rel="noopener"
          >
            Github
          </a>
          <a href="https://bento.me/bentanone" target="_blank" rel="noopener">
            Author
          </a>
        </div>
        <div className={styles.disclaimer}>
          <p>
            Secret Hitler is a game created by GOAT, WOLF, & CABBAGE. It is a
            social deduction game for 5-10 people about finding and stopping
            Hitler and a fascist takeover. Visit their site{" "}
            <a
              href="https://www.secrethitler.com/"
              target="_blank"
              rel="noopener"
            >
              here
            </a>
            .
          </p>
          <p>
            This site (janein.cc) is not affiliated with the original game. Get
            in touch @{" "}
            <a href="mailto:little.big.apps.studio@gmail.com">
              little.big.apps.studio@gmail.com
            </a>
          </p>
        </div>
      </footer>

      {/** debugging is not fun */}
      {/* <div> */}
      {/* <p>voteState: {voteState}</p> */}
      {/* <p>votes: {JSON.stringify(votes)}</p> */}
      {/* </div> */}
    </div>
  );
}

export default App;

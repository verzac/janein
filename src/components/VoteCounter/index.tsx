import clsx from "clsx";
import { Vote } from "../../types";
import styles from "./index.module.css";

interface VoteCounterProps {
  votes: Vote[];
  hideCounter?: boolean;
}

export function VoteCounter({ votes, hideCounter }: VoteCounterProps) {
  return (
    <div className={styles.root}>
      {votes.map((vote, idx) => (
        <div key={idx} className={clsx(styles.voteCard, "fadeIn")}>
          <p className={styles.voteLabel}>
            {hideCounter ? "?" : `${vote.toUpperCase()}!`}
          </p>
        </div>
      ))}
    </div>
  );
}

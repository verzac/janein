import clsx from "clsx";
import { Vote } from "../../types";
import styles from "./index.module.css";

interface VoteCounterProps {
  votes: Vote[];
}

export function VoteCounter({ votes }: VoteCounterProps) {
  return (
    <div className={styles.root}>
      {votes.map((_, idx) => (
        <div key={idx} className={clsx(styles.voteCard, styles.fadeIn)}>
          ?
        </div>
      ))}
    </div>
  );
}

import { PropsWithChildren } from "react";
import styles from "./Card.module.css";
import clsx from "clsx";

interface CardProps {
  className?: string;
  onClick?: () => void;
}

export function Card({
  children,
  className,
  onClick,
}: PropsWithChildren<CardProps>) {
  return (
    <button className={clsx(styles.root, className)} onClick={onClick}>
      <p className={styles.label}>{children}</p>
    </button>
  );
}

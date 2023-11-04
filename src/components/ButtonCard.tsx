import { PropsWithChildren } from "react";
import styles from "./ButtonCard.module.css";
import clsx from "clsx";

interface ButtonCardProps {
  className?: string;
  onClick?: () => void;
}

export function ButtonCard({
  children,
  className,
  onClick,
}: PropsWithChildren<ButtonCardProps>) {
  return (
    <button className={clsx(styles.root, className)} onClick={onClick}>
      <p className={styles.label}>{children}</p>
    </button>
  );
}

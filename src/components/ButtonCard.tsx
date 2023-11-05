import { PropsWithChildren } from "react";
import styles from "./ButtonCard.module.css";
import clsx from "clsx";

interface ButtonCardProps {
  className?: string;
  onClick?: () => void;
  subtitle?: string;
}

export function ButtonCard({
  children,
  className,
  onClick,
  subtitle,
}: PropsWithChildren<ButtonCardProps>) {
  return (
    <button className={clsx(styles.root, className)} onClick={onClick}>
      <p className={styles.label}>{children}</p>
      <p className={styles.subtitle}>({subtitle})</p>
    </button>
  );
}

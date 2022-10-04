import { HTMLProps } from "react";
import styles from "./loader.module.scss";

export default function Loader(props: HTMLProps<HTMLDivElement>) {
  return (
    <div className={styles.loader} {...props}>
      <div></div>
    </div>
  );
}

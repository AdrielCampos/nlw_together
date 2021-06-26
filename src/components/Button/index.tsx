import { ButtonHTMLAttributes } from "react/index";

import styles from "./styles.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button({ isOutlined, ...props }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${isOutlined && styles.outlined}`}
      {...props}
    />
  );
}

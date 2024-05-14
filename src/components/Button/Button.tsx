import React from "react";
import styles from "./Button.module.css";

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: ButtonSize;
  variant: ButtonVariant;
}

const Button = ({ size, variant, children, ...props }: ButtonProps) => {
  const sizeClass = styles[`size${size}`];
  const variantClass = styles[`variant${variant}`];
  const disabledClass = props.disabled ? styles.buttondisabled : "";

  return (
    <button
      className={`${styles.button} ${sizeClass} ${variantClass} ${disabledClass}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

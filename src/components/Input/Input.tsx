import React, { forwardRef } from "react";
import styles from "./Input.module.css";

type InputSize = "sm" | "md";
type InputVariant = "primary" | "secondary";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize: InputSize;
  variant: InputVariant;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { inputSize, variant, ...props },
  ref,
) {
  const sizeClass = styles[`size${inputSize}`];
  const variantClass = styles[`variant${variant}`];

  return (
    <input
      className={`${styles.input} ${sizeClass} ${variantClass}`}
      ref={ref}
      {...props}
    />
  );
});

export default Input;
// const Input = ({ inputSize, variant, ...props }: InputProps) => {
//   const sizeClass = styles[`size${inputSize}`];
//   const variantClass = styles[`variant${variant}`];

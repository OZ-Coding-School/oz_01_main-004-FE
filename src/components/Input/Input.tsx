import React from "react"
import styles from "./Input.module.css"

type InputSize = "sm" | "md"
type InputVariant = "primary" | "secondary"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize: InputSize
  variant: InputVariant
}

const Input = ({ inputSize, variant, ...props }: InputProps) => {
  const sizeClass = styles[`size${inputSize}`]
  const variantClass = styles[`variant${variant}`]

  return (
    <input
      className={`${styles.input} ${sizeClass} ${variantClass}`}
      {...props}
    />
  )
}

export default Input

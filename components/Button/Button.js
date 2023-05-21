import styles from './Button.module.css';

export const Button = ({ children, variant, className, ...otherProps }) => {
  return (
    <button className={`${styles[variant]} ${className}`} {...otherProps}>
      {children}
    </button>
  )
}

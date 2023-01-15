import styles from './Button.module.css';

export const Button = ({ children, variant, onClick, className, ...otherProps }) => {
  return (
    <button className={`${styles[variant]} ${className}`} onClick={onClick} {...otherProps}>
      {children}
    </button>
  )
}

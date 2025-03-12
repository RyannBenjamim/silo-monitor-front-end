import styles from "./styles.module.css"

const ErrorMessage = ({ text }) => {
  if (!text) return null

  return <div className={styles.error_message}><p>{text}</p></div>
}

export default ErrorMessage
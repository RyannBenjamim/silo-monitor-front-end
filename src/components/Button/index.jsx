import styles from "./styles.module.css"
import Loading from "../Loading"

const Button = ({ text, isLoading }) => {
  return (
    <button className={styles.btn}>{isLoading ? <Loading size={"20px"} /> : text}</button>
  )
}

export default Button
import styles from './styles.module.css'

const Loading = ({ size = "40px" }) => {
  return <div className={styles.loading} style={{ width: size, height: size }}></div>
}

export default Loading
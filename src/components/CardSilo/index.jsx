import styles from "./styles.module.css"

const CardSilo = () => {
  return (
    <div className={styles.card}>
      <p className={styles.title}>Silo 01</p>
      <p className={styles.temperature}>Temperatura atual: 23°C</p>
      <p className={styles.humidity}>Umidade atual: 90%</p>
      <p className={styles.status}>Status: <span>Normal</span></p>
      <p className={styles.last_update}>Última atualização: 13/03/2025 19:45</p>
    </div>
  )
}

export default CardSilo
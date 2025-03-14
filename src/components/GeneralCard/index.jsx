import styles from "./styles.module.css"

const GeneralCard = () => {
  return (
    <div className={styles.general_container}>
      <p className={styles.card_geral_title}>Resumo Geral do Sistema</p>

      <div className={styles.system_info_geral}>
        <div className={styles.general_status_geral}>
          <span className={styles.label_geral}>Número de Silos Monitorados:</span>
          <span className={styles.value_geral}>8</span>
        </div>

        <div className={styles.temperature_range_geral}>
          <span className={styles.label_geral}>Faixa de Temperatura Ideal:</span>
          <span className={styles.value_geral}>18°C - 22°C</span>
        </div>

        <div className={styles.avg_temperature_geral}>
          <span className={styles.label_geral}>Temperatura Média Atual:</span>
          <span className={styles.value_geral}>21.5°C</span>
        </div>

        <div className={styles.alerts_geral}>
          <span className={styles.label_geral}>Silos em Alerta:</span>
          <span className={`${styles.value_geral} ${styles.warning}`}>2</span>
        </div>

        <div className={styles.dangers_geral}>
          <span className={styles.label_geral}>Silos em Perigo:</span>
          <span className={`${styles.value_geral} ${styles.danger}`}>2</span>
        </div>
      </div>

      <div className={styles.last_update_geral}>
        <p>Última atualização: 19/01/2025 14:45</p>
      </div>
    </div>

  )
}

export default GeneralCard
import styles from "./styles.module.css"
import Card from "../../components/Card"

const StandardPainel = ({ silos }) => {
  return (
    <main className={styles.standard_main}>
      <p className={styles.main_title}>Dashboard de gerenciamento</p>
      <div className={styles.silos_container}>
        {silos.map((silo, index) => (
          <Card key={silo.id} index={index} id={silo.id} />
        ))}
      </div>
    </main>
  )
}

export default StandardPainel
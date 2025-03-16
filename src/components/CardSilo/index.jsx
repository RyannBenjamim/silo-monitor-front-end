import styles from "./styles.module.css"
import { useState, useEffect } from "react"
import axios from "axios"
import useUseful from "../../js/useUseful"

const CardSilo = ({ index, id }) => {
  const [register, setRegister] = useState(null)
  const { getStoredUser } = useUseful()

  const getRegister = async () => {
    try {
      const { headers } = getStoredUser()
      const { data } = await axios.get(`https://silo-monitor-api.vercel.app/registers/silos/${id}?last=true`, { headers })
      setRegister(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const temperatureStatus = (temperature) => {
    if (temperature <= 25) return styles.normal;
    if (temperature > 25 && temperature <= 30) return styles.warning;
    return styles.danger;
  }

  const humidityStatus = (humidity) => {
    if (humidity <= 70) return styles.normal;
    if (humidity > 70 && humidity <= 80) return styles.warning;
    return styles.danger;
  }

  useEffect(() => {
    getRegister()

    const interval = setInterval(() => {
      getRegister()
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.card}>
      <p className={styles.title}>Silo {index + 1}</p>
      <p className={styles.temperature}>Temperatura atual: 
        <span className={`${register ? temperatureStatus(register.temperature) : styles.normal}`}>
          {` ${register ? `${register.temperature}°C` : "inativo"}`}
        </span>
      </p>
      <p className={styles.humidity}>Umidade atual: 
        <span className={`${register ? humidityStatus(register.humidity) : styles.normal}`}>
          {` ${register ? `${register.humidity}%` : "inativo"}`}
        </span>
      </p>
      <p className={styles.silo_id}>id: {id}</p>
      <p className={styles.last_update}>Última atualização: {register ? register.created_at : null}</p>
    </div>
  )
}

export default CardSilo
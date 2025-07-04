import styles from "./styles.module.css"
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import useUseful from "../../js/useUseful"
import { toast } from "react-toastify"

const CardSilo = ({ index, id }) => {
  const [register, setRegister] = useState(null)
  const { getStoredUser, brasilFormatData } = useUseful()
  const alertShownRef = useRef(false);

  const getRegister = async () => {
    try {
      const { headers } = getStoredUser()
      const { data } = await axios.get(`https://silo-monitor-api.vercel.app/registers/silos/${id}?last=true`, { headers })
      setRegister(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const verifyTemperature = (temperature) => {
    if (temperature > 60) {
      if (!alertShownRef.current) {
        toast.warn(`Temperatura elevada no sensor ${index + 1}`, {
          style: {
            background: '#181818',
            color: 'white',
          },
          autoClose: false,
          closeOnClick: true,
        });
        alertShownRef.current = true
      }
    } else {
      alertShownRef.current = false
    }
  }

  const temperatureStatus = (temperature) => {
    if (temperature <= 50) return styles.normal
    if (temperature > 50 && temperature <= 60) return styles.warning
    return styles.danger
  }

  const humidityStatus = (humidity) => {
    if (humidity >= 40) return styles.normal
    if (humidity >= 20 && humidity < 40) return styles.warning
    return styles.danger
  }

  useEffect(() => {
    getRegister()

    const interval = setInterval(() => {
      getRegister()
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    verifyTemperature(register?.temperature)
  }, [register])

  return (
    <div className={styles.card}>
      <p className={styles.title}>Sensor {index + 1}</p>
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
      <p className={styles.last_update}>Última atualização: {register ? brasilFormatData(register.created_at) : null}</p>
    </div>
  )
}

export default CardSilo
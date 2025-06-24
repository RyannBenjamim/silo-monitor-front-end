import { useEffect, useState } from "react"
import styles from "./styles.module.css"
import Message from "../Message"
import axios from "axios"
import useUseful from "../../js/useUseful"

const CardUser = ({ user }) => {
  const [message, setMessage] = useState(null)
  const { getStoredUser } = useUseful()
  const { headers } = getStoredUser()

  const createNewSilo = async () => {
    try {
      const response = await axios.post("https://silo-monitor-api.vercel.app/silos", { "user_id": user.id }, { headers })
      setMessage(`Sensor criado com sucesso: ${response.data.data.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteUser = async () => {
    try {
      const response = confirm(`Você tem certeza que deseja deletar o usuário ${user.username}?`)

      if (!response) return

      await axios.delete(`https://silo-monitor-api.vercel.app/users/${user.id}`, { headers })
      setMessage(`Usuário ${user.username} deletado com sucesso.`)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setMessage(null)
  }, [user])

  return (
    <div className={styles.user_card}>
      <p className={styles.id}>id: {user.id}</p>
      <p className={styles.title}>{user.username}</p>
      <div className={styles.btns}>
        <button className={styles.create_silo} onClick={createNewSilo}>Criar novo sensor</button>
        <button className={styles.delete_user} onClick={deleteUser}>Deletar usuário</button>
      </div>

      <Message text={message} />
    </div>
  )
}

export default CardUser
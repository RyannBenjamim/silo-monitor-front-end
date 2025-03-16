import styles from "./styles.module.css"
import { useState } from "react"
import axios from "axios"
import CardUser from "../CardUser"
import Message from "../Message"
import Input from "../Input"
import Button from "../Button"
import useUseful from "../../js/useUseful"

const AdminPainel = () => {
  const [newUsername, setNewUsername] = useState("")
  const [userPassword, setUserPassword] = useState("")

  const { getStoredUser } = useUseful()

  const [search, setSearch] = useState("")
  const [searchError, setSearchError] = useState("")
  const [searchUser, setSearchUser] = useState(null)

  const [formMessage, setFormMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    try {
      const { headers } = getStoredUser()

      const response = await axios.post("https://silo-monitor-api.vercel.app/users", {
        "username": newUsername,
        "password": userPassword
      }, { headers })

      setFormMessage({ 
        type: "success", 
        text: `Usuário ${response.data.data.username} criado com sucesso.` 
      })
    } catch (error) {
      setFormMessage({
        type: "error",
        text: error.response.data.error
      });
    } finally {
      setIsLoading(false)
    }
  }

  const getUser = async () => {
    try {
      const { headers } = getStoredUser()
      const response = await axios.get(`https://silo-monitor-api.vercel.app/users?username=${search}`, { headers })
      
      setSearchError("")
      setSearchUser(response.data.data[0])
    } catch (error) {
      setSearchUser(null)
      setSearchError(error.response.data.error)
    }
  }

  return (
    <main className={styles.admin_main}>
      <p className={styles.main_title}>Painel de administrador</p>
      <div className={styles.admin_container}>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          >
            <i className="fa-solid fa-user"></i>
          </Input>

          <Input
            type="password"
            placeholder="Senha"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          >
            <i className="fa-solid fa-lock"></i>
          </Input>

          <Message 
            text={formMessage ? formMessage.text : ""} 
            type={formMessage ? formMessage.type : ""} 
          />

          <Button text="Criar novo usuário" isLoading={isLoading} />
        </form>

        <div className={styles.search}>
          <Input
            type="text"
            placeholder="Pesquisa por um username"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getUser()
              }
            }}
            color="#3A3F47"
          >
            <i class="fa-solid fa-magnifying-glass"></i>
          </Input>

          {searchUser ? <CardUser user={searchUser} /> : null}

          <Message text={searchError} type="error" margin="20px 0px" />
        </div>
      </div>
    </main>
  )
}

export default AdminPainel
import styles from "./Login.module.css"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Message from "../../components/Message"
import Input from "../../components/Input"
import Button from "../../components/Button"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    try {
      const user = await axios.post("https://silo-monitor-api.vercel.app/users/login", {
        username,
        password
      });


      localStorage.setItem("stored_user", JSON.stringify({
        id: user.data.data.id,
        token: user.data.data.token
      }));

      navigate("/home")
    } catch (error) {
      setError(error.response.data.error);
    } finally {
      setIsLoading(false)
    }
  }

  const hasStoredUser = () => {
    const stored_user = localStorage.getItem("stored_user")
    return !!stored_user
  }

  useEffect(() => {
    const isLogged = hasStoredUser()
    
    if (isLogged) {
      navigate("/home")
    }
  }, [])

  return (
    <div className={styles.container}>

      <div className={styles.bg_left}>

        <form className={styles.login_card} onSubmit={handleSubmit}>
          <p className={styles.login_subtitle}>Acesse sua conta e aproveite nossos serviços</p>

          <Input
            type="text"
            placeholder="Seu username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          >
            <i className="fa-solid fa-user"></i>
          </Input>

          <Input
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          >
            <i className="fa-solid fa-lock"></i>
          </Input>

          <Message text={error} type="error" />

          <Button text="Entrar" isLoading={isLoading} />
        </form>

        <p className={styles.credits}>empresa &reg;</p>

      </div>

      <div className={styles.bg_right}></div>

    </div>
  )
}

export default Login
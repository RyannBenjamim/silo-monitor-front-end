import styles from "./Login.module.css"
import ErrorMessage from "../../components/ErrorMessage"
import Loading from "../../components/Loading"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

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

          <div className={styles.input_card}>
            <i className="fa-solid fa-user"></i>
            <input type="text" placeholder='Seu username' value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>

          <div className={styles.input_card}>
            <i className="fa-solid fa-lock"></i>
            <input type="password" placeholder='Sua senha' value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <ErrorMessage text={error} />

          <button className={styles.login_btn}>{isLoading ? <Loading size={"20px"} /> : "Entrar"}</button>
        </form>

        <p className={styles.credits}>empresa &reg;</p>

      </div>

      <div className={styles.bg_right}></div>

    </div>
  )
}

export default Login
import styles from "./Home.module.css"
import axios from "axios"
import Loading from "../../components/Loading"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

const Home = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const getUser = async () => {
    try {
      const storedUser = localStorage.getItem("stored_user");
      if (!storedUser) {
        navigate("/")
        return;
      }

      const { id, token } = JSON.parse(storedUser); 
      const { data } = await axios.get(`https://silo-monitor-api.vercel.app/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (!data) {
        navigate("/");
      } else {
        setUser(data.data);
      }
    } catch (error) {
      navigate("/")
    }
  }

  const logout = () => {
    localStorage.removeItem("stored_user")
    navigate("/")
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <div className={styles.container}>
      {user ? (
        <>
          <h1>Seja bem-vindo {user.username}</h1>
          <button className={styles.logout_btn} onClick={logout}>Sair</button>
        </>
      ) : ( <Loading /> )}
    </div>
  )
}

export default Home

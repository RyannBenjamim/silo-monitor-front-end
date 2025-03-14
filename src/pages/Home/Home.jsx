import styles from "./Home.module.css"
import axios from "axios"
import Loading from "../../components/Loading"
import Header from "../../components/Header"
import CardSilo from "../../components/CardSilo"
import GeneralCard from "../../components/GeneralCard"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

const Home = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const getUser = async () => {
    try {
      const storedUser = localStorage.getItem("stored_user")
      if (!storedUser) {
        navigate("/")
        return
      }

      const { id, token } = JSON.parse(storedUser) 
      const { data } = await axios.get(`https://silo-monitor-api.vercel.app/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (!data) {
        navigate("/")
      } else {
        setUser(data.data)
      }
    } catch (error) {
      navigate("/")
    }
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <div className={styles.container}>
      {user ? (
        <>
          <Header height_size="8vh" username={user.username} />
          <main>

            <div className={styles.silos_container}>
              <CardSilo />
              <CardSilo />
              <CardSilo />
              <CardSilo />
              <CardSilo />
            </div>

            <GeneralCard />

          </main>
        </>
      ) : ( <Loading size="60px" color="#005C85" /> )}
    </div>
  )
}

export default Home

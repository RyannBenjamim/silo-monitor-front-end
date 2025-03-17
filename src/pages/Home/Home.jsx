import styles from "./Home.module.css"
import axios from "axios"
import Loading from "../../components/Loading"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import AdminPainel from "../../components/AdminPainel"
import StandardPainel from "../../components/StandardPainel"
import useUseful from "../../js/useUseful"

const Home = () => {
  const [user, setUser] = useState(null)
  const [silos, setSilos] = useState([])
  const { getStoredUser } = useUseful()
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const { id, headers } = getStoredUser()

      const [userResponse, silosResponse] = await Promise.all([
        axios.get(`https://silo-monitor-api.vercel.app/users/${id}`, { headers }),
        axios.get(`https://silo-monitor-api.vercel.app/silos?user_id=${id}`, { headers })
      ])

      setUser(userResponse.data.data)
      setSilos(silosResponse.data.data)
    } catch (error) {
      if (error.response?.data?.message === "Token expirado.") {
        alert("Sua sessão expirou, faça login novamente para acessar nossos serviços.");
        localStorage.removeItem("stored_user");
        navigate("/");
      } else {
        console.error("Erro ao buscar os dados:", error);
      }
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  if (!user) return (
    <div className={styles.container} style={{ justifyContent: "center" }}>
      <Loading size="60px" />
    </div>
  ) 

  const mainContent = user.role === "ADMIN" ? <AdminPainel /> : <StandardPainel silos={silos} />

  return (
    <div className={styles.container}>
      <Header height_size="8vh" username={user.username} />
      {mainContent}
      <Footer />
    </div>
  );
};

export default Home


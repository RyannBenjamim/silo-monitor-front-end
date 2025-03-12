import styles from "./styles.module.css"
import { useNavigate } from "react-router-dom"

const Header = ({ height_size = "60px", username }) => {
  const navigate = useNavigate()
  
  const logout = () => {
    localStorage.removeItem("stored_user")
    navigate("/")
  }

  return (
    <header className={styles.header} style={{ height: height_size }}>
      <div className={styles.container}>

        <div className={styles.logo}>
          <i className="fa-solid fa-sun"></i>
        </div>

        <div className={styles.options}>
          <div className={styles.username}>
            <i className="fa-solid fa-circle-user"></i>
            <p>{username}</p>
          </div>

          <button className={styles.logout_btn} onClick={logout}>
            <i className="fa-solid fa-right-from-bracket"></i>
            <p>Sair</p>
          </button>
        </div>

      </div>
    </header>
  )
}

export default Header
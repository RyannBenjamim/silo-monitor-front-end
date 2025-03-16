import { useNavigate } from "react-router-dom"

const useUseful = () => {
  const navigate = useNavigate()

  const brasilFormatData = (data) => {
    if (data === undefined) return "Indefinido"

    const dataObject = new Date(data)
    let day = dataObject.getDate() + 1
    let month = dataObject.getMonth() + 1
    const year = dataObject.getFullYear()

    day = day < 10 ? "0" + day : day
    month = month < 10 ? "0" + month : month

    return `${day}/${month}/${year}`
  }

  const getStoredUser = () => {
    const storedUser = localStorage.getItem("stored_user")
    if (!storedUser) {
      navigate("/")
      return null
    }
    const { id, token } = JSON.parse(storedUser)
    return { id, token, headers: { Authorization: `Bearer ${token}` } }
  }

  return { brasilFormatData, getStoredUser }
}

export default useUseful

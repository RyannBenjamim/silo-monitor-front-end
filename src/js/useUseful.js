import { useNavigate } from "react-router-dom"

const useUseful = () => {
  const navigate = useNavigate()

  const brasilFormatData = (data) => { 
    if (data === undefined) return "Indefinido";

    const dataObject = new Date(data);

    const options = { 
        timeZone: "America/Sao_Paulo", 
        day: "2-digit", 
        month: "2-digit", 
        year: "numeric", 
        hour: "2-digit", 
        minute: "2-digit", 
        hour12: false 
    };

    return new Intl.DateTimeFormat("pt-BR", options).format(dataObject).replace(",", "");
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

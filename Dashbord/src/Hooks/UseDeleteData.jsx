import axios from "axios"


const UseDeleteData = async (url, data, confing) => {
    const response = await axios.delete(url, data)
    return response
}

export default UseDeleteData
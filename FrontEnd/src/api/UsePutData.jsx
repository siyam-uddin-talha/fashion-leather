import axios from 'axios'
const UsePutData = async (url, data) => {
    const response = await axios.put(url, data)
    return response
}

export default UsePutData
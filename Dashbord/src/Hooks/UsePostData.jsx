import axios from "axios"


const UsePostData = async (url, data, confing) => {
    const response = await axios.post(url, data)
    return response
}

export default UsePostData
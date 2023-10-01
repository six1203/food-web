import axios from "../utils/request"
import md5 from "md5"


export const $login = async (params) =>{
    params.password = md5(md5(params.password).split("").reverse().join(""))
    let {data} = await axios.post('v1/user/login/byUsername', params)
    if (data.data) {
        sessionStorage.setItem('token', data.data.userInfo.token)
    }
    return data
}
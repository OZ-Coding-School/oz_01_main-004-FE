import axios from "axios"

export const instance = axios.create({
  baseURL: process.env.VITE_API_URL,
  timeout: 40000,
  withCredentials: true,
})

//사용 방법 : 해당 페이지에서 const formData = {username, password} 등 써야하는 form 만들기
//apiPost('api/login', formData)
// export const apiPost = async (
//   url: string,
//   formData: any,
//   headers?: AxiosRequestConfig["headers"],
// ) => {
//   try {
//     const config: AxiosRequestConfig = { data: formData }
//     if (headers !== undefined) {
//       config.headers = headers
//     }
//     const response = await instance.post(url, formData, config)
//     return response.data
//   } catch (error) {
//     console.log("에러임")
//   }
// }

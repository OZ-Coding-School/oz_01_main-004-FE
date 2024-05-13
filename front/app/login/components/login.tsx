"use client"

import { instance } from "@/shared/api/axios"
import Link from "next/link"
import { FormEvent, useState } from "react"

export default function Login() {
  //   const router = useRouter()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await instance.post("api/v1/users/sign-in/", {
        email,
        password,
      })
    } catch {}
  }

  return (
    <div>
      <div>
        <form name="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="PassWord"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <input type="submit" value="로그인" />
        </form>
        <div>
          <button onClick={toggleShowPassword} className="HidePasswordButton">
            {showPassword ? "비밀번호 숨김" : "비밀번호 표시"}
          </button>
          <Link href={"/signup/"}>회원가입</Link>
        </div>
      </div>
    </div>
  )
}

import { Link, useNavigate } from "react-router-dom"
import MainLayout from "./MainLayout"
import { logout } from "../services/userApi"

function Home() {
  const navigate = useNavigate()
  async function handleLogout() {
    logout();
    navigate("/login")
  }
  return (
    <MainLayout>
      <div className="w-[400px] h-56 bg-transparent rounded-lg backdrop-filter backdrop-blur-[20px] space-y-4">
        <h1 className="w-full text-center pt-4 text-3xl text-white font-bold ">Thanh Trí đã đăng nhập thành công</h1>
        <div className="text-5xl text-center">😊</div>
        <Link onClick={() => handleLogout()} to={"/login"} className="text-white text-center w-full inline-block font-medium hover:text-violet-500 transition-all duration-300">Đăng xuất khỏi hệ thống</Link>
      </div>
    </MainLayout>
  )
}

export default Home

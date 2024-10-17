// import { Link, useNavigate } from "react-router-dom"
// import MainLayout from "./MainLayout"
// import { logout } from "../services/userApi"
import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { logout } from "../api/user";
import { useAuthContext } from "../context/AuthenticateContext";
import UserManagement from "../component/dashboard/UserManagement";

function Home() {
  const navigate = useNavigate();
  const { setUserInfor, userInfor } = useAuthContext();

  useEffect(() => {
    if (!userInfor) navigate("../authentication");
  }, [userInfor, navigate]);

  function handleLogout() {
    setUserInfor(null);
    sessionStorage.clear();
    logout();
    navigate("/authentication");
  }

  return (
    <div className="min-h-dvh w-full  ">
      <div className=" bg-white  overflow-hidden">
        <header className="w-full bg-indigo-800 h-16 px-14 flex items-center justify-between">
          <h1 className="uppercase text-white font-bold text-2xl">
            Admin Dashboard
          </h1>
          <div className="flex gap-4">
            <img
              src="http://localhost:8080/img/hinhcanhan.jpg"
              alt="user"
              className="w-12 h-12 rounded-full border-2"
            />
            <button
              onClick={handleLogout}
              className="py-1 px-2 border-2 rounded-md hover:bg-red-400 hover:text-white transition-all duration-500"
            >
              <HiOutlineLogout size={24} />
            </button>
          </div>
        </header>
        <UserManagement />
      </div>
    </div>
  );
}

export default Home;

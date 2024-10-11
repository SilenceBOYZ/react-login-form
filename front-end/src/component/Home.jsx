// import { Link, useNavigate } from "react-router-dom"
// import MainLayout from "./MainLayout"
// import { logout } from "../services/userApi"
import { FaEllipsisV } from "react-icons/fa";
import {
  FaArrowRightLong,
  FaArrowLeftLong,
  FaRegTrashCan,
  FaPenToSquare,
} from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { MdEditCalendar } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { logout } from "../api/user";

function Home() {
  const navigate = useNavigate();
  const authenticated = sessionStorage.getItem("user-login");

  useEffect(() => {
    if (!authenticated) navigate("/authentication");
  }, [authenticated, navigate]);

  function handleLogout() {
    sessionStorage.clear();
    logout();
    navigate("/authentication")
  }

  return (
    <div className="min-h-dvh w-full flex items-center justify-center">
      <div className="w-[82rem] min-h-[45rem] bg-white rounded-lg overflow-hidden">
        <header className="w-full bg-header h-16 px-14 flex items-center justify-between">
          <h1 className="uppercase text-white font-bold text-2xl">
            Admin Dashboard
          </h1>
          <div className="flex gap-4">
            <img
              src="http://localhost:8080/img/hinhcanhan.jpg"
              alt="user"
              className="w-12 h-12 rounded-full border-2"
            />
            <button onClick={handleLogout} className="py-1 px-2 border-2 rounded-md hover:bg-red-400 hover:text-white transition-all duration-500">
              <HiOutlineLogout size={24} />
            </button>
          </div>
        </header>
        <div className="px-12 py-6 h-full ">
          <div className=" px-6 py-4 shadow-lg rounded-xl border-2 ">
            <div className="mb-4 w-full flex justify-between">
              <div className="flex w-1/2">
                <input
                  type="text"
                  placeholder="Type the user name"
                  className="py-1.5 pl-2 pr-6 text-sm border-2 rounded-md outline-none target:border-none w-[18rem]"
                />
                <button className="-ml-6">
                  <FaSearch className="text-neutral-500" />
                </button>
              </div>
              <div className="relative w-1/2 flex justify-end">
                <button className="border-2 p-2 rounded-md ">
                  <IoFilter />
                  <ul className="absolute text-left text-sm bg-white px-4 py-2 rounded-md shadow-md z-10 right-0 top-10 invisible opacity-0 cursor-pointer">
                    <li className="py-1 mb-2 border-b-[2px] hover:border-red-600 transition-all duration-600 ">
                      Order A to Z
                    </li>
                    <li className="py-1 mb-2 border-b-[2px] hover:border-red-600">
                      Order Z to A
                    </li>
                    <li className="py-1 mb-2 border-b-[2px] hover:border-red-600">
                      Filter by position
                    </li>
                  </ul>
                </button>
              </div>
            </div>
            <table className="w-full">
              <thead className="">
                <tr className="text-neutral-500">
                  <th scope="col" className="w-[5%] pl-2">
                    #
                  </th>
                  <th scope="col" className="w-[15%]">
                    User name
                  </th>
                  <th scope="col" className="w-[35%]">
                    Email
                  </th>
                  <th scope="col" className="w-[10%]">
                    Position
                  </th>
                  <th scope="col" className="w-[15%]">
                    Create time
                  </th>
                  <th scope="col" className="w-[15%]">
                    Lastest Update
                  </th>
                  <th scope="col" className="w-[5%]">
                    Edit
                  </th>
                </tr>
              </thead>

              <tbody className="select-none">
                {Array.from({ length: 6 }).map((item, index) => (
                  <tr
                    key={index}
                    className="font-semibold text-sm row-body hover:shadow-lg hover:-translate-y-1 hover:cursor-pointer hover:border-transparent transition-all duration-600"
                  >
                    <td className="pl-2">{++index}</td>
                    <td className="flex items-center gap-2">
                      <img
                        src="http://localhost:8080/img/hinhcanhan.jpg"
                        alt="user"
                        className="w-12 h-12 rounded-full border-2"
                      />
                      ThanhTri237
                    </td>
                    <td>Nguyenthanhtri230799@gmail.com</td>
                    <td className="uppercase text-[0.75rem]">
                      {" "}
                      <span className="bg-yellow-400 py-1 px-3 text-white rounded-lg">
                        Admin
                      </span>
                    </td>
                    <td>
                      <IoCalendarOutline className="inline-block" size={20} />{" "}
                      <span className="">1/7/2024</span>
                    </td>
                    <td>
                      <MdEditCalendar className="inline-block" size={20} />{" "}
                      <span className="">1/9/2024</span>{" "}
                    </td>
                    <td className="text-center relative">
                      <button className="p-2 cursor-pointer">
                        <FaEllipsisV className="text-xl" />
                      </button>
                      <ul className="absolute text-left border-[1px]   bg-white px-4 py-2 rounded-md shadow-md z-10 right-5 top-15 cursor-pointer flex gap-3 invisible opacity-0  text-xl transition-all duration-600">
                        <li className="p-2">
                          <FaRegTrashCan className="hover:text-red-700" />
                        </li>
                        <li className="p-2">
                          <FaPenToSquare className="hover:text-red-700" />
                        </li>
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot></tfoot>
            </table>
          </div>
        </div>
        <div className="w-full flex justify-end px-14 gap-3 text-lg">
          <button className="border-2 py-1 px-4 rounded-lg">
            <FaArrowLeftLong />
          </button>
          <button className="border-2 py-1 px-4 rounded-lg">
            <FaArrowRightLong />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;

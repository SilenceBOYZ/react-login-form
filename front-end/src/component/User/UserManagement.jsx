import { FaSearch } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { useEffect, useState } from "react";
import { selectUsers } from "../../api/user";
import UserView from "./UserView";
import { useSearchParams } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import Pagination from "../ui/Pagination";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [searchParams] = useSearchParams();
  let pageNum = parseInt(searchParams.get("pageNum")) || 1;

  useEffect(() => {
    async function selectUser() {
      const result = await selectUsers(pageNum);
      console.log(result);
      setUsers(result);
    }
    selectUser();
  }, [setUsers, pageNum]);

  return (
    <>
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
          {users?.data?.length ? (
            <>
              <table className="w-full mb-4">
                <thead className="">
                  <tr className="text-neutral-500">
                    <th scope="col" className="w-[5%] pl-2">
                      #
                    </th>
                    <th scope="col" className="w-[15%]">
                      User name
                    </th>
                    <th scope="col" className="w-[28%]">
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
                    <th scope="col" className="w-[8%]">
                      Active
                    </th>
                    <th scope="col" className="w-[5%]">
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody className="select-none">
                  {users?.data.map((user, index) => (
                    <UserView key={user.username} index={index} user={user} />
                  ))}
                </tbody>
              </table>
              <Pagination
                endingLink={users.totalLink}
                nextPage={pageNum}
                prevPage={pageNum}
              />
            </>
          ) : (
            <LinearProgress />
          )}
        </div>
      </div>
    </>
  );
}

export default UserManagement;

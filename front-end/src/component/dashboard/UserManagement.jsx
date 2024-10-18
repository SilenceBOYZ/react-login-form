import { FaSearch } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { useEffect, useState } from "react";
import { selectUsers } from "../../api/user";
import UserView from "./UserView";
import { useSearchParams } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { Pagination } from "@mui/material";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  let pageNum = parseInt(searchParams.get("pageNum")) || 1;
  if (pageNum > users?.totalLink) {
    setSearchParams(1);
  }

  useEffect(() => {
    async function selectUser() {
      const result = await selectUsers(pageNum);
      setUsers(result);
    }
    selectUser();
  }, [setUsers, pageNum]);

  function handleOnchange(e, target) {
    setSearchParams({ pageNum: target });
  }

  return (
    <>
      <div className="px-12 py-6 h-full">
        <div className=" px-6 py-4 shadow-lg rounded-xl border-2  min-h-[50rem] flex flex-col">
          <div className="mb-4 w-full flex gap-6">
            <div className="flex ">
              <input
                type="text"
                placeholder="Type the user name"
                className="py-3 pl-4  pr-6 text-lg border-2 rounded-md outline-none target:border-none w-[24rem] font-medium text-neutral-500"
              />
              <button className="-ml-8">
                <FaSearch className="text-neutral-500" />
              </button>
            </div>
            <div className="relative flex">
              <button
                className="border-2 p-2 rounded-md"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="px-1 flex items-center gap-4">
                  <IoFilter size={18} />
                  <span className="text-lg font-medium text-neutral-500">
                    Filter
                  </span>
                </span>

                <ul
                  className={`absolute text-left text-sm bg-white rounded-md
                 shadow-md z-10 right-0 top-16 w-[12rem] cursor-pointer ${
                   !isOpen ? "invisible opacity-0" : "visible opacity-100"
                 }
                 transition-all duration-500`}
                >
                  <li className="py-4 mb-2 px-4 font-medium hover:bg-neutral-200 transition-all duration-600">
                    Order A to Z
                  </li>
                  <li className="py-4 mb-2 px-4 font-medium hover:bg-neutral-200 transition-all duration-600">
                    Order Z to A
                  </li>
                  <li className="py-4 mb-2 px-4 font-medium hover:bg-neutral-200 transition-all duration-600">
                    Filter by position
                  </li>
                </ul>
              </button>
            </div>
          </div>
          {users?.data?.length ? (
            <>
              <table className="w-full mb-4 ">
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
                className="mt-auto self-end"
                color="secondary"
                count={users.totalLink}
                onChange={handleOnchange}
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

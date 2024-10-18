import { useEffect, useState } from "react";
import { selectUsers } from "../../api/user";
import UserView from "./UserView";
import { useSearchParams } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { Pagination } from "@mui/material";
import SearchBar from "./SearchBar";

function UserManagement() {
  const [users, setUsers] = useState([]);

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
          <SearchBar />
          {users?.data?.length ? (
            <>
              <table className="w-full mb-4 ">
                <thead className="text-lg text-neutral-800">
                  <tr className="">
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
                    <th scope="col" className="w-[5%] text-center">
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

import { IoCalendarOutline } from "react-icons/io5";
import { MdEditCalendar } from "react-icons/md";
import { FaEllipsisV } from "react-icons/fa";
import { FaRegTrashCan, FaPenToSquare } from "react-icons/fa6";
import { formatDate } from "../../utils/formatDate";

function UserView({ index, user }) {
  const { username, email, rolename, createdAt, updatedAt, is_active } = user;
  const roleColor = {
    admin: "bg-yellow-400",
    customer: "bg-blue-400",
    designer: "bg-purple-400",
  };

  return (
    <tr className="font-semibold  text-lg text-neutral-500 row-body hover:shadow-lg hover:-translate-y-1 hover:cursor-pointer hover:border-transparent transition-all duration-600">
      <td className="pl-2">{++index}</td>
      <td className="">{username}</td>
      <td>{email}</td>
      <td className="uppercase text-[0.75rem]">
        {" "}
        <span
          className={`${roleColor[rolename]} py-1 px-3 text-white rounded-lg`}
        >
          {rolename}
        </span>
      </td>
      <td>
        <IoCalendarOutline className="inline-block" size={20} />{" "}
        <span className="text-sm">{formatDate(createdAt)}</span>
      </td>
      <td>
        <MdEditCalendar className="inline-block" size={20} />{" "}
        <span className="text-sm">{formatDate(updatedAt)}</span>{" "}
      </td>
      <td>
        <span className={`${is_active ? 'bg-blue-500': "bg-red-500"} py-1 px-3 text-white rounded-lg text-sm`}>active</span>
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
  );
}

export default UserView;

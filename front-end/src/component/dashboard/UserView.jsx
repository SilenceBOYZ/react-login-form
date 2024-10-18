import { IoCalendarOutline } from "react-icons/io5";
import { MdEditCalendar } from "react-icons/md";
import { FaRegTrashCan, FaPenToSquare } from "react-icons/fa6";
import { formatDate } from "../../utils/formatDate";

function UserView({ index, user }) {
  const { username, email, rolename, createdAt, updatedAt, is_active } = user;
  const roleColor = {
    customer: "text-blue-600",
    designer: "text-purple-600",
  };

  return (
    <tr className="font-semibold  text-lg text-neutral-500 row-body hover:shadow-lg hover:-translate-y-1 hover:cursor-pointer hover:border-transparent transition-all duration-600">
      <td className="pl-2">{++index}</td>
      <td className="">{username}</td>
      <td>{email}</td>
      <td className="text-[0.75rem] capitalize">
        {" "}
        <span className={`${roleColor[rolename]} text-lg`}>{rolename}</span>
      </td>
      <td>
        <IoCalendarOutline className="inline-block" size={20} />{" "}
        <span className="text-sm">{formatDate(createdAt)}</span>
      </td>
      <td>
        <MdEditCalendar className="inline-block" size={20} />{" "}
        <span className="text-sm">{formatDate(updatedAt)}</span>{" "}
      </td>
      <td className="text-left">
        <span
          className={`${
            is_active ? "text-blue-500" : "text-red-500"
          }   rounded-lg text-lg capitalize`}
        >
          active
        </span>
      </td>
      <td className="text-center relative">
        <ul className=" text-left cursor-pointer flex gap-3 text-xl transition-all duration-600">
          <li className="p-2">
            <button>
              <FaPenToSquare className="hover:text-red-700" />
            </button>
          </li>
          <li className="p-2">
            <button>
              <FaRegTrashCan className="hover:text-red-700" />
            </button>
          </li>
        </ul>
      </td>
    </tr>
  );
}

export default UserView;

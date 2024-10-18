import { Link } from "react-router-dom";

function LinkNavigate({title = "Create a new account", link ="../login", buttonTitle = "Regist"}) {
  return (
    <div className="text-sm text-right w-full font-semibold text-black  mb-4">
      <span className="mr-2 pb-1  ">{title}</span>
      <Link
        to={link}
        className="p-0.5 px-3 border-[2px] rounded-lg text-sm border-neutral-600 hover:border-red-300 hover:bg-red-300 hover:text-white transition-all duration-500"
      >
        {" "}
        <span className="text-[0.75rem] pr-1">{buttonTitle}</span>
      </Link>
    </div>
  );
}

export default LinkNavigate;

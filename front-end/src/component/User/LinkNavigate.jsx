import { Link } from "react-router-dom";

function LinkNavigate({title = "Create a new account", link ="../login", buttonTitle = "Regist"}) {
  return (
    <div className="text-sm text-right w-full font-semibold text-neutral-500 mb-4">
      <span className="mr-2">{title}</span>
      <Link
        to={link}
        className="p-0.5 px-3 border-[2px] rounded-xl text-sm"
      >
        {" "}
        <span className="text-[0.75rem] pr-1">{buttonTitle}</span>
      </Link>
    </div>
  );
}

export default LinkNavigate;

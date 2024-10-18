import { Link } from "react-router-dom";

function VerifyNotification({
  title = "Verify your email Sucesss",
  message = "Go back to login page",
  link = "../login",
  buttonTitlte = "Sign in",
}) {
  return (
    <div className="px-[3rem] box-border space-y-3 pt-14">
      <div className="space-y-8 font-bold text-center">
        <h1 className="mb-1">
          <strong className="text-3xl font-bold">{title}</strong>
        </h1>
        <span className="text-neutral-600 font-medium text-xl ">{message}</span>
        <div className="flex justify-center">
          <img src="../src/assets/mail.png" alt="email" />
        </div>
        <Link to={link} className="p-3 rounded-md text-sm block bg-red-400">
          {" "}
          <span className="text-lg text-white">{buttonTitlte}</span>
        </Link>
      </div>
    </div>
  );
}

export default VerifyNotification;

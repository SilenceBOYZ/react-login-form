import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Notification() {
  const { state } = useLocation();
  const navigate = useNavigate();

  function handleOnclick() {
    navigate("../login", { state: { email: null } });
  }

  useEffect(() => {
    if (!state) navigate("../");
  }, [state, navigate]);

  return (
    <div className="px-[2rem] box-border space-y-3 pt-14">
      <div className="space-y-4 font-bold text-center">
        <h1 className="">
          <strong className="text-3xl font-bold">Email sent</strong>
        </h1>
        <p className="text-neutral-500 font-medium text-lg ">
          <span className="block">
            {" "}
            A link to verify your password has been sent to you on{" "}
          </span>
          <span className="block text-neutral-800"> {state?.email}</span>
        </p>

        <div className="flex justify-center">
          <img src="../src/assets/mail.png" alt="email" />
        </div>

        <button
          onClick={handleOnclick}
          className="p-3 rounded-md text-sm block bg-red-400 w-full mt-[2rem_!important]"
        >
          {" "}
          <span className="text-lg text-white">Sign in</span>
        </button>
      </div>
    </div>
  );
}

export default Notification;

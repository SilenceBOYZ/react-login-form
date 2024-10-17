import { Link } from "react-router-dom";

function VerifySuccess() {
  return (
      <div className="px-[3rem] box-border space-y-3 pt-14">
        <div className="space-y-8 font-bold text-center">
          <h1 className="mb-1">
            <strong className="text-3xl font-bold">
              Verify your email Sucesss
            </strong>
          </h1>
          <span className="text-neutral-600 font-medium text-xl ">
            Go back to login page
          </span>
          <div className="flex justify-center">
            <img src="../src/assets/mail.png" alt="email" />
          </div>
          <Link
            to={"../login"}
            className="p-3 rounded-md text-sm block bg-red-400"
          >
            {" "}
            <span className="text-lg text-white">Sign in</span>
          </Link>
        </div>
      </div>
  );
}

export default VerifySuccess;

import { Link } from "react-router-dom";

function VerifyEmail() {
  return (
    <>
      <div className="text-sm text-right w-full font-semibold text-neutral-500 mb-8">
        <span className="mr-2">Login to account</span>
        <Link
          to={"../login"}
          className="p-0.5 px-3 border-[2px] rounded-xl text-sm"
        >
          {" "}
          <span className="text-[0.75rem] pr-1">Sign in</span>
        </Link>
      </div>

      <div className="px-[3rem] box-border space-y-3">
        <div className="space-y-8 font-bold text-center">
          <h1 className="">
            <strong className="text-4xl font-bold">Verify your email</strong>
          </h1>
          <span className="text-neutral-600 font-medium text-xl ">
            Check your mail to verify your account
          </span>
          <div className="flex justify-center">
            <img src="../src/assets/mail.png" alt="email" />
          </div>
        </div>
      </div>
    </>
  );
}

export default VerifyEmail;

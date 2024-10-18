import LinkNavigate from "./LinkNavigate";

function VerifyEmail() {
  return (
    <>
      <LinkNavigate 
        title="Login to account"
        link="../login"
        buttonTitle="Login"
      />

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

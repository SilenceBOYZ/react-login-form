import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/user";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthenticateContext";

function LoginForm() {
  const navigate = useNavigate();
  const { setUserInfor } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleOnSubmit(data) {
    let result = await login(data);
    if (result.errCode === 1) {
      toast.error(result.message);
    }
    if (result.errCode === 2) {
      toast.error(result.message);
    }
    if (result.errCode === 3) {
      toast.error(result.message);
      navigate("../verify-email");
    }
    if (result.errCode === 0) {
      sessionStorage.setItem("user-login", result.username);
      setUserInfor(result.username);
      navigate("/home");
    }
  }
  return (
    <>
      <div className="text-sm text-right w-full font-semibold text-neutral-500 mb-4">
        <span className="mr-2">Create a new account</span>
        <Link
          to={"../signup"}
          className="p-0.5 px-3 border-[2px] rounded-xl text-sm"
        >
          {" "}
          <span className="text-[0.75rem] pr-1">Regist</span>
        </Link>
      </div>

      <div className="px-[3rem]">
        <div className="mb-4 font-bold">
          <h1 className="uppercase ">
            Welcome to{" "}
            <strong className="text-3xl font-bold">CODESTRINGERS</strong>
          </h1>
          <span className="text-neutral-500 text-sm ">
            Login to experiment our community
          </span>
        </div>

        <form className="space-y-2" onSubmit={handleSubmit(handleOnSubmit)}>
          <Input
            type="text"
            name="username"
            register={{
              ...register("username", {
                required: "The input can not be empty",
                minLength: {
                  value: 6,
                  message: "Invalid name",
                },
                maxLength: {
                  value: 15,
                  message: "Invalid name",
                },
                pattern: {
                  value: /^[\w\s-]+$/,
                  message: "Invalid name",
                },
              }),
            }}
            errorMessage={errors}
            labelField="Username"
            placeholder="Enter your name"
            width="w-full"
          />
          <Input
            type="password"
            name="password"
            register={{
              ...register("password", {
                required: "The input can not be empty",
                minLength: {
                  value: 7,
                  message: "Password must be greater than 8 characters",
                },
                maxLength: {
                  value: 16,
                  message: "Password must be less than 8 characters",
                },
              }),
            }}
            labelField="Password"
            errorMessage={errors}
            placeholder="Enter your password"
            width="w-full"
          />
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-12 py-1.5 text-white font-semibold rounded-full mt-[.5rem_!important]"
              style={{ backgroundColor: "#F56D6D" }}
            >
              Login
            </button>
            <Link
              to={"../reset-password"}
              className="rounded-xl text-sm font-semibold text-neutral-600 text-right hover:cursor-pointer hover:text-red-600 transition-all duration-300"
            >
              Forgot your password ?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;

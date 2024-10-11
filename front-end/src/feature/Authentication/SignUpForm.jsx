import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../api/user";
import toast from "react-hot-toast";
import { useState } from "react";

function SignUpForm() {
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  async function handleOnSubmit(data) {
    setIsSubmit(true);
    const result = await signup(data);
    if (result.errCode === 0) {
      toast.success(result.message);
      navigate("../verify-email");
      reset();
    }
    if (result.errCode === 1) {
      toast.error(result.message);
      setIsSubmit(false);
    }
    if (result.errCode === 2) {
      toast.error(result.message);
      setIsSubmit(false);
    }
  }

  return (
    <>
      <div className="text-sm text-right w-full font-semibold text-neutral-500 mb-4">
        <span className="mr-2">Already have an account</span>
        <Link
          to={"../login"}
          className="p-0.5 px-3 border-[2px] rounded-xl text-sm"
        >
          {" "}
          <span className="text-[0.75rem]">Sign in</span>
        </Link>
      </div>

      <div className="px-[3rem]">
        <div className="mb-4 font-bold">
          <h1 className="uppercase ">
            Welcome to{" "}
            <strong className="text-3xl font-bold">CODESTRINGERS</strong>
          </h1>
          <span className="text-neutral-500 text-sm ">
            Register your account
          </span>
        </div>

        <form className="space-y-2 " onSubmit={handleSubmit(handleOnSubmit)}>
          <Input
            disable={isSubmit}
            type="text"
            name="username"
            register={{
              ...register("username", {
                required: "The input can not be empty",
                minLength: {
                  value: 6,
                  message: "Username must larger than 5 characters",
                },
                maxLength: {
                  value: 15,
                  message: "username must less than 12 characters",
                },
              }),
            }}
            labelField="User name"
            errorMessage={errors}
            placeholder="Thanhtri2307"
            width="w-full"
          />
          <Input
            disable={isSubmit}
            type="email"
            name="email"
            register={{
              ...register("email", {
                required: "The input can not be empty",
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Invalid Email",
                },
              }),
            }}
            errorMessage={errors}
            labelField="Email"
            placeholder="Example@gmail.com"
            width="w-full"
          />
          <Input
            disable={isSubmit}
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

          <Input
            disable={isSubmit}
            type="password"
            name="confirmPassword"
            register={{
              ...register("confirmPassword", {
                required: "The input can not be empty",
                minLength: {
                  value: 7,
                  message: "Password must be greater than 8 characters",
                },
                maxLength: {
                  value: 16,
                  message: "Password must be less than 8 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password contains the number, special character, capitialize",
                },
                validate: (fieldValue) => {
                  return fieldValue === getValues()?.password
                    ? null
                    : "The password does not match";
                },
              }),
            }}
            labelField="Confirm password"
            errorMessage={errors}
            placeholder="Enter your password"
            width="w-full"
          />
          <button
            type="submit"
            className="float-end px-12 py-1.5 text-white font-semibold rounded-full mt-[.5rem_!important]"
            style={{ backgroundColor: "#F56D6D" }}
          >
            Regist
          </button>
        </form>
      </div>
    </>
  );
}

export default SignUpForm;

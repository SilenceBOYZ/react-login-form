import { useForm } from "react-hook-form";
import Input from "../ui/Input";
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
    setError,
    formState: { errors },
  } = useForm();

  async function handleOnSubmit(data) {
    setIsSubmit(true);
    const result = await signup(data);
    if (!result.errCode) {
      toast.success(result.message);
      navigate("../verify-email");
      reset();
    } else {
      setError(result.fieldError, { type: "custom", message: result.message});
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
                  value: 4,
                  message: "Invalid character length",
                },
                maxLength: {
                  value: 30,
                  message: "Invalid character length",
                },
                pattern: {
                  value: /^[\w\s-]+$/,
                  message: "Invalid name",
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
                  value: 5,
                  message: "Invalid character length",
                },
                maxLength: {
                  value: 40,
                  message: "Invalid character length",
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9@]+$/,
                  message:
                    "Must contain uppercase, digit, @sybmols, no whitespace",
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
            name="confirm_password"
            register={{
              ...register("confirm_password", {
                required: "The input can not be empty",
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

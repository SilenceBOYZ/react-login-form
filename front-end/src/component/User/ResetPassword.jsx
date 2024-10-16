import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../../api/user";
import toast from "react-hot-toast";
import { useState } from "react";
function ResetPassword() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const tokenString = searchParams.get("tokenString");

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
    let result = await resetPassword(data, userId, tokenString);
    if (!result.errCode) {
      toast.success(result.message);
      reset();
      navigate('../authentication');
    } else {
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
        <div className="font-bold text-center mb-8">
          <h1 className="">
            <strong className="text-3xl font-bold">Reset your password</strong>
          </h1>
          <span className="text-neutral-500 text-sm">
            Type your new password
          </span>
        </div>

        <form className="space-y-2 " onSubmit={handleSubmit(handleOnSubmit)}>
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
                minLength: {
                  value: 7,
                  message: "Password must be greater than 8 characters",
                },
                maxLength: {
                  value: 16,
                  message: "Password must be less than 8 characters",
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9@]+$/,
                  message:
                    "Must contain uppercase, digit, @sybmols, no whitespace",
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
            className=" px-12 py-1.5 text-white font-semibold rounded-md w-full"
            style={{ backgroundColor: "#F56D6D" }}
          >
            Reset Your password
          </button>
        </form>
      </div>
    </>
  );
}

export default ResetPassword;

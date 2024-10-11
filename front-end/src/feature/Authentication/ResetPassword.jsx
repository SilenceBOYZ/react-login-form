import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import { Link, Navigate } from "react-router-dom";
import { login, sendToken } from "../../api/user";
import toast from "react-hot-toast";
import { FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";

function ResetPassword() {
  const [isSubmit, setIsSubmit] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    register: registEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errorsEmail },
  } = useForm();

  async function handleOnSubmit(data) {
    let result = await login(data);
    if (result.errCode === 1) {
      toast.error(result.errMessage);
    }
    if (result.errCode === 2) {
      toast.error(result.errMessage);
    }
    if (result.errCode === 0) {
      Navigate("/home");
    }
  }

  async function handleOnSendToken(data) {
    let result = await sendToken(data);
    console.log(result);
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

      <div className="px-[3rem] box-border">
        <div className="mb-4 font-bold">
          <h1 className="">
            <strong className="text-3xl font-bold">ResetYourPassword</strong>
          </h1>
          <span className="text-neutral-500 text-sm ">
            Enter your email to receive the token
          </span>
        </div>

        <form className="space-y-3 " onSubmit={handleSubmitEmail(handleOnSendToken)}>
          <div>
            <Input
              type="email"
              name="email"
              disable={isSubmit}
              register={{
                ...registEmail("email", {
                  required: "The input can not be empty",
                  minLength: {
                    value: 4,
                    message: "Email người dùng phải từ 4 đến 12 ký tự",
                  },
                  maxLength: {
                    value: 30,
                    message: "Email người dùng phải từ 4 đến 30 ký tự",
                  },
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Email không hợp lệ",
                  },
                }),
              }}
              errorMessage={errorsEmail}
              labelField="Enter your email"
              placeholder="Example@gmail.com"
              width="w-full"
            />
            {!isSubmit ? (
              <button
                type="submit"
                className="text-neutral-500 font-semibold text-sm flex justify-end w-full items-center gap-1 hover:text-red-500 transition-all duration-300"
              >
                <span>Get the token to your email</span>
                <FaArrowRightLong />
              </button>
            ) : (
              <span className="block w-full text-right text-sm text-red-600 font-semibold">
                Check your gmail to get the token...
              </span>
            )}
          </div>
        </form>

        <form className="space-y-3" onSubmit={handleSubmit(handleOnSubmit)}>
          <Input
            type="password"
            name="resetPasswordString"
            register={{
              ...register("secretKey", {
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
            errorMessage={errors}
            labelField="Reset password token"
            placeholder="Enter your "
            width="w-full"
          />
          <div className="flex items-center justify-end mt-[.5rem_!important]">
            <button
              type="submit"
              className="px-12 py-1.5 text-white font-semibold rounded-sm "
              style={{ backgroundColor: "#F56D6D" }}
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ResetPassword;

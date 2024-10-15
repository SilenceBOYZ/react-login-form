import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import { Link, useNavigate } from "react-router-dom";
import { sendToken, verify } from "../../api/user";
import toast from "react-hot-toast";
import { FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";

function ResetPassword() {
  const [isSubmit] = useState(false);
  const navigate = useNavigate();

  const {
    register: regisSecet,
    handleSubmit: handleTokenSubmit,
    formState: { errors },
  } = useForm();

  const {
    register: registEmail,
    handleSubmit: handleSubmitEmail,
    getValues: getValuesEmail,
    formState: { errors: errorsEmail },
  } = useForm();

  // Chia Hai form ra xử lý từng request
  async function handleOnSubmitToken(data) {
    data.email = getValuesEmail()?.email;
    let result = await verify(data);
    console.log(result);
    if (result.errCode) toast.error(result.message);
    else {
      toast.success(result.message);
      navigate('../create-new-password', {state: {username: result.username}})
    }
  }

  async function handleOnSendToken(data) {
    let result = await sendToken(data);
    if (!result.errCode) toast.success(result.message);
    else toast.error(result.message);
  }

  return (
    <>
      <div className="text-sm text-right w-full font-semibold text-neutral-500 mb-4">
        <span className="mr-2">Login to account</span>
        <Link
          to={"../login"}
          className="p-0.5 px-3 border-[2px] rounded-xl text-sm"
        >
          {" "}
          <span className="text-[0.75rem] pr-1">Sign in</span>
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

        <form
          className="space-y-3 "
          onSubmit={handleSubmitEmail(handleOnSendToken)}
        >
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

        <form
          className="space-y-3"
          onSubmit={handleTokenSubmit(handleOnSubmitToken)}
        >
          <Input
            type="password"
            name="secretKey"
            register={{
              ...regisSecet("secretKey", {
                required: "The input can not be empty",
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

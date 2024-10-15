import { useForm } from "react-hook-form";
import Input from "../Input";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";
import { verify } from "../../api/user";
import toast from "react-hot-toast";

function VerifyEmail() {
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  async function handleOnSubmit(data) {
    console.log(data);
    let result = await verify(data);
    console.log(result);
    if (!result.errCode) {
      toast.success("You account have been active");
      navigate("../login");
    } 
    if(result.errCode) {
      toast.error(result.message);
    }
  }

  async function submitTheEmail() {
    let email = getValues().email;
    if (!email) return;
    if (errors["email"]) return;
    setIsSubmit(true);
  }
  return (
    <>
      <div className="text-sm text-right w-full font-semibold text-neutral-500 mb-4">
        <span className="mr-2">Login to account</span>
        <Link
          to={"../signup"}
          className="p-0.5 px-3 border-[2px] rounded-xl text-sm"
        >
          {" "}
          <span className="text-[0.75rem] pr-1">Sign in</span>
        </Link>
      </div>

      <div className="px-[3rem] box-border space-y-3">
        <div className="mb-4 font-bold">
          <h1 className="">
            <strong className="text-3xl font-bold">Verify your email</strong>
          </h1>
          <span className="text-neutral-500 text-sm ">
            Check your email to get the token
          </span>
        </div>

        <form className="space-y-3 " onSubmit={handleSubmit(handleOnSubmit)}>
          <div>
            <Input
              type="email"
              name="email"
              disable={isSubmit}
              register={{
                ...register("email", {
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
              errorMessage={errors}
              labelField="Enter your email"
              placeholder="Example@gmail.com"
              width="w-full"
            />
            {!isSubmit ? (
              <button
                onClick={submitTheEmail}
                className="text-neutral-500 font-semibold text-sm flex justify-end w-full items-center gap-1 hover:text-red-500 transition-all duration-300"
              >
                <span>Click here to get the token to your gmail...</span>
                <FaArrowRightLong />
              </button>
            ) : (
              <span className="block w-full text-right text-sm text-red-600 font-semibold">
                Check your gmail to get the token...
              </span>
            )}
          </div>

          <Input
            type="password"
            name="secretKey"
            disable={!isSubmit}
            register={{
              ...register("secretKey", {
                required: "The input can not be empty",
              }),
            }}
            errorMessage={errors}
            labelField="Enter your token to access your account"
            placeholder="Enter your token to verify account"
            width="w-full"
          />
          {isSubmit ? (
            <div className="flex items-center justify-end mt-[.5rem_!important]">
              <button
                type="submit"
                className="px-12 py-1.5 text-white font-semibold rounded-sm "
                style={{ backgroundColor: "#F56D6D" }}
              >
                Verify
              </button>
            </div>
          ) : null}
        </form>
      </div>
    </>
  );
}

export default VerifyEmail;

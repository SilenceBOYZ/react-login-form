import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import { Link, useNavigate } from "react-router-dom";
import { sendToken } from "../../api/user";
import toast from "react-hot-toast";
import { useState } from "react";

function ForgotPassword() {
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors: errorsEmail },
  } = useForm();

  async function handleOnSendToken(data) {
    setIsSubmit(true);
    let result = await sendToken(data);
    if (!result.errCode) {
      toast.success(result.message);
      navigate("../trouble-signing-in-success", {
        state: { email: data.email },
      });
    } else {
      setError(result.fieldError, { type: 'custom', message: result.message });
      setIsSubmit(false);
    }
  }

  return (
    <>
      <div className="text-sm text-right w-full font-semibold text-neutral-500 mb-4">
        <span className="mr-2">Create a new account</span>
        <Link
          to={"../login"}
          className="p-0.5 px-3 border-[2px] rounded-xl text-sm"
        >
          {" "}
          <span className="text-[0.75rem] pr-1">login</span>
        </Link>
      </div>

      <div className="px-[3rem] box-border pt-8">
        <div className="font-bold text-center mb-8">
          <h1 className="">
            <strong className="text-3xl font-bold">Forgot password</strong>
          </h1>
          <span className="text-neutral-500 text-lg">
            Enter your email to receive the token
          </span>
        </div>

        <form
          className="space-y-6"
          onSubmit={handleSubmit(handleOnSendToken)}
        >
          <Input
            type="email"
            name="email"
            disable={isSubmit}
            register={{
              ...register("email", {
                required: "The input can not be empty",
                minLength: {
                  value: 4,
                  message: "Invalid character length",
                },
                maxLength: {
                  value: 50,
                  message: "Invalid character length",
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
          <div className="flex w-full">
            <button
              disabled={isSubmit}
              type="submit"
              className="px-12 py-1.5 text-white font-semibold rounded-sm inline-block w-full"
              style={{ backgroundColor: "#F56D6D" }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ForgotPassword;

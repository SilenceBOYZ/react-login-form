import { useForm } from "react-hook-form";
import Input from "../../ui/Input"
import MainLayout from "../../component/MainLayout";
import { Link, Navigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

function CreateNewPassword() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  async function handleOnSubmit(data) {

  }

  return (
    <MainLayout>
      <div className="w-5/12">
        <div
          className={`bg-red-400 w-full h-full `}
        >
          <img className="w-full h-full" src="http://localhost:8080/img/backgroundLogin.jpg" alt="background login" />
        </div>
      </div>
      <div className="p-6 w-7/12">

        <div className="text-sm text-right w-full font-semibold text-neutral-500 mb-4">
          <span className="mr-2">Create a new account</span>
          <Link to={'../signup'} className="p-0.5 px-3 border-[2px] rounded-xl text-sm"> <span className="text-[0.75rem] pr-1">Regist</span></Link>
        </div>

        <div className="px-[3rem]">
          <div className="mb-4 font-bold">
            <h1 className=""><strong className="text-3xl font-bold">ResetYourPassword</strong></h1>
            <span className="text-neutral-500 text-sm ">Enter your email to receive the token</span>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleOnSubmit)}>

            <Input type="password" name="password" register={{
              ...register("password", {
                required: "The input can not be empty", minLength: {
                  value: 7,
                  message: "Password must be greater than 8 characters"
                }, maxLength: {
                  value: 16,
                  message: "Password must be less than 8 characters"
                }
              })
            }}
              labelField="Password"
              errorMessage={errors}
              placeholder="Enter your password"
              width="w-full"
            />

            <Input type="password" name="confirmPassword" register={{
              ...register("confirmPassword", {
                required: "The input can not be empty", minLength: {
                  value: 7,
                  message: "Password must be greater than 8 characters"
                }, maxLength: {
                  value: 16,
                  message: "Password must be less than 8 characters"
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "Password contains the number, special character, capitialize"
                },
                validate: (fieldValue) => {
                  return fieldValue === getValues()?.password ? null : "The password does not match"
                }
              })
            }}
              labelField="Confirm password"
              errorMessage={errors}
              placeholder="Enter your password"
              width="w-full"
            />
            <div className="flex items-center justify-end mt-[.5rem_!important]">
              <button type="submit" className="px-12 py-1.5 text-white font-semibold rounded-sm " style={{ 'backgroundColor': '#F56D6D' }}>Verify</button>
            </div>

          </form>
        </div>
      </div>
    </MainLayout>
  )
}

export default CreateNewPassword

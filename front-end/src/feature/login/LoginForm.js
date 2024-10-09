import MainLayout from "../../component/MainLayout"
import { useForm } from "react-hook-form"
import Input from "../../ui/Input";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/userApi";
import toast from "react-hot-toast";

function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  console.log(errors);

  async function handleOnSubmit(data) {
    let result = await login(data);
    if (result.errCode === 1) {
      toast.error(result.errMessage);
    }
    if (result.errCode === 2) {
      toast.error(result.errMessage);
    }
    if (result.errCode === 0) {
      navigate("/home")
    }
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
            <h1 className="uppercase ">Welcome to <strong className="text-3xl font-bold">CODESTRINGERS</strong></h1>
            <span className="text-neutral-500 text-sm ">Login to experiment our community</span>
          </div>

          <form className="space-y-2" onSubmit={handleSubmit(handleOnSubmit)}>

            <Input type="email" name="email" register={{
              ...register("email", {
                required: "The input can not be empty", minLength: {
                  value: 4,
                  message: "Email người dùng phải từ 4 đến 12 ký tự"
                }, maxLength: {
                  value: 30,
                  message: "Email người dùng phải từ 4 đến 30 ký tự"
                }, pattern: {
                  value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Email không hợp lệ"
                }
              })
            }}
              errorMessage={errors}
              labelField="Email"
              placeholder="Example@gmail.com"
              width="w-full"
            />
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
            <div className="flex items-center justify-between">
              <button type="submit" className="px-12 py-1.5 text-white font-semibold rounded-full mt-[.5rem_!important]" style={{ 'backgroundColor': '#F56D6D' }}>Login</button>
              <Link to={'../reset-password'} className="rounded-xl text-sm font-semibold text-neutral-600 text-right hover:cursor-pointer hover:text-red-600 transition-all duration-300">Forgot your password ?</Link>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  )
}

export default LoginForm;
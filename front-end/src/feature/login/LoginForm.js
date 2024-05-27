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
    formState: { errors },
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
      navigate("/home")
    }
  }

  return (
    <MainLayout>
      <div className="bg-transparent max-w-[450px] w-[375px] rounded-md backdrop-filter backdrop-blur-[20px]">
        <form className="p-5 space-y-4" onSubmit={handleSubmit(handleOnSubmit)}>
          <h1 className="text-center text-xl font-medium text-white mb-4">Đăng nhập</h1>
          <Input type="email" name="email" register={{
            ...register("email", {
              required: "Không được để trống", minLength: {
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
            label="Email"
            placeholder="Example@gmail.com"
            width="w-full"
          />
          <Input type="password" name="password" register={{
            ...register("password", {
              required: "Không được để trống", minLength: {
                value: 4,
                message: "Mật khẩu dùng phải từ 4 đến 12 ký tự"
              }, maxLength: {
                value: 30,
                message: "Mật dùng phải từ 4 đến 30 ký tự"
              }
            })
          }}
            errorMessage={errors}
            placeholder="Nhập mật khẩu đăng nhập"
            width="w-full"
          />

          <button type="submit" className="text-center w-full py-2 px-4 border-2 rounded-3xl tracking-wider transition-all duration-300 bg-transparent outline-none text-white">Đăng nhập</button>
          <p className="text-white w-full text-center text-lg">Bạn chưa có tài khoản <Link to="/signup" className="hover:text-violet-500 transition-all duration-300 font-medium">đăng ký</Link></p>
        </form>
      </div>
    </MainLayout>
  )
}

export default LoginForm

import MainLayout from "../../component/MainLayout"
import { useForm } from "react-hook-form"
import Input from "../../ui/Input";
import {  Link } from "react-router-dom";
import { signup } from "../../services/userApi";
import toast from "react-hot-toast";

function SignUpForm() {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  async function handleOnSubmit(data) {
    const result = await signup(data);
    if(result.errCode === 0) {
      toast.success(result.errMessage);
      reset();
    }
    if(result.errCode === 1) {
      toast.error(result.errMessage);
    }
    if(result.errCode === 2) {
      toast.error(result.errMessage);
    }
  }

  return (
    <MainLayout>
      <div className="bg-transparent max-w-[450px] w-[375px]  rounded-md backdrop-filter backdrop-blur-[20px]">
        <form className="p-5 space-y-4" onSubmit={handleSubmit(handleOnSubmit)}>
          <h1 className="text-center text-xl font-medium text-white mb-4">Đăng ký</h1>
          <Input type="text" name="username" register={{
            ...register("username", {
              required: "Không được để trống", minLength: {
                value: 4,
                message: "Tên người dùng phải từ 4 đến 12 ký tự"
              }, maxLength: {
                value: 30,
                message: "Tên người dùng phải từ 4 đến 30 ký tự"
              }
            })
          }}
            errorMessage={errors}
            label="username"
            placeholder="Nhập tên người dùng"
            width="w-full"
          />
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
                message: "Tên người dùng phải từ 4 đến 12 ký tự"
              }, maxLength: {
                value: 30,
                message: "Tên người dùng phải từ 4 đến 30 ký tự"
              }, pattern: {
                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: "Mật khẩu phải có 1 số, 1 tự đặc biệt và chữ in hoa"
              }
            })
          }}
            errorMessage={errors}
            placeholder="Nhập mật khẩu"
            width="w-full"
          />

          <Input type="password" name="confirmPassword" register={{
            ...register("confirmPassword", {
              required: "Không được để trống", minLength: {
                value: 4,
                message: "Tên người dùng phải từ 4 đến 12 ký tự"
              }, maxLength: {
                value: 30,
                message: "Tên người dùng phải từ 4 đến 30 ký tự"
              }, pattern: {
                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: "Mật khẩu phải có 1 số, 1 tự đặc biệt và chữ in hoa"
              },
              validate: (fieldValue) => {
                return fieldValue === getValues()?.password ? null : "Mật khẩu không trùng khớp"
              }
            })
          }}
            errorMessage={errors}
            label="Email"
            placeholder="Xác nhận mật khẩu"
            width="w-full"
          />

          <button type="submit" className="text-center w-full py-2 px-4 border-2 rounded-3xl tracking-wider transition-all duration-300 bg-transparent outline-none text-white">Đăng nhập</button>
          <p className="text-white w-full text-center text-lg">Bạn đã có tài khoản <Link to="/login" className="hover:text-violet-500 transition-all duration-300 font-medium">đăng nhập</Link></p>
        </form>
      </div>
    </MainLayout>
  )
}

export default SignUpForm

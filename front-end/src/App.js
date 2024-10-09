import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginForm from "./feature/login/LoginForm"
import SignUpForm from "./feature/signup/SignUpForm"
import { Toaster } from "react-hot-toast";
import Home from "./component/Home";
import ResetPassword from "./feature/resetPassword/ResetPassword";
import CreateNewPassword from "./feature/createNewPassword/CreateNewPassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/login" element={<LoginForm />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-password/re-create-password" element={<CreateNewPassword />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="*" element={<div>Not page have found</div>} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App

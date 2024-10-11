import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "./feature/Authentication/LoginForm";
import SignUpForm from "./feature/Authentication/SignUpForm";
import { Toaster } from "react-hot-toast";
import Home from "./component/Home";
import ResetPassword from "./feature/Authentication/ResetPassword";
import CreateNewPassword from "./feature/Authentication/CreateNewPassword";
import Authentication from "./feature/Authentication/Authentication";
import VerifyEmail from "./feature/Authentication/VerifyEmail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/authentication" element={<Authentication />}>
            <Route index element={<Navigate replace to="login" />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="verify-email" element={<VerifyEmail />} />
            <Route path="create-new-password" element={<CreateNewPassword />} />
            <Route path="signup" element={<SignUpForm />} />
          </Route>
          <Route path="*" element={<div>Not page have found</div>} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;

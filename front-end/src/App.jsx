import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LoginForm from "./component/User/LoginForm";
import SignUpForm from "./component/User/LoginForm";
import ResetPassword from "./component/User/LoginForm";
import CreateNewPassword from "./component/User/LoginForm";
import VerifyEmail from "./component/User/LoginForm";

import Home from "./page/Home";
import Authentication from "./page/Authentication";

import Error from "./component/ui/Error";

import { AuthenticateProvider } from "./context/AuthenticateContext";

function App() {
  return (
    <AuthenticateProvider>
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
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </AuthenticateProvider>
  );
}

export default App;

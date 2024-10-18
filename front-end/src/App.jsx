import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LoginForm from "./component/User/LoginForm";
import SignUpForm from "./component/User/SignUpForm";
import ResetPassword from "./component/User/ResetPassword";
import VerifyEmail from "./component/User/VerifyEmail";

import Home from "./page/Home";
import Authentication from "./page/Authentication";
import Admin from "./page/Admin";

import Error from "./component/ui/Error";

import { AuthenticateProvider } from "./context/AuthenticateContext";
import Notification from "./component/User/Notification";
import ForgotPassword from "./component/User/ForgotPassword";
import RequireAuth from "./component/RequireAuth";
import VerifyNotification from "./component/User/VerifyNotification";

function App() {
  return (
    <AuthenticateProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RequireAuth />}>
            <Route path="home" element={<Home />} />
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route path="/authentication" element={<Authentication />}>
            <Route index element={<Navigate replace to="login" />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="verify-email" element={<VerifyEmail />} />
            <Route
              path="trouble-signing-in-success"
              element={<Notification />}
            />
            <Route
              path="verify-error"
              element={
                <VerifyNotification
                  title="Verify Email Error"
                  message="invalid or expired token"
                  link="../login"
                  buttonTitlte="Go back to login page"
                />
              }
            />
            <Route
              path="verify-success"
              element={
                <VerifyNotification
                  title="Verify your email Sucesss"
                  message="Go back to login page"
                  link="../login"
                  buttonTitlte="Sign in"
                />
              }
            />
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

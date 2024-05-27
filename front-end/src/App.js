import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginForm from "./feature/login/LoginForm"
import SignUpForm from "./feature/signup/SignUpForm"
import { Toaster } from "react-hot-toast";
import Home from "./component/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="*" element={<div>Not page have found</div>} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App

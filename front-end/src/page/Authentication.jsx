import { Outlet, useNavigate } from "react-router-dom";
import MainLayout from "../component/ui/MainLayout";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthenticateContext";

function Authentication() {
  const navigate = useNavigate();
  const { userInfor } = useAuthContext();

  useEffect(() => {
    if (userInfor) navigate("../home");
  }, [navigate, userInfor]);

  return (
    <MainLayout>
      <div className="w-5/12">
        <div className={`bg-red-400 w-full h-full `}>
          <img
            className="w-full h-full"
            src="http://localhost:8080/img/backgroundLogin.jpg"
            alt="background login"
          />
        </div>
      </div>
      <div className="p-6 w-7/12">
        <Outlet />
      </div>
    </MainLayout>
  );
}

export default Authentication;

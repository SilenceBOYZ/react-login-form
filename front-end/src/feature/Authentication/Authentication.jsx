import { Outlet, useNavigate } from "react-router-dom";
import MainLayout from "../../component/MainLayout";
import { useEffect } from "react";

function Authentication() {
  const navigate = useNavigate();
  const authenticated = sessionStorage.getItem("user-login");

  useEffect(() => {
    if (authenticated) navigate("../home");
  }, [authenticated, navigate]);

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

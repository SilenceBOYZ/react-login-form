import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthenticateContext";
import { useEffect } from "react";
import { findUser } from "../api/user";

function RequireAuth() {
  const { userInfor } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfor) navigate("../authentication");
    else {
      findUser(userInfor)
        .then((result) => {
          if (result.data.rolename == "admin") {
            navigate("admin");
          } else {
            navigate("home");
          }
        })
        .catch((err) => console.error(err));
    }
  }, [navigate, userInfor]);

  return (
    <div className="min-h-dvh w-full">
      <Outlet />
    </div>
  );
}

export default RequireAuth;

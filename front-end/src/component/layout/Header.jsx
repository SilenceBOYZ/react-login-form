import { useNavigate } from "react-router-dom";
import { logout } from "../../api/user";
import { useAuthContext } from "../../context/AuthenticateContext";
import { Box, List, ListItemButton, ListItemText } from "@mui/material";

function Header({ title }) {
  const navigate = useNavigate();
  const { setUserInfor } = useAuthContext();

  function handleLogout() {
    setUserInfor(null);
    sessionStorage.clear();
    logout();
    navigate("/authentication");
  }
  return (
    <header className="w-full bg-neutral-700 h-16 px-14 flex items-center justify-between">
      <h1 className="uppercase text-white font-bold text-2xl w-1/2">{title}</h1>
      <div className="gap-4 relative w-1/2 flex justify-end">
        <img
          src="http://localhost:8080/img/hinhcanhan.jpg"
          alt="user"
          className="w-12 h-12 rounded-full border-2 "
        />

        

        <Box
          className="absolute right-0 top-[3rem] z-40 border-[1px] "
          sx={{ width: "12rem", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <List component="nav" aria-label="secondary mailbox folder">
            <ListItemButton>
              <ListItemText primary="Information" />
            </ListItemButton>
            <ListItemButton onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Box>
      </div>
    </header>
  );
}

export default Header;

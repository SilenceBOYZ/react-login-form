import UserManagement from "../component/dashboard/UserManagement";
import Header from "../component/layout/Header";

function Admin() {
  return (
    <>
      <Header title={"Admin Dashboard"} />
      <UserManagement />
    </>
  );
}

export default Admin;

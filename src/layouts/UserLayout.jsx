import { Outlet } from "react-router-dom";
import TopBar from "../components/user/TopBar";
import Navbar from "../components/user/Navbar";

const UserLayout = () => {
    return (
      <>
        <TopBar />
        <Navbar />
        <Outlet />
      </>
    );
  };
  
  export default UserLayout;
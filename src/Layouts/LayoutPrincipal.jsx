import { Outlet } from "react-router-dom";
import CompNavbar from "../Components/CompNavbar";

const LayoutPrincipal = () => {
  return (
    <>
      <CompNavbar />
      <Outlet />
    </>
  );
};

export default LayoutPrincipal;

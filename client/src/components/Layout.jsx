import { Outlet } from "react-router";
import { Nav } from "../components/Nav";

export const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

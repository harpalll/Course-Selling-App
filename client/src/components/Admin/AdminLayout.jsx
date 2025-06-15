import { Outlet } from "react-router";
import { AdminNav } from "./AdminNav";

export const AdminLayout = () => {
  return (
    <>
      <AdminNav />
      <Outlet />
    </>
  );
};

import Header from "./Header";
import { Outlet } from "react-router-dom";
export default function () {
  return (
    <div className="w-full h-full">
      <Header />
      <Outlet />
    </div>
  );
}

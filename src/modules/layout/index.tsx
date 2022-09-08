import { Outlet } from "react-router-dom";
import Connect from "modules/Connect";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => (
  <div className="relative min-h-screen pb-16 flex-col bg-shade-50">
    <Header />
    <Connect />
    <Outlet />
    <Footer />
  </div>
);

export default Layout;

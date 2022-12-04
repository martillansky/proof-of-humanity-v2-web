import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => (
  <div className="relative min-h-screen pb-16 flex-col bg-shade-50">
    <Header />
    <Outlet />
    <Footer />
  </div>
);

export default Layout;

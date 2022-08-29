import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => (
  <div className="min-h-screen flex-col background">
    <Header />
    <Outlet />
    <Footer />
  </div>
);

export default Layout;

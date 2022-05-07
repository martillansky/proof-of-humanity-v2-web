import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => (
  <div className="min-h-screen flex-col bg-background">
    <Header />
    <Outlet />
    <Footer />
  </div>
);

export default Layout;

import React from "react";
import ALink from "src/components/ALink";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => (
  <nav className="flex justify-between items-center text-white text-lg bg-gradient-to-r from-orange via-orange to-pink shadow-sm px-8 py-4">
    <ALink href="https://proofofhumanity.id/">Learn More</ALink>

    <ALink className="text-sm" href="https://kleros.io/">
      SECURED BY KLEROS
    </ALink>

    <span>...Social Media Links</span>
  </nav>
);

export default Header;

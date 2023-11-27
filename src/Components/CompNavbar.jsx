import React, { useContext } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";
import CompModal from "./CompModal";

import { Link as ReactRouterLink } from "react-router-dom";
import { ProductContext } from "../Hooks/productContext";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user } = useContext(ProductContext);

  const menuItems = (user && ["Home", "Registrar"]) ||
    (user === false && ["Home", "Ventas"]) || ["Home"];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem isActive key={index}>
            <Link
              color="foreground"
              to={item === "Home" ? "/" : `/${item}`}
              as={ReactRouterLink}
            >
              {item}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {user !== null ? (
            <Button color="secondary">Cerrar sesion</Button>
          ) : (
            <CompModal />
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color="foreground"
              to={item === "Home" ? "/" : `/${item}`}
              as={ReactRouterLink}
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

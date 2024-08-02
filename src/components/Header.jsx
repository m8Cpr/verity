import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, Switch } from "@nextui-org/react";
import React, { useContext, useEffect } from "react";
import { LightIcon } from "./Header/LightIcon";
import { DarkIcon } from "./Header/DarkIcon";
import { ThemeContext } from "./context/ThemeContext";

const Header = () => {

    const {isDark, setDark} = useContext(ThemeContext);

    const toggleTheme = () => {
        setDark(!isDark);
    }

    useEffect(() => {
        var scrollBarTrackColor = "#FFFFFF";
        const body = document.querySelector('body')
        if(isDark) {
            scrollBarTrackColor = "#222831"
        }
        body.classList.toggle("dark")
    }, [isDark])

    return (
        <Navbar isBordered className="w-full max-w-full" classNames={{
            item: [
              "flex",
              "relative",
              "h-full",
              "items-center",
              "data-[active=true]:after:content-['']",
              "data-[active=true]:after:absolute",
              "data-[active=true]:after:bottom-0",
              "data-[active=true]:after:left-0",
              "data-[active=true]:after:right-0",
              "data-[active=true]:after:h-[2px]",
              "data-[active=true]:after:rounded-[2px]",
              "data-[active=true]:after:bg-primary",
            ],
          }}>
            <NavbarBrand >
                <i className="icon-raid text-4xl"></i>
                <p className="ml-2 text-xl">Salvation's Tool</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem isActive >
                    <Link className="capitalize hover:text-primary transition-colors" color="foreground" href="#">
                        Verity encounter
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Switch isSelected={isDark}
                            size="lg"
                            color="primary"
                            onChange={toggleTheme}
                            thumbIcon={isDark ? (
                                <DarkIcon />                                
                                ) : (
                                <LightIcon />
                                )
                    }>

                    </Switch>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}

export default Header
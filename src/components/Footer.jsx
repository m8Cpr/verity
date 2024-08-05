import React from "react";
import { version } from "../../package.json"
import { Link } from "@nextui-org/react";
import { GithubIcon } from "./IconComponents/GithubIcon";

const Footer = () => {
    return (
        <>
            <div className="flex flex-col w-full gap-4 py-8">
                <span className="pl-4">{"Created by" + " "}
                    <Link className="font-bold"
                        isExternal
                        showAnchorIcon
                        href="https://github.com/m8Cpr"
                        anchorIcon={<GithubIcon />}>
                    M8Cpr
                    </Link>
                </span> 
                <small>v{version}</small>
            </div>
        </>
    )
}

export default Footer;
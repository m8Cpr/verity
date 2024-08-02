import { Button, Divider, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import React, { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";

const InfoPanel = () => {
    const { isDark } = useContext(ThemeContext);

    return (
        <Popover className={'text-foreground ' + (isDark ? "dark" : "light")} placement="left-end" backdrop="opaque">
            <PopoverTrigger>
                <Button isIconOnly color="primary" radius="full" variant="solid" className="self-end sticky bottom-8 right-8 lg:bottom-4">i</Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 lg:w-96">
                <div className="flex flex-col px-4 py-4 lg-py-6">
                    <span className="text-medium capitalize ">
                        <strong>Instructions</strong>
                    </span>
                    <Divider className="my-2 lg-my-4" />
                    <span className="text-small pb-1">Select 3 inside shapes and 3 outside shapes. They must meet the following requirements:</span>
                    <ul className="pl-4 list-disc">
                        <li className="text-small">
                            <span>Each outside shapes must be unique,</span>
                        </li>
                        <li className="text-small">
                            <span>For each external shape there are two corresponding two-dimensional shapes. There can be at most 2 two-dimensional shapes per type.</span>
                        </li>
                    </ul>
                    <Divider className={"my-4 lg-my-6"}/>
                    <span className="text-small">
                        <strong>Exemple:</strong> A pyramid is made of 2 triangles, and a cone is made of 1 triangle and 1 circle. Selecting these two shapes gives 3 triangles and 1 circle, which will never be correct.
                    </span>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default InfoPanel;

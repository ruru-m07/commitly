import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-end absolute left-0 top-0">
      <div className="flex space-x-4 mx-2 justify-between items-center mr-10 mt-3">
        {/* github link */}
        <Link
          href={"https://github.com/ruru-m07/commitly"}
          target="_blank"
          className={cn(
            buttonVariants({
              variant: "outline",
              size: "icon",
              className: "rounded-full w-10 h-10",
            })
          )}
        >
          <GitHubLogoIcon className="w-6 h-6" />
        </Link>

        <Image
          src={"/logo.jpeg"}
          alt="logo"
          width={100}
          height={100}
          className={cn(
            buttonVariants({
              variant: "outline",
              size: "icon",
              className: "rounded-full w-10 h-10",
            })
          )}
        />
      </div>
    </div>
  );
};

export default Navbar;

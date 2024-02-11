'use client'

import React from "react";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { User } from "@prisma/client";
import Categories from "./Categories";

interface NavbarProps { 
  currentUser: User | null
}

export default function Navbar({ currentUser }: NavbarProps) {
  // console.log(currentUser)
  
  return (
    <nav className="fixed bg-white w-full z-10 shadow-sm  ">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </nav>
  );
}

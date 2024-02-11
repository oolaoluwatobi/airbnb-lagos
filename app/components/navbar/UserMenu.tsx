"use client";

import React, { useCallback, useState } from "react";
import { signOut } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import useRentModal from "@/app/hooks/useRentModal";

interface UserMenuProps {
  currentUser?: User| null;
}

export default function UserMenu({ currentUser }: UserMenuProps) {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal()
  const [isOpen, setIsopen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsopen((prevValue) => !prevValue);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen()
    
  }, [currentUser, loginModal, rentModal])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-2 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition  "
        >
          <AiOutlineMenu size={20} />
          <div>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen ? (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-14 lg:top-12 test-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label="My trips" />
                <MenuItem onClick={() => {}} label="My reservations" />
                <MenuItem onClick={() => {}} label="My favorites" />
                <MenuItem onClick={() => {}} label="My properties" />
                <MenuItem onClick={rentModal.onOpen} label="Airbnb my home" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="SignUp" />
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

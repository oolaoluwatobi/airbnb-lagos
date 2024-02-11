"use client";

import Image from "next/image";
import React from "react";
import { MdPerson } from "react-icons/md";

interface AvatarProps {
  src: string | null | undefined;
}

export default function Avatar({ src }: AvatarProps) {
  return (
    <>
      {src ? (
        <Image
          src={src}
          alt="Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
      ) : (
        <div className="rounded-full bg-neutral-400 text-white p-1">
          <MdPerson size={24} className="" />
        </div>
      )}
    </>
  );
}

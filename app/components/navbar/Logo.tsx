"use client";

import Image from "next/image";
import React from "react";
import logo from "@/public/images/logo.webp";
import { useRouter } from "next/navigation";

export default function Logo() {
  const router = useRouter()
  return (
    <Image
      onClick={() => router.push('/')}
      src={logo}
      alt="logo"
      width={100}
      height={100}
      className="hidden md:block w32 cursor-pointer "
    />
  );
}

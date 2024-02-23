"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";
import qs from "query-string";
import Link from "next/link";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox = ({ label, icon: Icon, selected }: CategoryBoxProps) => {
  const params = useSearchParams();

  let currentQuery = {};

  if (params) {
    currentQuery = qs.parse(params.toString());
  }

  const updatedQuery: any = {
    ...currentQuery,
    category: label,
  };

  if (params?.get("category") === label) {
    delete updatedQuery.category;
  }

  const url = qs.stringifyUrl(
    {
      url: "/",
      query: updatedQuery,
    },
    { skipNull: true }
  );

  console.log(url, "URL____");

  // const handleClick = useCallback(() => {

  //   router.push(url);
  // }, [label, params, router]);

  return (
    <Link
      href={url}
      // onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2  hover:text-neutral-800 transition cursor-pointer ${
        selected
          ? "border-b-neutral-800 text-neutral-800"
          : "border-transparent text-neutral-500"
      } `}
    >
      <Icon size={26} />
      <p className="font-medium text-sm">{label}</p>
    </Link>
  );
};

export default CategoryBox;

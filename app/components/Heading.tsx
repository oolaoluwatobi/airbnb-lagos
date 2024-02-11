"use client";

import { FC } from "react";

interface HeadingProps {
  title: string;
  subtitle?: string;
  isCentered?: boolean;
}

const Heading: FC<HeadingProps> = ({ title, subtitle, isCentered }) => {
  return (
    <div className={`${isCentered ? 'text-center' : 'text-start'}`}>
      <h3 className="text-2xl font-bold">
        {title}
      </h3>
      {subtitle ? (
        <p className="font-light text-neutral-500 mt-2">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
};

export default Heading;

//ts-worksheet-with-variables
"use client";

import React, { FC } from "react";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { CldUploadWidget } from "next-cloudinary";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  console.log(value, 'IMAGE___DATA');
  
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="ibaloglp"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
          >
            <TbPhotoPlus size={50} />
            <p className="font-semibold text-lg">CLick to upload</p>
            {value && (
              <div className="absolute inset-0 w-full h-full ">
                <Image
                  className="object-cover w-full h-full  "  
                  src={value}
                  alt="upload"
                  height={0}
                  width={0}
                  sizes="100vw"
                  priority
                 />
              </div>
            )}
          </div>
        )
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;

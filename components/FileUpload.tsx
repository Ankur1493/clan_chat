"use client"

import { X } from "lucide-react"
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}
export const FileUpload = ({ onChange, endpoint, value }: FileUploadProps) => {

  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="w-full flex items-center justify-center">
        <div className="relative h-20 w-20">
          <Image
            fill
            src={value}
            alt="upload"
            className="rounded-full"
          />
          <button onClick={() => onChange("")} className="bg-rose-500 text-white p-1 rounded-full absolute bottom-0 right-0 shadow-sm" type="button">
            <X className="h-5 w-5 " />
          </button>
        </div>
      </div>
    )
  }

  return (
    <UploadDropzone
      className="w-full border-secondary border"
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error)
      }}
    />
  )
}


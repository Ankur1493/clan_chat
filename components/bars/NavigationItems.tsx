"use client"

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavigationItemsProps {
  id: string;
  name: string;
  imageUrl: string;
  key: string;
}

export const NavigationItems = ({ key, id, imageUrl }: NavigationItemsProps) => {

  const router = useRouter();
  const params = useParams();
  const HandleServerClick = () => {
    router.push(`/servers/${id}`)
  }

  return (
    <div key={key} className="py-2">
      <button className="flex items-center group relative" onClick={HandleServerClick}>
        <div className={cn("absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
          params?.serverId !== id && "group-hover:h-[20px]",
          params?.serverId === id ? "h-[32px]" : "h-[8px] bg-neutral-800"
        )} />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            params.serverId === id && "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image
            fill
            src={imageUrl}
            alt="server_image"
          />
        </div>
      </button>
    </div >
  )
}


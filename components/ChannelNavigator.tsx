"use client"

import { Lock, Plus, Settings } from "lucide-react";
import { Label } from "./ui/label";
import { ChannelType } from "@prisma/client";
import { ActionTooltip } from "./ActionTooltip";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ChannelNavigatorProps {
  data: {
    label: string;
    type: "channel" | "member";
    channelType?: ChannelType
    data: {
      name: string;
      icon: React.ReactNode;
      id: string;
    }[];
  }[];
}

export const ChannelNavigator = ({ data }: ChannelNavigatorProps) => {

  const router = useRouter();
  const params = useParams();

  const { channelId } = params;
  const [activeChannel, setActiveChannel] = useState("daf97095-f4b1-494d-bda0-49a201804c43")
  const createChannel = (type: ChannelType) => {
    console.log(type)
  }

  const handleRouting = ({ id, type }: { id: string, type: "channel" | "member" }) => {
    if (type === "member") {
      return router.push(`/users/conversations/${id}`)
    }
    if (type === "channel") {
      return router.push(`/servers/${params.serverId}/channels/${id}`)
    }
  }

  useEffect(() => {
    if (typeof channelId === "string")
      setActiveChannel(channelId)
  }, [])

  return (
    <div className="mt-3">
      {data.map(({ label, type, channelType, data }) => (
        <div key={label} className="w-full px-3" >
          <div className="py-1" >
            {channelType ? (
              <div className="flex justify-between items-center text-zinc-700">
                <Label className="text-lg" >{label}</Label>
                <button onClick={() => createChannel(channelType)}><Plus size={20} className="hover:text-emerald-500" /></button>
              </div>
            ) :
              (
                <div className="flex justify-between items-center text-zinc-700">
                  <Label className="text-lg" >{label}</Label>
                  <button ><Settings size={20} /></button>
                </div>
              )
            }
          </div>
          {data.map(({ id, name, icon }) => (
            <div onClick={() => handleRouting({ id, type })} className={cn(
              "flex justify-between items-center rounded-sm hover:shadow-sm hover:shadow-card my-1 px-3 py-2 cursor-pointer group w-full",
              activeChannel === id && "shadow-sm shadow-card bg-gray-900"
            )} key={id}>
              <div className="flex items-center gap-3 ">
                <div className="text-zinc-500 group-hover:text-emerald-500" >{icon}</div>
                <p className="text-zinc-500 group-hover:text-emerald-500">{name}</p>
              </div>
              <div>
                {name === "general" &&
                  (<ActionTooltip align="center" side="top" label="cannot be changed">
                    <Lock size={15} className="text-zinc-700 group-hover:text-emerald-500" />
                  </ActionTooltip>)
                }
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

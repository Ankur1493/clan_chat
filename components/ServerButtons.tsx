"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembers } from "@/types";

import { ChevronDown, LogOut, PlusCircle, Settings, Trash2, UserRoundPlus, Users } from "lucide-react";


interface ServerButtonsProps {
  server: ServerWithMembers
  userRole: "ADMIN" | "MODERATOR" | "GUEST"
}

export const ServerButtons = ({ server, userRole }: ServerButtonsProps) => {

  const { onOpen } = useModal();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-xl font-bold flex w-full justify-around items-center shadow-sm shadow-stone-900 bg-card py-4 focus:outline-none">
        <div>{server.name}</div> <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-none bg-neutral-800 w-[250px]">
        {
          userRole !== "GUEST" &&
          <DropdownMenuItem
            className="flex w-full justify-between items-center my-1 p-2 cursor-pointer group"
            onClick={() => onOpen("inviteModal", { server })}
          >
            <div className="group-hover:text-blue-500">Invite People</div>
            <UserRoundPlus size={20} className="group-hover:text-blue-500" />
          </DropdownMenuItem>
        }
        {
          userRole === "ADMIN" &&
          <DropdownMenuItem
            className="flex w-full justify-between items-center my-1 p-2 cursor-pointer group"
            onClick={() => onOpen("serverSettings", { server })}
          >
            <div className="group-hover:text-blue-500">Server Settings</div>
            <Settings size={20} className="group-hover:text-blue-500" />
          </DropdownMenuItem>
        }
        {
          userRole !== "GUEST" &&
          <DropdownMenuItem
            className="flex w-full justify-between items-center my-1 p-2 cursor-pointer group"
            onClick={() => onOpen("manageMembers", { server })}
          >
            <div className="group-hover:text-blue-500">Manage Members</div>
            <Users size={20} className="group-hover:text-blue-500" />
          </DropdownMenuItem>
        }
        {
          userRole !== "GUEST" &&
          <DropdownMenuItem
            className="flex w-full justify-between items-center p-2 my-1 cursor-pointer group "
            onClick={() => onOpen("createChannels", { server })}
          >
            <div className="group-hover:text-blue-500">Create Channel</div>
            <PlusCircle size={20} className="group-hover:text-blue-500" />
          </DropdownMenuItem>
        }
        {userRole !== "GUEST" &&
          <DropdownMenuSeparator className="bg-rose-500" />
        }
        {
          userRole === "ADMIN" &&
          <DropdownMenuItem
            className=" text-rose-500 flex w-full justify-between items-center p-2 my-1 cursor-pointer focus:bg-rose-500"
            onClick={() => onOpen("deleteServer", { server })}
          >
            <div>Delete Server</div>
            <Trash2 size={20} />
          </DropdownMenuItem>
        }
        {
          userRole !== "ADMIN" &&
          <DropdownMenuItem
            className=" text-rose-500 flex w-full justify-between items-center p-2 my-1 cursor-pointer focus:bg-rose-500"
            onClick={() => onOpen("leaveServer", { server })}
          >
            <div>Leave Server</div>
            <LogOut size={20} />
          </DropdownMenuItem>
        }

      </DropdownMenuContent>
    </DropdownMenu>
  )
}

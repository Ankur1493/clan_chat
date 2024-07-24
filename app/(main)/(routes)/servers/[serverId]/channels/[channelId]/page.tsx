import { auth } from "@/auth";
import { ChannelHeader } from "@/components/channels/ChannelHeader";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface ChannelsPageProps {
  params: {
    serverId: string;
    channelId: string;
  }
}

const ChannelsPage = async ({ params }: ChannelsPageProps) => {

  const session = await auth();
  const user = session?.user

  if (!user || !user.id) {
    return redirect("/login")
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
      serverId: params.serverId
    }
  })

  if (!channel) {
    return redirect(`/servers/${params.serverId}`)
  }

  return (
    <div>
      <ChannelHeader name={channel.name} type={channel.type} />
    </div>
  )
}

export default ChannelsPage

import Link from "next/link";

import AssetDetails from "@/components/AssetDetails/AssetDetails";
import AssetMessages from "@/components/AssetMessages/AssetMessages";
import AssetOverview from "@/components/AssetOverview/AssetOverview";
import Header from "@/components/Header/Header";
import TabContent from "@/components/Tabs/TabContent";
import TabHeader from "@/components/Tabs/TabHeader";

import { getAsset } from "@/lib/getAsset";
import { getComments } from "@/lib/getComments";
import { ChevronLeftIcon } from "lucide-react";

export default async function Asset({
  searchParams,
  params,
}: {
  searchParams: { tab?: "overview" | "messages" };
  params: { id: number };
}) {
  const { id: assetId } = await params;
  const { tab = "overview" } = await searchParams;
  const asset = await getAsset(assetId);
  const comments = await getComments(assetId);

  const tabs = [
    {
      label: "Overview",
      id: "overview",
      content: <AssetOverview asset={asset} />,
    },
    {
      label: "Messages",
      id: "messages",
      content: <AssetMessages comments={comments} />,
    },
  ];

  return (
    <main className="bg-[#111013] min-h-screen">
      <Header
        showBreadcrumbs={false}
        showBadges={false}
        className="bg-black h-[65px]"
      >
        <Link href="/" className="cursor-pointer p-5" aria-label="Go back">
          <ChevronLeftIcon className="text-gray-400" size={25} />
        </Link>
        <h1 className="text-2xl font-black text-white text-center mx-auto">
          #KyraChallenge
        </h1>
      </Header>

      <section className="max-w-8xl min-h-[calc(100dvh-65px)] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-3">
        <AssetDetails asset={asset} />

        <aside className="flex flex-col grow border-l border-neutral-800 h-fill">
          <TabHeader>
            {tabs.map((t) => {
              return (
                <TabHeader.Item
                  key={t.id}
                  isActive={t.id === tab}
                  href={`?tab=${t.id}`}
                  scroll={false}
                >
                  {t.label}
                </TabHeader.Item>
              );
            })}
          </TabHeader>

          <TabContent className="flex flex-col grow">
            {tabs.map((t) => {
              return (
                <TabContent.Item key={t.id} isActive={t.id === tab}>
                  {t.content}
                </TabContent.Item>
              );
            })}
          </TabContent>
        </aside>
      </section>
    </main>
  );
}

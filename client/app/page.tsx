import Header from "@/components/Header/Header";
import StatusFilter, { type StatusUrlParams } from "@/components/StatusFilter/StatusFilter";
import AssetsList from "@/components/AssetsList/AssetsList";
import { Suspense } from "react";
import { getAssets } from "@/lib/getAssets";

const breadcrumbs = [
  { label: "Brands", href: "#" },
  { label: "Brand X", href: "#" },
  { label: "KyraPlatformChallenge", href: "#" },
  { label: "#KyraChallenge", href: null },
];

const badges = [
  { variant: "red" as const, label: "IG & TT" },
  { variant: "blue" as const, label: "BCA" },
];

type SearchParams = Promise<{ status?: StatusUrlParams }>;

export default async function Assets({
  searchParams
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const assets = await getAssets();

  return (
    <>
      <div className="min-h-screen justify-center px-3 py-3 md:px-6 md:py-6 max-w-6xl mx-auto flex-col">
        <Header
          showBreadcrumbs={true}
          breadcrumbs={breadcrumbs}
          showBadges={true}
          badges={badges}
        >
          #KyraChallenge
        </Header>

        <main className="grow w-full py-12">
          <StatusFilter assets={assets} />
          <Suspense fallback={<div className="flex w-full justify-center mt-15">Loading...</div>}>
            <AssetsList assets={assets} status={params.status ?? 'all'} className="mt-10"/>
          </Suspense>
        </main>
      </div>
    </>
  );
}

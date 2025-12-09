import Header from "@/components/Header/Header";
import StatusFilter, { type StatusUrlParams } from "@/components/StatusFilter/StatusFilter";
import AssetsList from "@/components/AssetsList/AssetsList";
import { Suspense } from "react";
import { getAssets } from "@/lib/getAssets";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import AssetsListSkeleton from "@/components/AssetsList/AssetsListSkeleton";

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
      <div className="min-h-screen px-3 py-3 md:px-6 md:py-6 max-w-6xl mx-auto">
        <Header
          showBreadcrumbs={true}
          breadcrumbs={breadcrumbs}
          showBadges={true}
          badges={badges}
        >
          <Link href="#" className="cursor-pointer" aria-label="Go back">
            <ChevronLeftIcon className="text-gray-400" size={25} /> 
          </Link>
          <h1 className="text-2xl font-black text-white">#KyraChallenge</h1>
        </Header>

        <main className="grow w-full py-12">
          <StatusFilter assets={assets} />
          <Suspense key={params.status ?? 'all'} fallback={<AssetsListSkeleton />}>
            <AssetsList assets={assets} status={params.status ?? 'all'} className="mt-10"/>
          </Suspense>
        </main>
      </div>
    </>
  );
}

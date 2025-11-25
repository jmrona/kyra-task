export default defineEventHandler(async (event) => {
  const assetId = getRouterParam(event, "assetId");
  if (!assetId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Asset ID is required",
    });
  }

  const store = useStorage("memory");
  const assets = await store.getItem<any[]>("assets");

  const asset = assets?.find((asset) => asset.id === Number(assetId));
  if (!asset) {
    throw createError({ statusCode: 404, statusMessage: "Asset not found" });
  }

  return (
    asset ?? {} 
  );
});

export const getCollections = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const collections = await fetch(`${baseUrl}/api/collections`);
  return await collections.json();
};

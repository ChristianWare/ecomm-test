const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getCollections = async () => {
  const collections = await fetch(`${baseUrl}/api/collections`);
  return await collections.json();
};

export const getProducts = async () => {
  const products = await fetch(`${baseUrl}/api/products`);
  return await products.json();
};

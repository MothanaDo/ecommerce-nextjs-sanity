import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
export async function getMyOrders(userId: string) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const MY_ORDERS_QUERY = defineQuery(`
    *[
        _type == "order" && clerkUserId  == $userId  ] | order(orderDate desc){
          ...,
          products[]{
            ...,
            product->
          }
        }
        
    `);

  try {
    // use sanity fetch to get all my orders
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId },
    });

    // return all orders
    return orders.data || [];
  } catch (error) {
    console.error("Error fetching orders", error);
    throw new Error("Error fetching orders");
  }
}

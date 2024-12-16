import { addItem } from "@/actions/addItem";
import { FeaturedProducts } from "@/components/global/storefront/FeaturedProducts";
import { ImageSlider } from "@/components/global/storefront/ImageSlider";
import { ShoppingBagButton } from "@/components/global/submit-button/SubmitButton";
import { client } from "@/lib/prisma";
import { StarIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

export async function getData(productId: string) {
  const data = await client.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      price: true,
      name: true,
      description: true,
      id: true,
      images: true,
    },
  });

  if (!data) {
    return notFound();
  }
  return data;
}

const ProductIdRoute = async ({params}: {params: Promise<{ id: string }>}) => {
  noStore()
  const { id: productId } = await params;
  const data = await getData(productId);

  const addProductToShoppingCart = addItem.bind(null, data.id);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6">
        <ImageSlider images={data.images} />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {data.name}
          </h1>
          <p className="text-3xl mt-2 text-gray-900">${data.price}</p>
          <div className="mt-3 flex items-center gap-1">
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          </div>
          <p className="text-base text-gray-700 mt-6">{data.description}</p>
          <form action={addProductToShoppingCart}>
            <ShoppingBagButton />
          </form>
        </div>
      </div>
      <div className="mt-16">
        <FeaturedProducts />
      </div>
    </>
  );
};

export default ProductIdRoute;

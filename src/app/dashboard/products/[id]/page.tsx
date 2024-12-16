import { EditForm } from "@/components/global/dashboard/EditForm";
import { client } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

async function getData(productId: string) {
  const data = await client.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!data) {
    notFound();
  }
  return data;
}

const EditRoute = async ({params,}: {params: Promise<{ id: string }>}) => {
  const { id: productId } = await params;
  const data = await getData(productId);
  return <EditForm data={data} />;
};

export default EditRoute;

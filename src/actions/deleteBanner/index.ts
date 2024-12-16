"use server"
import { client } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function deleteBanner(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "dalizeta368@gmail.com") {
    return redirect("/");
  }

  await client.banner.delete({
    where: {
      id: formData.get("bannerId") as string,
    },
  });
  redirect("/dashboard/banner");
}

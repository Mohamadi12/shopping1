"use server"

import { client } from "@/lib/prisma";
import { bannerSchema } from "@/lib/zodSchema";
import { parseWithZod } from "@conform-to/zod";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";


export async function createBanner(prevState: any,formData: FormData){
      const { getUser } = getKindeServerSession();
      const user = await getUser();
    
      if (!user || user.email !== "dalizeta368@gmail.com") {
        return redirect("/");
      }
    
      const submission = parseWithZod(formData, {
        schema: bannerSchema,
      });
    
      if (submission.status !== "success") {
        return submission.reply();
      }

      await client.banner.create({
        data:{
            title: submission.value.title,
            imageString: submission.value.imageString
        }
      })
      redirect("/dashboard/banner")
}





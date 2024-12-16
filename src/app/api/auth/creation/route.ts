import { client } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET(){
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if(!user || user === null || !user.id){
        throw new Error('Something went wrong...')
    }

    let dbUser = await client.user.findUnique({
        where: {
            id: user.id
        }
    })
    if(!dbUser) {
        dbUser = await client.user.create({
            data: {
                id: user.id,
                firstName: user.given_name ?? "",
                lastName: user.family_name ?? "",
                email: user.email ?? "",
                profileImage: user.picture ?? `https://avatar.versel.sh/rauchg${user.given_name}`
            }
        })
    }
    return NextResponse.redirect('http://localhost:3000/')
}
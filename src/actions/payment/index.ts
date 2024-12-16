"use server";

import { Cart } from "@/lib/interface";
import { redis } from "@/lib/redis";
import { stripe } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Stripe from "stripe";

export async function checkOut() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const cart: Cart | null = await redis.get(`cart-${user.id}`);

  if (cart && cart.items) {
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      cart.items.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount: item.price * 100,
          product_data: {
            name: item.name,
            images: [item.imageString],
          },
        },
        quantity: item.quantity,
      }));
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url:
        process.env.NODE_ENV === "development"
          ? `${process.env.BASE_URL}/payment/success`
          : "https://shopping1-iwhcx2wzx-nanas-projects-16c134b4.vercel.app/payment/success",
      cancel_url:
        process.env.NODE_ENV === "development"
          ? `${process.env.BASE_URL}/payment/cancel`
          : "https://shopping1-iwhcx2wzx-nanas-projects-16c134b4.vercel.app/payment/cancel",
      metadata: {
        userId: user.id,
      },
    });
    return redirect(session.url as string);
  }
}

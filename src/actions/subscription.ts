"use server"

import { auth } from "@/lib/auth"
import { stripe } from "@/lib/stripe"
import { absoluteUrl } from "@/lib/utils"
import { redirect } from "next/navigation"

const settingsUrl = absoluteUrl("/dashboard/billing")

export async function createCheckoutSession() {
  const session = await auth()
  
  if (!session?.user?.id || !session.user.email) {
    throw new Error("Unauthorized")
  }

  // In a real app, check if user already has a subscription in Prisma
  
  const stripeSession = await stripe.checkout.sessions.create({
    success_url: settingsUrl,
    cancel_url: settingsUrl,
    payment_method_types: ["card"],
    mode: "subscription",
    billing_address_collection: "auto",
    customer_email: session.user.email,
    line_items: [
      {
        price_data: {
          currency: "USD",
          product_data: {
            name: "StudyGenius Pro",
            description: "Unlimited AI Summaries & Flashcards",
          },
          unit_amount: 2000,
          recurring: {
            interval: "month",
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      userId: session.user.id,
    },
  })

  return { url: stripeSession.url }
}

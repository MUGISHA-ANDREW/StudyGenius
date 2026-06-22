"use client"

import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { createCheckoutSession } from "@/actions/subscription"
import { Loader2 } from "lucide-react"

interface BillingButtonProps {
  isPro: boolean
}

export function BillingButton({ isPro }: BillingButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)
      const { url } = await createCheckoutSession()
      if (url) window.location.href = url
    } catch (error) {
      console.error(error)
      alert("Failed to initiate billing. Check console for details.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      className="w-full" 
      onClick={onClick}
      variant={isPro ? "outline" : "default"}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isPro ? (
        "Manage Subscription"
      ) : (
        "Upgrade to Pro"
      )}
    </Button>
  )
}

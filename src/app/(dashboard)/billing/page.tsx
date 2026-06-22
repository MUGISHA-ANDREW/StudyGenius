import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, CreditCard } from "lucide-react"
import { BillingButton } from "./billing-button"

export default async function BillingPage() {
  const session = await auth()
  if (!session?.user) redirect("/auth/login")

  // Simulate subscription status
  const isPro = false 

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing & Subscription</h1>
        <p className="text-muted-foreground">Manage your subscription and usage plan.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className={isPro ? "border-primary" : ""}>
          <CardHeader>
            <CardTitle>StudyGenius Pro</CardTitle>
            <CardDescription>Experience the full power of AI-assisted learning.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">$20</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" /> Unlimited AI Summaries
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" /> Multi-document AI Chat
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" /> Priority Note Generation
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" /> Advanced Spaced Repetition Stats
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <BillingButton isPro={isPro} />
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage Limits</CardTitle>
            <CardDescription>Your current resource consumption.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span>Documents</span>
                    <span>3 / 5</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[60%]" />
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span>AI Queries</span>
                    <span>12 / 20</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[60%]" />
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

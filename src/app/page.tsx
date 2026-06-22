import Link from "next/link"
import { Navbar } from "@/components/marketing/navbar"
import { Button } from "@/components/ui/button"
import { 
  ArrowRight, 
  BrainCircuit, 
  FileText, 
  Sparkles, 
  Zap, 
  CheckCircle2,
  Clock,
  ShieldCheck,
  Smartphone
} from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/10 to-transparent -z-10 blur-3xl opacity-50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 animate-fade-in">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Learning is Here</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-8">
            Master Any Subject with <br />
            <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">StudyGenius AI</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-10 leading-relaxed">
            The all-in-one AI study companion. Upload your notes, generate flashcards, 
            explain complex concepts, and ace your exams in half the time.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/register">
              <Button size="lg" className="h-12 px-8 text-lg rounded-full group">
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg" className="h-12 px-8 text-lg rounded-full">
                View Pricing
              </Button>
            </Link>
          </div>
          
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 h-24 bottom-0" />
            <div className="rounded-2xl border bg-card shadow-2xl overflow-hidden p-2 lg:p-4 rotate-x-12 perspective-1000 transform transition-all duration-700 hover:rotate-0">
               <div className="aspect-video bg-muted rounded-xl relative flex items-center justify-center overflow-hidden border">
                  <div className="text-muted-foreground flex flex-col items-center gap-2">
                    <BrainCircuit className="h-12 w-12 opacity-20" />
                    <span className="text-sm font-medium opacity-40">Dashboard Preview</span>
                  </div>
                  {/* Decorative dots/lines representing UI elements */}
                  <div className="absolute top-4 left-4 flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Supercharge Your Learning</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to study smarter, not harder. Our AI tools are specifically 
              optimized for academic excellence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Document Analysis",
                description: "Upload PDFs or text files and ask our AI anything. Get instant summaries and key takeaways."
              },
              {
                icon: Zap,
                title: "Flashcard Generation",
                description: "Turn your notes into high-quality flashcards with one click. Spaced repetition ready."
              },
              {
                icon: BrainCircuit,
                title: "AI Explainer",
                description: "Complex concepts broken down into simple terms. Like having a PhD tutor 24/7."
              },
              {
                icon: Clock,
                title: "Study Timelines",
                description: "Automatically generate a study schedule based on your exam dates and course material."
              },
              {
                icon: ShieldCheck,
                title: "Academic Grade",
                description: "AI that cites sources and ensures accuracy, so you can trust the information you study."
              },
              {
                icon: Smartphone,
                title: "Sync Anywhere",
                description: "Study on your laptop, tablet, or phone. Your data is always synced across all devices."
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-background border hover:shadow-lg transition-all group">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 border-y bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">
            Trusted by students from top universities
          </p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
            {/* Logos placeholder */}
            {["University of Oxford", "Stanford", "MIT", "Harvard", "Cambridge"].map(uni => (
              <span key={uni} className="text-lg font-bold">{uni}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary -z-10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-primary-foreground">
          <h2 className="text-4xl font-bold mb-6">Ready to transform your grades?</h2>
          <p className="text-xl opacity-90 mb-10 max-w-xl mx-auto">
            Join thousands of successful students who are already using StudyGenius AI to excel in their studies.
          </p>
          <Link href="/auth/register">
            <Button size="lg" variant="secondary" className="h-14 px-10 text-lg rounded-full shadow-xl">
              Start Free Trial
            </Button>
          </Link>
          <p className="mt-6 text-sm opacity-70 flex items-center justify-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            No credit card required for basic plan
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-4">
              <Link href="/" className="flex items-center gap-2">
                <BrainCircuit className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold tracking-tight">StudyGenius AI</span>
              </Link>
              <p className="text-muted-foreground text-sm max-w-xs text-center md:text-left">
                The most advanced AI study platform for modern students.
              </p>
            </div>
            
            <div className="flex gap-12">
              <div className="flex flex-col gap-3">
                <span className="font-semibold text-sm">Product</span>
                <Link href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</Link>
                <Link href="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
                <Link href="/demo" className="text-sm text-muted-foreground hover:text-primary transition-colors">Demo</Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-semibold text-sm">Company</span>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-semibold text-sm">Legal</span>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms</Link>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} StudyGenius AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

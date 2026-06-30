"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Trash, Loader2, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface PrismaDocument {
  id: string
  name: string
  createdAt: Date | string
  url: string
  userId: string
}

interface DocumentsClientProps {
  initialData: PrismaDocument[]
}

export function DocumentsClient({ initialData }: DocumentsClientProps) {
  const [documents, setDocuments] = useState(initialData)
  const [isUploading, setIsUploading] = useState(false)

  const [searchQuery, setSearchQuery] = useState("")

  const filteredDocs = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    console.log("Uploading file:", file.name)
    setIsUploading(true)
    
    setTimeout(() => {
      setIsUploading(false)
      alert("File upload logic would go here.")
    }, 2000)
  }

  const onDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this document?")) {
      setDocuments(prev => prev.filter(doc => doc.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search documents..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="cursor-pointer w-full sm:w-auto">
            <div className={cn(
              "flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors",
              isUploading && "opacity-50 pointer-events-none"
            )}>
              {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              <span>Upload Document</span>
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept=".pdf,.txt"
              onChange={onUpload}
              disabled={isUploading}
            />
          </label>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredDocs.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed rounded-xl bg-muted/30">
            <FileText className="h-10 w-10 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No documents found.</p>
          </div>
        ) : (
          filteredDocs.map((doc) => (
            <Card key={doc.id} className="hover:border-primary/50 transition-colors group">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium truncate max-w-[200px] sm:max-w-[400px]">{doc.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      Uploaded on {format(new Date(doc.createdAt), "PPP")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => onDelete(doc.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}


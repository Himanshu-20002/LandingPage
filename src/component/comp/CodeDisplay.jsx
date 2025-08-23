"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check } from "lucide-react"

// Remove interface and type annotations
// interface CodeDisplayProps {
//   componentName: string
// }

const componentCode = {
  button: { /* ...same as before... */ },
  input: { /* ...same as before... */ },
  card: { /* ...same as before... */ },
}

export function CodeDisplay({ componentName }) {
  const [copiedTab, setCopiedTab] = useState(null)
  const code = componentCode[componentName]

  const copyToClipboard = async (text, tab) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedTab(tab)
      setTimeout(() => setCopiedTab(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  if (!code) {
    return (
      <div className="h-full bg-popover text-popover-foreground p-6 flex items-center justify-center">
        <p>Code example not available for {componentName}</p>
      </div>
    )
  }

  return (
    <div className="h-full bg-popover text-popover-foreground">
      <Tabs defaultValue="tsx" className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border/20">
          <TabsList className="bg-background/10">
            <TabsTrigger value="tsx" className="text-popover-foreground data-[state=active]:bg-background/20">
              Component
            </TabsTrigger>
            <TabsTrigger value="usage" className="text-popover-foreground data-[state=active]:bg-background/20">
              Usage
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="tsx" className="flex-1 p-0 m-0">
          <div className="relative h-full">
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-4 right-4 z-10 text-popover-foreground hover:bg-background/20"
              onClick={() => copyToClipboard(code.tsx, "tsx")}
            >
              {copiedTab === "tsx" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
            <pre className="h-full overflow-auto p-6 text-sm font-mono">
              <code>{code.tsx}</code>
            </pre>
          </div>
        </TabsContent>

        <TabsContent value="usage" className="flex-1 p-0 m-0">
          <div className="relative h-full">
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-4 right-4 z-10 text-popover-foreground hover:bg-background/20"
              onClick={() => copyToClipboard(code.usage, "usage")}
            >
              {copiedTab === "usage" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
            <pre className="h-full overflow-auto p-6 text-sm font-mono">
              <code>{code.usage}</code>
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
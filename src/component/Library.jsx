"use client"

import { useState } from "react"
import { ComponentSidebar } from "@/component/comp/ComponentSidebar"
import { ComponentPreview } from "@/component/comp/ComponentPreview"
import { CodeDisplay } from "@/component/comp/CodeDisplay"
import { Button } from  '@/components/ui/button'
import { Menu, X } from "lucide-react"

const Library = () => {
    const [selectedComponent, setSelectedComponent] = useState("button")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className="min-h-screen bg-background ">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="bg-background">
          {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <ComponentSidebar
          selectedComponent={selectedComponent}
          onSelectComponent={setSelectedComponent}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main content */}
        <div className="flex-1 lg:ml-80">
          <div className="flex flex-col h-screen">
            {/* Preview area */}
            <div className="flex-1 p-6">
              <ComponentPreview componentName={selectedComponent} />
            </div>

            {/* Code display */}
            <div className="h-80 border-t border-border">
              <CodeDisplay componentName={selectedComponent} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Library

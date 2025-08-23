"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

const componentCategories = [
  {
    name: "Form Elements",
    components: [
      { name: "button", label: "Button", count: 3 },
      { name: "input", label: "Input", count: 2 },
      { name: "textarea", label: "Textarea", count: 1 },
      { name: "select", label: "Select", count: 2 },
    ],
  },
  {
    name: "Layout",
    components: [
      { name: "card", label: "Card", count: 4 },
      { name: "dialog", label: "Dialog", count: 2 },
      { name: "tabs", label: "Tabs", count: 1 },
    ],
  },
  {
    name: "Feedback",
    components: [
      { name: "alert", label: "Alert", count: 3 },
      { name: "badge", label: "Badge", count: 2 },
      { name: "toast", label: "Toast", count: 1 },
    ],
  },
]

export function ComponentSidebar({ selectedComponent, onSelectComponent, isOpen, onClose }) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div className=" inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={cn(
          "absolute left-0 z-40 h-full w-80 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-sidebar-border">
            <h1 className="text-xl font-bold text-sidebar-foreground font-[family-name:var(--font-space-grotesk)]">
              Component Library
            </h1>
            <p className="text-sm text-sidebar-primary-foreground mt-1">Copy & paste components</p>
          </div>

          {/* Component list */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-6">
              {componentCategories.map((category) => (
                <div key={category.name}>
                  <h3 className="text-sm font-semibold text-sidebar-foreground mb-3 font-[family-name:var(--font-space-grotesk)]">
                    {category.name}
                  </h3>
                  <div className="space-y-1">
                    {category.components.map((component) => (
                      <Button
                        key={component.name}
                        variant={selectedComponent === component.name ? "default" : "ghost"}
                        className={cn(
                          "w-full justify-between h-auto p-3 text-left transition-all duration-200",
                          selectedComponent === component.name
                            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-primary/25 ring-2 ring-primary/50 scale-[1.02]"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-md hover:shadow-accent/10",
                        )}
                        onClick={() => {
                          onSelectComponent(component.name)
                          onClose()
                        }}
                      >
                        <span>{component.label}</span>
                        <Badge variant="secondary" className="text-xs">
                          {component.count}
                        </Badge>
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        </div>
    </>
  )
}
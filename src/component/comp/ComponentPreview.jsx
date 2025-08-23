"use client"

import React from "react"

// If you don't have these components, replace them with <button>, <input>, etc.
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AlertCircle, CheckCircle, Info } from "lucide-react"

const componentPreviews = {
  button: (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Button>Default Button</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
      </div>
    </div>
  ),
  input: (
    <div className="space-y-4 max-w-sm">
      <Input placeholder="Default input" />
      <Input placeholder="Disabled input" disabled />
    </div>
  ),
  textarea: (
    <div className="max-w-sm">
      <Textarea placeholder="Enter your message here..." />
    </div>
  ),
  select: (
    <div className="space-y-4 max-w-sm">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
  card: (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Simple Card</CardTitle>
          <CardDescription>A basic card component</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the card content area.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Another Card</CardTitle>
        </CardHeader>
        <CardContent>
          <Button>Action Button</Button>
        </CardContent>
      </Card>
    </div>
  ),
  alert: (
    <div className="space-y-4 max-w-2xl">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>This is an informational alert message.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>This is a destructive alert message.</AlertDescription>
      </Alert>
    </div>
  ),
  badge: (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  ),
  tabs: (
    <div className="max-w-md">
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="mt-4">
          <p>Content for tab 1</p>
        </TabsContent>
        <TabsContent value="tab2" className="mt-4">
          <p>Content for tab 2</p>
        </TabsContent>
        <TabsContent value="tab3" className="mt-4">
          <p>Content for tab 3</p>
        </TabsContent>
      </Tabs>
    </div>
  ),
  dialog: (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>This is a dialog description explaining what this dialog does.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>Dialog content goes here.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  ),
  toast: (
    <div className="max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <p className="text-sm font-medium">Success!</p>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Your action was completed successfully.</p>
      </div>
    </div>
  ),
}

export function ComponentPreview({ componentName }) {
  const preview = componentPreviews[componentName]

  return (
    <div className="h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground capitalize font-[family-name:var(--font-space-grotesk)]">
          {componentName}
        </h2>
        <p className="text-muted-foreground mt-1">Interactive preview of the {componentName} component</p>
      </div>

      <div className="bg-card rounded-lg border border-border p-8 min-h-[400px] flex items-center justify-center">
        {preview || (
          <div className="text-center text-muted-foreground">
            <p>Component preview not available</p>
          </div>
        )}
      </div>
    </div>
  )
}
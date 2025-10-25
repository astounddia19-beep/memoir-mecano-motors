"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, MessageSquare } from "lucide-react"
import { mockConversations, mockMessages } from "@/lib/mock-data"

export default function MessagesPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const mechanicId = searchParams.get("mechanicId")

  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [messageText, setMessageText] = useState("")

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    if (mechanicId && mockConversations.length > 0) {
      const conv = mockConversations.find((c) => c.mechanicId === mechanicId)
      if (conv) {
        setSelectedConversation(conv.id)
      }
    } else if (mockConversations.length > 0 && !selectedConversation) {
      setSelectedConversation(mockConversations[0].id)
    }
  }, [mechanicId, selectedConversation])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    )
  }

  if (!user) return null

  const userConversations = mockConversations.filter((conv) =>
    // if conversation has participants array
    Array.isArray((conv as any).participants)
      ? (conv as any).participants.includes(user.id)
      // fallback if conversation has different shape
      : (conv as any).userId === user.id || (conv as any).ownerId === user.id
  )
  const currentConversation = userConversations.find((c) => c.id === selectedConversation)
  const conversationMessages = mockMessages.filter((m) => m.conversationId === selectedConversation)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageText.trim() || !currentConversation) return

    // In production, this would send to API
    console.log("[v0] Sending message:", messageText)
    setMessageText("")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Messages</h1>
          <p className="text-muted-foreground">Communiquez avec les mécaniciens</p>
        </div>

        {userConversations.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Aucune conversation</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Vous n'avez pas encore de conversations. Contactez un mécanicien depuis son profil pour démarrer une
                discussion.
              </p>
              <Link href="/mechanics">
                <Button>Trouver un mécanicien</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
            {/* Conversations List */}
            <Card className="lg:col-span-1">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-2">
                  {userConversations.map((conversation) => (
                    <button
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedConversation === conversation.id
                          ? "bg-primary/10 border-primary"
                          : "hover:bg-muted border-transparent"
                      } border`}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {conversation.mechanicName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold text-foreground truncate">{conversation.mechanicName}</p>
                            {conversation.unreadCount > 0 && (
                              <Badge className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                                {conversation.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(conversation.lastMessageTime).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "short",
                            })}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </Card>

            {/* Messages Area */}
            <Card className="lg:col-span-2 flex flex-col">
              {currentConversation ? (
                <>
                  {/* Header */}
                  <div className="p-4 border-b">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {currentConversation.mechanicName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground">{currentConversation.mechanicName}</p>
                        <p className="text-sm text-muted-foreground">En ligne</p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {conversationMessages.map((message) => {
                        const isOwn = message.senderId === user.id || message.senderRole === user.role
                        return (
                          <div key={message.id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[70%] ${isOwn ? "order-2" : "order-1"}`}>
                              <div
                                className={`rounded-lg p-3 ${
                                  isOwn ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                                }`}
                              >
                                <p className="text-sm">{message.content}</p>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1 px-1">
                                {new Date(message.timestamp).toLocaleTimeString("fr-FR", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </ScrollArea>

                  {/* Input */}
                  <form onSubmit={handleSendMessage} className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Écrivez votre message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit" disabled={!messageText.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-muted-foreground">Sélectionnez une conversation</p>
                </div>
              )}
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}

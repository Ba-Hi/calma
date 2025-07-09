"use client"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Heart, Send } from "lucide-react"

interface AutoApaisementProps {
  onBack: () => void
}

export function AutoApaisement({ onBack }: AutoApaisementProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/auto-apaisement-chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Bonjour... Je suis là pour t'accompagner dans ce moment difficile. Comment te sens-tu en ce moment ? Tu peux me parler de tout ce qui te passe par la tête, ou simplement me dire que tu as besoin de réconfort.",
      },
    ],
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 p-6">
      <div className="max-w-md mx-auto flex flex-col h-screen">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={onBack} className="mr-4 text-slate-600 hover:text-slate-800">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-3">
            <Heart className="w-6 h-6 text-rose-500" />
            <h2 className="text-2xl font-light text-slate-800">Auto-apaisement</h2>
          </div>
        </div>

        {/* Zone de conversation */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <Card
                className={`max-w-[80%] border-0 shadow-sm ${
                  message.role === "user" ? "bg-gradient-to-r from-rose-200 to-pink-200" : "bg-white/80"
                }`}
              >
                <CardContent className="p-4">
                  <p className="text-slate-700 leading-relaxed text-sm">{message.content}</p>
                </CardContent>
              </Card>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <Card className="bg-white/80 border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 text-slate-500">
                    <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></div>
                    <div
                      className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                    <span className="text-sm ml-2">Je réfléchis...</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Zone de saisie */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <form onSubmit={handleSubmit} className="flex space-x-3">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Écris-moi ce que tu ressens..."
                className="flex-1 border-rose-200 focus:border-rose-400 rounded-xl"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                size="icon"
                className="bg-gradient-to-r from-rose-300 to-pink-300 hover:from-rose-400 hover:to-pink-400 text-slate-800 border-0 rounded-xl shadow-md"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Suggestions rapides */}
        {messages.length === 1 && (
          <div className="mt-4 space-y-2">
            <p className="text-xs text-slate-500 text-center mb-3">Suggestions :</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["J'ai peur", "Je me sens perdu(e)", "J'ai besoin de réconfort", "Aide-moi à respirer"].map(
                (suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleInputChange({ target: { value: suggestion } } as any)
                    }}
                    className="text-xs border-rose-200 text-rose-700 hover:bg-rose-50 bg-transparent rounded-full"
                  >
                    {suggestion}
                  </Button>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

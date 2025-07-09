"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, MessageCircle, Copy } from "lucide-react"
import { LoadingSpinner } from "./loading-spinner"

interface PasLesMotsProps {
  onBack: () => void
}

export function PasLesMots({ onBack }: PasLesMotsProps) {
  const [userInput, setUserInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [interpretation, setInterpretation] = useState("")
  const [copied, setCopied] = useState(false)

  const interpretFeelings = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/pas-les-mots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: userInput }),
      })

      const data = await response.json()
      setInterpretation(data.interpretation)
    } catch (error) {
      console.error("Erreur:", error)
      setInterpretation(
        "Je ressens quelque chose de lourd en moi, comme si mes émotions étaient emmêlées. J'ai besoin de temps et de douceur pour démêler tout ça. Je ne suis pas seul(e) dans cette épreuve.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(interpretation)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Erreur lors de la copie:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-50 p-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="icon" onClick={onBack} className="mr-4 text-slate-600 hover:text-slate-800">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-2xl font-light text-slate-800">Je n'ai pas les mots</h2>
        </div>

        <div className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 bg-gradient-to-r from-purple-100 to-violet-100 rounded-lg">
              <div className="text-center space-y-4">
                <MessageCircle className="w-12 h-12 text-purple-500 mx-auto" />
                <p className="text-slate-700 leading-relaxed">
                  Écris un mot, une sensation, ou laisse vide. Je vais t'aider à mettre des mots sur ce que tu ressens.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Input
              placeholder="Un mot, une sensation... ou rien du tout"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="py-4 text-lg border-purple-200 focus:border-purple-400 rounded-xl"
            />

            <Button
              onClick={interpretFeelings}
              disabled={isLoading}
              className="w-full py-4 text-lg bg-gradient-to-r from-purple-300 to-violet-300 hover:from-purple-400 hover:to-violet-400 text-slate-800 border-0 rounded-2xl shadow-lg transition-all duration-300"
            >
              {isLoading ? <LoadingSpinner /> : "M'aider à exprimer"}
            </Button>
          </div>

          {interpretation && (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 bg-white/80 rounded-lg">
                <div className="space-y-4">
                  <p className="text-slate-700 leading-relaxed italic">"{interpretation}"</p>
                  <Button
                    onClick={copyToClipboard}
                    className="w-full flex items-center justify-center space-x-2 bg-purple-200 hover:bg-purple-300 text-slate-800 border-0 rounded-xl"
                  >
                    <Copy className="w-4 h-4" />
                    <span>{copied ? "Copié !" : "Copier ce message"}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

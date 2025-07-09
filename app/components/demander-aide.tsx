"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, HelpCircle, Copy, Send } from "lucide-react"
import { LoadingSpinner } from "./loading-spinner"

interface DemanderAideProps {
  onBack: () => void
}

export function DemanderAide({ onBack }: DemanderAideProps) {
  const [context, setContext] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [generatedMessage, setGeneratedMessage] = useState("")
  const [copied, setCopied] = useState(false)

  const generateHelpMessage = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/demander-aide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context }),
      })

      const data = await response.json()
      setGeneratedMessage(data.message)
    } catch (error) {
      console.error("Erreur:", error)
      setGeneratedMessage(
        "Salut, je traverse un moment difficile en ce moment et j'aurais besoin de ton soutien. Peux-tu m'appeler ou passer me voir quand tu peux ? Merci d'être là pour moi.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedMessage)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Erreur lors de la copie:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="icon" onClick={onBack} className="mr-4 text-slate-600 hover:text-slate-800">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-2xl font-light text-slate-800">Demander de l'aide</h2>
        </div>

        <div className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg">
              <div className="text-center space-y-4">
                <HelpCircle className="w-12 h-12 text-blue-500 mx-auto" />
                <p className="text-slate-700 leading-relaxed">
                  Décris brièvement ta situation (optionnel). Je vais créer un message bienveillant à envoyer à un
                  proche.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Textarea
              placeholder="Comment te sens-tu ? Que se passe-t-il ? (optionnel)"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="min-h-[100px] border-blue-200 focus:border-blue-400 rounded-xl"
            />

            <Button
              onClick={generateHelpMessage}
              disabled={isLoading}
              className="w-full py-4 text-lg bg-gradient-to-r from-blue-300 to-indigo-300 hover:from-blue-400 hover:to-indigo-400 text-slate-800 border-0 rounded-2xl shadow-lg transition-all duration-300"
            >
              {isLoading ? <LoadingSpinner /> : "Générer le message"}
            </Button>
          </div>

          {generatedMessage && (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 bg-white/80 rounded-lg">
                <div className="space-y-4">
                  <p className="text-slate-700 leading-relaxed">{generatedMessage}</p>
                  <div className="flex space-x-3">
                    <Button
                      onClick={copyToClipboard}
                      className="flex-1 flex items-center justify-center space-x-2 bg-blue-200 hover:bg-blue-300 text-slate-800 border-0 rounded-xl"
                    >
                      <Copy className="w-4 h-4" />
                      <span>{copied ? "Copié !" : "Copier"}</span>
                    </Button>
                    <Button
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({ text: generatedMessage })
                        }
                      }}
                      className="flex-1 flex items-center justify-center space-x-2 bg-indigo-200 hover:bg-indigo-300 text-slate-800 border-0 rounded-xl"
                    >
                      <Send className="w-4 h-4" />
                      <span>Envoyer</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

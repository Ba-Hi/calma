"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, MessageCircle, HelpCircle, ArrowLeft, Phone } from "lucide-react"

interface ModeSelectionProps {
  onSelectMode: (mode: "auto-apaisement" | "demander-aide" | "pas-les-mots" | "appeler-urgence") => void
  onBack: () => void
}

export function ModeSelection({ onSelectMode, onBack }: ModeSelectionProps) {
  const modes = [
    {
      id: "auto-apaisement" as const,
      title: "Auto-apaisement",
      description: "Reçois un message doux ou un audio apaisant",
      icon: Heart,
      gradient: "from-pink-200 to-rose-200",
      hoverGradient: "hover:from-pink-300 hover:to-rose-300",
    },
    {
      id: "demander-aide" as const,
      title: "Je veux demander de l'aide",
      description: "Génère un message à envoyer à un proche",
      icon: HelpCircle,
      gradient: "from-blue-200 to-indigo-200",
      hoverGradient: "hover:from-blue-300 hover:to-indigo-300",
    },
    {
      id: "pas-les-mots" as const,
      title: "Je n'ai pas les mots",
      description: "L'IA t'aide à exprimer ce que tu ressens",
      icon: MessageCircle,
      gradient: "from-purple-200 to-violet-200",
      hoverGradient: "hover:from-purple-300 hover:to-violet-300",
    },

    {
      id: "appeler-urgence" as const,
      title: "Appeler un proche / urgence",
      description: "Appelle un contact d'urgence ou les secours",
      icon: Phone,
      gradient: "from-red-200 to-orange-200",
      hoverGradient: "hover:from-red-300 hover:to-orange-300",
    },
    
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-purple-50 p-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="icon" onClick={onBack} className="mr-4 text-slate-600 hover:text-slate-800">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-2xl font-light text-slate-800">Comment puis-je t'aider ?</h2>
        </div>

        <div className="space-y-4">
          {modes.map((mode) => {
            const IconComponent = mode.icon
            return (
              <Card
                key={mode.id}
                className="border-0 shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer"
                onClick={() => onSelectMode(mode.id)}
              >
                <CardContent className={`p-6 bg-gradient-to-r ${mode.gradient} ${mode.hoverGradient} rounded-lg`}>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <IconComponent className="w-8 h-8 text-slate-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-slate-800 mb-2">{mode.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{mode.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

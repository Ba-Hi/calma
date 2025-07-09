"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { ModeSelection } from "./components/mode-selection"
import { AutoApaisement } from "./components/auto-apaisement"
import { DemanderAide } from "./components/demander-aide"
import { PasLesMots } from "./components/pas-les-mots"

type Screen = "welcome" | "modes" | "auto-apaisement" | "demander-aide" | "pas-les-mots"

export default function CalmaApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome")

  const renderScreen = () => {
    switch (currentScreen) {
      case "welcome":
        return (
          <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-amber-50 to-purple-50">
            <div className="text-center space-y-8 max-w-md">
              <div className="space-y-4">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-200 to-blue-200 rounded-full flex items-center justify-center">
                  <Heart className="w-10 h-10 text-purple-600" />
                </div>
                <h1 className="text-4xl font-light text-slate-800 tracking-wide">Calma</h1>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Un espace sûr pour exprimer ce que tu ressens, même quand les mots manquent
                </p>
              </div>

              <Button
                onClick={() => setCurrentScreen("modes")}
                className="w-full py-4 text-lg bg-gradient-to-r from-purple-300 to-blue-300 hover:from-purple-400 hover:to-blue-400 text-slate-800 border-0 rounded-2xl shadow-lg transition-all duration-300"
              >
                Commencer
              </Button>
            </div>
          </div>
        )

      case "modes":
        return <ModeSelection onSelectMode={setCurrentScreen} onBack={() => setCurrentScreen("welcome")} />

      case "auto-apaisement":
        return <AutoApaisement onBack={() => setCurrentScreen("modes")} />

      case "demander-aide":
        return <DemanderAide onBack={() => setCurrentScreen("modes")} />

      case "pas-les-mots":
        return <PasLesMots onBack={() => setCurrentScreen("modes")} />

      default:
        return null
    }
  }

  return renderScreen()
}

"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Phone, Pencil } from "lucide-react"

interface AppelerUrgenceProps {
  onBack: () => void
}

export function AppelerUrgence({ onBack }: AppelerUrgenceProps) {
  const [savedNumber, setSavedNumber] = useState<string | null>(null)
  const [inputNumber, setInputNumber] = useState("")
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    const number = localStorage.getItem("numeroProche")
    if (number) setSavedNumber(number)
  }, [])

  const handleSaveNumber = () => {
    if (inputNumber.trim()) {
      localStorage.setItem("numeroProche", inputNumber)
      setSavedNumber(inputNumber)
      setEditMode(false)
    }
  }

  const handleEditNumber = () => {
    setInputNumber(savedNumber || "")
    setEditMode(true)
  }

  const callRelative = () => {
    if (savedNumber) {
      window.location.href = `tel:${savedNumber}`
    }
  }

  const callEmergency = () => {
    window.location.href = "tel:112"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 p-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="icon" onClick={onBack} className="mr-4 text-slate-600 hover:text-slate-800">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-2xl font-light text-slate-800">Appeler un proche ou les urgences</h2>
        </div>

        <div className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 bg-gradient-to-r from-red-100 to-orange-100 rounded-lg text-center space-y-4">
              <Phone className="w-12 h-12 text-red-500 mx-auto" />
              <p className="text-slate-700 leading-relaxed">
                Si tu ne te sens pas bien, tu peux appeler un proche ou directement les urgences.
              </p>
            </CardContent>
          </Card>

          {/* Si pas de numéro ou mode édition actif */}
          {!savedNumber || editMode ? (
            <div className="space-y-4">
              <Input
                type="tel"
                placeholder="Numéro d’un proche (ex: 0600000000)"
                value={inputNumber}
                onChange={(e) => setInputNumber(e.target.value)}
                className="border-red-200 focus:border-red-400 rounded-xl"
              />
              <Button
                onClick={handleSaveNumber}
                disabled={inputNumber.trim().length < 6}
                className="w-full py-4 bg-red-200 hover:bg-red-300 text-slate-800 rounded-2xl shadow-md"
              >
                {savedNumber ? "Mettre à jour le numéro" : "Enregistrer le numéro"}
              </Button>
              {savedNumber && (
                <Button
                  variant="outline"
                  onClick={() => setEditMode(false)}
                  className="w-full rounded-xl"
                >
                  Annuler
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <Button
                onClick={callRelative}
                className="w-full py-4 text-lg bg-red-200 hover:bg-red-300 text-slate-800 rounded-2xl shadow-md"
              >
                Appeler un proche ({savedNumber})
              </Button>
              <Button
                onClick={callEmergency}
                className="w-full py-4 text-lg bg-orange-300 hover:bg-orange-400 text-white rounded-2xl shadow-md"
              >
                Appeler les urgences (112)
              </Button>
              <Button
                variant="ghost"
                onClick={handleEditNumber}
                className="w-full text-sm text-slate-600 hover:text-slate-800 flex items-center justify-center space-x-2"
              >
                <Pencil className="w-4 h-4" />
                <span>Changer le numéro du proche</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

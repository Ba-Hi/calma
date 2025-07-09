import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { input } = await req.json()

    const { text } = await generateText({
      model: openai("gpt-4"),
      system: `Tu es un assistant empathique qui aide les personnes à exprimer leurs émotions.
      À partir d'un mot, d'une sensation ou même d'une absence d'input, génère une interprétation bienveillante de ce que la personne pourrait ressentir.
      Utilise la première personne (je) comme si c'était la personne qui parlait.
      Sois doux, compréhensif et validant. 
      Le message doit faire 2-4 phrases et aider la personne à se sentir comprise.
      Si l'input est vide, interprète cela comme une difficulté à identifier les émotions.`,
      prompt: `Aide-moi à exprimer ce que je ressens. Mon input: "${input || "rien - je n'arrive pas à identifier ce que je ressens"}"`,
    })

    return Response.json({ interpretation: text })
  } catch (error) {
    console.error("Erreur API pas-les-mots:", error)
    return Response.json({
      interpretation:
        "Je ressens quelque chose de lourd en moi, comme si mes émotions étaient emmêlées. J'ai besoin de temps et de douceur pour démêler tout ça. Je ne suis pas seul(e) dans cette épreuve.",
    })
  }
}

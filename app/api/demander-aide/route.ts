import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { context } = await req.json()

    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      system: `Tu es un assistant qui aide à rédiger des messages pour demander de l'aide à des proches.
      Génère un message bienveillant, authentique et pas trop dramatique.
      Le message doit être court (2-4 phrases), direct mais doux.
      Il doit exprimer le besoin d'aide sans alarmer excessivement.
      Adapte le ton selon le contexte fourni, mais reste toujours respectueux et humain.`,
      prompt: `Génère un message à envoyer à un proche pour demander de l'aide. 
      Contexte de la personne: ${context || "Aucun contexte spécifique fourni"}`,
    })

    return Response.json({ message: text })
  } catch (error) {
    console.error("Erreur API demander-aide:", error)
    return Response.json({
      message:
        "Salut, je traverse un moment difficile en ce moment et j'aurais besoin de ton soutien. Peux-tu m'appeler ou passer me voir quand tu peux ? Merci d'être là pour moi.",
    })
  }
}

import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function POST() {
  try {
    const { text } = await generateText({
      model: openai("gpt-4"),
      system: `Tu es un assistant bienveillant qui aide les personnes en crise d'anxiété. 
      Génère un message court, doux et apaisant (2-3 phrases maximum). 
      Utilise un ton chaleureux, empathique et rassurant. 
      Évite les conseils complexes, concentre-toi sur la présence et le réconfort immédiat.
      Parle à la deuxième personne du singulier (tu).`,
      prompt: "Génère un message apaisant pour quelqu'un qui traverse une crise d'anxiété.",
    })

    return Response.json({ message: text })
  } catch (error) {
    console.error("Erreur API auto-apaisement:", error)
    return Response.json({
      message: "Je suis là avec toi. Respire doucement. Tu es en sécurité. Cette sensation va passer.",
    })
  }
}

# 💗 Calma — Application d'Auto-Apaisement

#### Une application minimaliste, bienveillante et accessible pour accompagner les personnes en situation de stress ou d’anxiété.

---

## Présentation

**Calma** est une webapp conçue pour aider les utilisateurs à :
- **Exprimer leurs émotions librement**
- **Recevoir du réconfort via un assistant IA empathique**
- **Contacter un proche ou les services d’urgence** rapidement
- **Retrouver un sentiment de sécurité, étape par étape**

L’objectif est de créer un espace doux, rassurant et utile, même quand on a “pas les mots”.

---

## 🛠️ Stack technique

- **Frontend** : [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Framework** : [Next.js 15](https://nextjs.org/)
- **Design & UI** : [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Lucide Icons](https://lucide.dev/)
- **Backend AI** : [`ai-sdk`](https://sdk.vercel.ai/) + [OpenAI API (GPT-3.5-turbo)](https://platform.openai.com/)
- **Storage local** : `localStorage` (pour le numéro de proche)
- **Gestion de l’état du chat** : `useChat` (via `ai/react`)

---

## 🚀 Fonctionnalités principales

- 💬 **Chat thérapeutique IA** (GPT-4) : style empathique, doux et non médicalisant
- 📞 **Appel rapide à un proche** (enregistré à la 1re utilisation)
- 🚨 **Appel aux services d’urgence** selon la localisation de l’utilisateur
- 😶‍🌫️ **Mode “Pas les mots”** : bouton pour exprimer une émotion vague
- 🌬️ **Auto-apaisement** : suggestions, respiration guidée à venir
- 🎨 UI apaisante, animations douces, design mobile-friendly

---

## 🔧 Installation locale

```bash
# Clone le projet
git clone https://github.com/ton-utilisateur/calma.git
cd calma

# Installe les dépendances
pnpm install

# Ajoute ta clé OpenAI dans un fichier .env.local
echo "OPENAI_API_KEY=sk-..." > .env.local

# Lance le serveur de dev
pnpm dev

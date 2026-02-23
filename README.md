# 🚀 LinkedIn Content Transformer

Transform your messy thoughts, brain dumps, or URLs into high-engagement LinkedIn posts using artificial intelligence. This tool generates 5 distinct, algorithm-optimized variations of your content to help you build a stronger personal brand.

![Preview](./public/preview.png)

## ✨ Key Features

- **🧠 Brain Dump to Viral Post**: Convert raw ideas into structured, professional LinkedIn content effortlessly.
- **⚡ 5 Algorithm-Optimized Variations**: Get five distinct styles for every input:
  - **The Storyteller**: Frame your idea as a personal anecdote.
  - **The Contrarian**: Stand out with bold, against-the-grain perspectives.
  - **The Listicle**: Provide actionable value with structured frameworks.
  - **The Direct & Punchy**: High-impact, "broetry" style for maximum readability.
  - **The Analytical Deep-Dive**: Logic-backed, educational breakdowns.
- **🎙️ Customizable Brand Voice**: Select from multiple tones (Professional, Bold, Vulnerable, etc.) to match your unique style.
- **📋 One-Click Copy**: Instantly copy your favorite variation to your clipboard.
- **🌙 Modern UI**: Sleek, responsive dark-mode interface built with Tailwind CSS 4.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **AI Engine**: [Google Gemini 2.0 Flash](https://deepmind.google/technologies/gemini/)
- **AI SDK**: [Vercel AI SDK](https://sdk.vercel.ai/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Validation**: [Zod](https://zod.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm / yarn / pnpm
- A Google Gemini API Key (Get one at [Google AI Studio](https://aistudio.google.com/))

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/LinkedIn-Content-Transformer.git
   cd LinkedIn-Content-Transformer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add your API key:
   ```env
   GOOGLE_GENERATION_AI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to start transforming your content.

## 🔌 API Documentation

### Transform Content
`POST /api/transform`

Takes raw text and a brand voice preference to generate 5 LinkedIn post variations.

**Request Body:**
```json
{
  "text": "The message or idea you want to transform",
  "brandVoice": "Professional but conversational" // Optional
}
```

**Options for `brandVoice`:**
- `Professional but conversational` (Default)
- `Bold and contrarian`
- `Educational and analytical`
- `Vulnerable and storytelling`
- `Short, punchy "broetry"`

**Success Response (200 OK):**
```json
{
  "variations": [
    {
      "type": "The Storyteller",
      "content": "... formatted LinkedIn post text ..."
    },
    {
      "type": "The Contrarian",
      "content": "..."
    },
    ...
  ]
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Missing text input"
}
```

## 📂 Project Structure

- `src/app/` - Next.js App Router (Pages and API Routes)
- `src/app/api/transform/` - Gemini-powered transformation logic
- `public/` - Static assets (Preview images, icons)
- `tailwind.config.ts` - Custom styling configuration

## 📄 License

This project is licensed under the MIT License.

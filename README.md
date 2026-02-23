# 🚀 LinkedIn Content Transformer

Transform your raw thoughts, brain dumps, or URLs into high-engagement LinkedIn posts using AI.

![LinkedIn Content Transformer Preview](./public/preview.png)

## ✨ Features

- **Brain Dump to Post**: Turn messy ideas into structured, professional content.
- **5 Unique Variations**: Get distinct versions of your content:
  - **The Storyteller**: Engaging personal anecdotes.
  - **The Contrarian**: Bold, against-the-grain perspectives.
  - **The Listicle**: Highly actionable step-by-step formats.
  - **The Direct & Punchy**: High-impact "broetry" style.
  - **The Analytical Deep-Dive**: Logic-backed educational content.
- **Custom Brand Voice**: Select from multiple tones to match your personal brand.
- **One-Click Copy**: Quickly copy your favorite variation to the clipboard.
- **Modern UI**: Sleek, responsive dark-mode interface built with Tailwind CSS.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **AI Engine**: [Google Gemini 2.0 Flash](https://deepmind.google/technologies/gemini/) via [Vercel AI SDK](https://sdk.vercel.ai/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Validation**: [Zod](https://zod.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm / yarn / pnpm
- A Google Gemini API Key

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔌 API Documentation

### Transform Content
`POST /api/transform`

Transforms raw text into 5 LinkedIn post variations.

**Request Body:**
```json
{
  "text": "Your raw thought or idea here",
  "brandVoice": "Optional brand voice description"
}
```

**Response:**
```json
{
  "variations": [
    {
      "type": "The Storyteller",
      "content": "..."
    },
    ...
  ]
}
```

## 📄 License

This project is licensed under the MIT License.

# 🚀 AIForge - AI Project Architect

Transform your ideas into complete projects with AI-powered tech stack recommendations, specifications, and boilerplate code.

## ✨ Features

- 🤖 **AI Stack Recommendations** - Get intelligent tech stack suggestions based on your project requirements
- 📋 **Technical Specifications** - Auto-generate comprehensive technical documentation
- 📦 **Template Library** - Browse 10+ production-ready starter templates
- 💾 **Project Management** - Save and manage your project plans
- 🎨 **Modern UI** - Beautiful, responsive interface built with Next.js & Tailwind CSS
- 🌙 **Dark Mode** - Full dark mode support

## 🛠️ Tech Stack

- Next.js 15 + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase (PostgreSQL)
- Vercel AI SDK (Groq/OpenAI/Anthropic)
- Clerk Authentication

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env dengan API keys

# Run development
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── architect/         # AI Architect page
│   ├── projects/          # Projects management
│   └── templates/         # Template library
├── components/            # React components
│   ├── architect/         # Architect-specific components
│   └── ui/               # Reusable UI components
└── lib/                   # Utilities and helpers
    ├── db/               # Database functions
    ├── ai-provider.ts    # AI model configuration
    ├── prompts.ts        # AI prompts
    └── template-repos.ts # Template definitions
```

## 🔑 Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret

# AI Provider (choose one)
AI_PROVIDER=chatanywhere  # or groq, openai, anthropic
CHATANYWHERE_API_KEY=your_chatanywhere_key
# GROQ_API_KEY=your_groq_key
# OPENAI_API_KEY=your_openai_key
# ANTHROPIC_API_KEY=your_anthropic_key
```

## 📖 How It Works

1. **Describe** - Jelaskan project idea Anda
2. **Recommend** - AI suggest optimal tech stack
3. **Generate** - Get detailed technical specification
4. **Build** - Download template atau export ke GitHub

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy!

### Environment Setup

Make sure to set all required environment variables in your deployment platform:
- Supabase credentials
- Clerk authentication keys
- AI provider API key

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details

---

**Built with ❤️ using Next.js, Supabase, and AI**

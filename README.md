# 🚀 AIForge - AI Project Architect

Transform your ideas into complete projects with AI-powered tech stack recommendations, specifications, and boilerplate code.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/radincuyy/AIForge-hackathon)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🤖 **AI Stack Recommendations** - Get intelligent tech stack suggestions based on your project requirements
- 📋 **Technical Specifications** - Auto-generate comprehensive technical documentation
- 📦 **Template Library** - Browse 10+ production-ready starter templates
- 💾 **Project Management** - Save and manage your project plans
- 🎨 **Modern UI** - Beautiful, responsive interface built with Next.js & Tailwind CSS
- 🌙 **Dark Mode** - Full dark mode support

## 🛠️ Tech Stack

- **Framework:** Next.js 15 + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Database:** Supabase (PostgreSQL)
- **AI:** Vercel AI SDK (Groq/OpenAI/Anthropic)
- **Auth:** Clerk Authentication
- **Deployment:** Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm or yarn
- Supabase account
- Clerk account
- AI provider API key (Groq/OpenAI/Anthropic)

### Installation

```bash
# Clone repository
git clone https://github.com/radincuyy/AIForge-hackathon.git
cd AIForge-hackathon

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your API keys

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
AIForge/
├── .github/
│   └── workflows/          # GitHub Actions CI/CD
├── docs/                   # Documentation
│   ├── DEPLOYMENT.md       # Deployment guide
│   ├── CONTRIBUTING.md     # Contribution guidelines
│   └── ...                 # Other guides
├── public/                 # Static assets
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── api/          # API routes
│   │   ├── architect/    # AI Architect page
│   │   ├── projects/     # Projects management
│   │   └── templates/    # Template library
│   ├── components/       # React components
│   │   ├── architect/    # Architect-specific
│   │   └── ui/          # Reusable UI components
│   └── lib/             # Utilities & helpers
│       ├── db/          # Database functions
│       ├── ai-provider.ts
│       ├── prompts.ts
│       └── template-repos.ts
├── supabase/
│   └── migrations/        # Database migrations
├── .env.example          # Environment variables template
├── package.json
└── README.md
```

## 🔑 Environment Variables

See [`.env.example`](.env.example) for all required environment variables.

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key

# AI Provider (choose one)
AI_PROVIDER=groq
GROQ_API_KEY=your_groq_key
```

## 📖 How It Works

1. **Describe** - Describe your project idea
2. **Recommend** - AI suggests optimal tech stack
3. **Generate** - Get detailed technical specification
4. **Build** - Download template or start coding

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/radincuyy/AIForge-hackathon)

Or manually:

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy!

**📖 Detailed Guide:** See [`docs/DEPLOY_VERCEL_CLERK.md`](docs/DEPLOY_VERCEL_CLERK.md)

### Other Platforms

- **Railway:** See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)
- **Netlify:** See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)
- **Self-hosted:** Docker support coming soon

## 📚 Documentation

- **[Deployment Guide](docs/DEPLOY_VERCEL_CLERK.md)** - Deploy to Vercel with Clerk
- **[Clerk Production Setup](docs/CLERK_PRODUCTION_SETUP.md)** - Setup Clerk production keys
- **[Contributing Guide](docs/CONTRIBUTING.md)** - How to contribute
- **[GitHub Secrets Setup](docs/GITHUB_SECRETS_SETUP.md)** - Setup CI/CD secrets

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](docs/CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [Clerk](https://clerk.com/) - Authentication
- [Vercel AI SDK](https://sdk.vercel.ai/) - AI integration
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/radincuyy/AIForge-hackathon/issues)
- **Discussions:** [GitHub Discussions](https://github.com/radincuyy/AIForge-hackathon/discussions)

---

**Built with ❤️ using Next.js, Supabase, and AI**

**⭐ Star this repo if you find it helpful!**

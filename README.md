# Auto-Phil Blog Agent (Vercel Edition)

AI-powered blog content generator optimized for SEO and AEO (Answer Engine Optimization). Built with Next.js and deployed on Vercel.

## Features

✨ **AI-Powered Content Generation** - Uses OpenAI GPT-4o-mini for intelligent blog snippets  
🎨 **Auto-Phil Branding** - Custom colors, fonts, and crystal loading animation  
🔍 **SEO & AEO Optimized** - Content designed for search engines and voice assistants  
💬 **Interactive Chat Interface** - Conversational blog generation with history  
🌐 **Website Analysis** - Automatically scrapes and analyzes your business website  
⚡ **Always-On** - No cold starts or timeouts on Vercel

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT-4o-mini
- **Scraping**: Cheerio
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key ([get one here](https://platform.openai.com/api-keys))
- Vercel account (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Auto-Phil/autophil_website_BlogAgent.git
   cd autophil-blog-vercel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=sk-proj-...
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

### Option 1: Deploy via GitHub (Recommended)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/Auto-Phil/autophil-blog-vercel.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Add Environment Variables**
   - In Vercel project settings → Environment Variables
   - Add: `OPENAI_API_KEY` with your API key
   - Deploy!

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Add environment variable**
   ```bash
   vercel env add OPENAI_API_KEY
   ```

4. **Redeploy with env var**
   ```bash
   vercel --prod
   ```

## Project Structure

```
autophil-blog-vercel/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # API endpoint for blog generation
│   ├── globals.css               # Global styles + crystal animation
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main UI component
├── public/                       # Static assets
├── .env.example                  # Environment variables template
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts            # Tailwind with Auto-Phil colors
└── tsconfig.json
```

## Features Explained

### Auto-Phil Branding

- **Midnight Green** (#004953) - User chat icons, headers
- **Auto-Phil Blue** (#007C91) - Assistant icons, buttons
- **Cream White** (#F9F9F6) - Background
- **Darker Blue** (#005F73) - Hover states

### Crystal Loading Animation

Custom CSS animation with 6 rotating crystals in blue gradients - shows while AI generates content.

### Chat Interface

1. Enter your business website URL
2. Optionally add blog topics
3. Click "Get Started" to generate first snippet
4. Continue conversation with follow-up requests
5. Clear chat to start fresh

### API Route

`POST /api/generate` accepts:
- `websiteUrl` (string, required)
- `topics` (string, optional)
- `userMessage` (string, required)
- `history` (array, optional)

Returns:
- `success` (boolean)
- `content` (string) - Generated blog snippet

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |

## Performance

- **Always-On**: No cold starts on Vercel
- **Fast Response**: Typically 3-5 seconds for generation
- **Scalable**: Auto-scales with traffic

## Security

- API key stored securely in environment variables
- Never exposed to client-side code
- CORS handled by Next.js API routes

## Troubleshooting

### "Cannot find module" errors
```bash
npm install
```

### Environment variable not working
- Make sure it's named `OPENAI_API_KEY` exactly
- Redeploy after adding env vars in Vercel
- For local dev, use `.env.local` (not `.env`)

### Website scraping fails
- Some websites block scrapers
- Check website's robots.txt
- Scraping failures won't break the app - it proceeds with limited context

## Support

For issues or questions:
- GitHub Issues: [Auto-Phil/autophil-blog-vercel](https://github.com/Auto-Phil/autophil-blog-vercel/issues)
- Email: support@autophil.com

## License

© 2025 Auto-Phil, LLC. All rights reserved.

---

**Turning tech apprehension into anticipation for SME and Startups** 🚀

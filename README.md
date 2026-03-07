🚀 Dev Events
A modern, high-performance web application designed to help developers find and manage tech events. This project is built with a focus on clean architecture, responsive design, and real-time user tracking.

✨ Features
Dynamic Event Cards: Beautifully mapped event components showing titles, dates, and locations.

Responsive UI: Optimized for both mobile and desktop views using Tailwind CSS.

Real-time Analytics: Integrated with PostHog to track user interactions and event popularity.

Automated CI/CD: Fully deployed on Vercel with automatic updates via GitHub.

🛠️ Tech Stack
Framework: Next.js (App Router)

Styling: Tailwind CSS & Lucide Icons

Analytics: PostHog-js

Deployment: Vercel

Version Control: Git & GitHub

🚀 Getting Started
To run this project locally, follow these steps:

1. Clone the repository
Bash
git clone https://github.com/IHJ007/Dev-Events.git
cd Dev-Events
2. Install dependencies
Bash
npm install
3. Set up Environment Variables
Create a .env.local file in the root directory and add your PostHog keys:

Plaintext
NEXT_PUBLIC_POSTHOG_KEY=your_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
4. Run the development server
Bash
npm run dev
Open http://localhost:3000 with your browser to see the result.

📈 Project Status
[x] Initial UI Setup

[x] Deployment to Vercel

[x] PostHog Integration

[ ] Database Models (In Progress)

[ ] User Authentication (Coming Soon)

🤝 Contributing
This is a personal learning project, but feel free to fork it and experiment!

Create a feature branch (git checkout -b feature/NewFeature).

Commit your changes (git commit -m 'Add some NewFeature').

Push to the branch (git push origin feature/NewFeature).

Open a Pull Request.
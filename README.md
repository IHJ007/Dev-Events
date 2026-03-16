# 🛠️ Dev Events

A platform for developers to browse and share tech events — built as a hands-on learning project while going deep on Next.js, Firebase, and TypeScript.

> Yeah, I built this myself. Mostly. (With a few hundred console.logs and a fair share of 404s along the way.)

---

## 🚀 Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Firebase Firestore |
| Deployment | Vercel |

---

## ✨ Features

- **Browse Events** — View all developer events in a clean, full-width list layout
- **Event Details** — Dedicated page per event with full info (`/events/[slug]`)
- **Create Events** — Submit new events via a form with imageURL support
- **API Layer** — Clean REST-style API routes under `/api/events`
- **SSR** — Server-side data fetching with Next.js App Router patterns

---

## 🧠 What I Learned Building This

- How Next.js App Router actually works (file-based routing, layouts, server vs client components)
- The difference between Firebase Admin SDK and Client SDK — and why mixing them up causes pain
- API routes in Next.js and why you should never call `request.json()` twice
- How Vercel caches aggressively and how to deal with it
- Debugging is literally 70% of the job and that's okay

---

## 📌 Roadmap

- [ ] Authentication (Firebase Auth)
- [ ] Event categories / tags
- [ ] Pagination
- [ ] Better search

---

## 🙋 About

Built by **IHJ007** — a CSE student from Bangladesh working toward becoming a full-stack software engineer.  
Learning in public. Breaking things. Fixing them. Repeat.

---

## 📄 License

MIT — do whatever you want with it.

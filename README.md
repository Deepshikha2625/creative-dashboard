# Next.js Dashboard Project
https://admin-creative-dashboard.netlify.app/

A modern, responsive dashboard application built with Next.js 15, React 19, Tailwind CSS v4, and Material UI. This project demonstrates a professional UI/UX with theme support, protected routes, sidebar navigation, and visually attractive dashboard cards.

## Features

- **Next.js 15 & React 19**: Latest frameworks for fast, scalable web apps.
- **Tailwind CSS v4**: Utility-first CSS for rapid UI development.
- **Material UI**: Prebuilt components for consistent design.
- **Dark/Light Theme**: Toggleable theme with CSS variables and context.
- **Protected Routes**: Middleware ensures only authenticated users access dashboard pages.
- **Sidebar Navigation**: Organized navigation with Account section (Settings, Logout).
- **Dashboard Stats Cards**: Modern glassmorphism, gradient borders, and responsive layout.
- **User Management Table**: Search, sort, and paginate users fetched from a public API.
- **Responsive Design**: Mobile-friendly and accessible.

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
# or
yarn install
```

### Development
```bash
npm run dev
# or
yarn dev
```
Visit [http://localhost:7777](http://localhost:7777) to view the app.

### Build for Production
```bash
npm run build
npm start
```

## Project Structure
```
my-project/
├── public/           # Static assets
├── src/
│   ├── app/          # Next.js app directory
│   ├── components/   # Reusable UI and layout components
│   ├── contexts/     # React context providers
│   ├── hooks/        # Custom React hooks
│   └── lib/          # Utilities and API logic
├── tailwind.config.ts
├── postcss.config.mjs
├── next.config.ts
├── tsconfig.json
└── package.json
```

## Customization
- **Theme**: Edit `src/app/globals.css` and `ThemeContext.tsx` for color palette and theme logic.
- **Sidebar**: Update `AppSidebar.tsx` for navigation links.
- **Dashboard Cards**: Edit `Dashboard.tsx` for stats and card design.

## Credits
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Material UI](https://mui.com/)

## License
This project is licensed under the MIT License.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:7777](http://localhost:7777) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/Deepshikha2625/creative-dashboard) - your feedback and contributions are welcome!

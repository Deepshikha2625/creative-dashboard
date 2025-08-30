'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation"; // ✅ Correct hook in Next.js
import Link from "next/link"; // ✅ Next.js Link

const NotFound = () => {
  const pathname = usePathname(); // get current path

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", pathname);
  }, [pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-red-500">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! The page you're looking for does not exist.</p>
        
        <Link 
          href="/" 
          className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

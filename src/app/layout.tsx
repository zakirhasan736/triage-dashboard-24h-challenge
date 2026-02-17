import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/common/Toast';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TriageAI - AI-Powered Customer Support Dashboard',
  description:
    'Automatically categorize, prioritize, and manage customer support tickets using AI.',
  keywords: [
    'customer support',
    'AI triage',
    'ticket management',
    'help desk',
    'Gemini AI',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-slate-50 font-sans text-slate-900">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}

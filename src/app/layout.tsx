import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/components/common/Toast';
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
    <html lang="en">
      <body className="bg-slate-50 font-sans text-slate-900">
        {' '}
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}

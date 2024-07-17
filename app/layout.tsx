import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthProvider from '@/context/authProvider';
import './globals.css';
import { ThemeProvider } from '@/context/themeprovider';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import { TailwindIndicator } from '@/components/tailwind-indicator';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'cipherchat.ai',
  description: 'Send me messages anonymously',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Toaster />
            <TailwindIndicator />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthProvider from '@/context/authProvider';
import './globals.css';
import { ThemeProvider } from '@/context/themeprovider';
import { Toaster } from '@/components/ui/toaster';
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
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

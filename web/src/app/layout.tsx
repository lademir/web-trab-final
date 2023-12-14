import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { UserNav } from '@/components/user-nav/user-nav';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "BoraTreinar",
  description: 'Sistema para auxiliar o treinamento em academias',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <html lang="en" className='bg-slate-950 text-slate-100'>
      <body className={inter.className}>
        {/* <ThemeProvider attribute='class' defaultTheme='light'> */}
        {/* <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" /> */}
        {children}
        {/* </ThemeProvider> */}
        <Toaster />
      </body>
    </html>
  );
}

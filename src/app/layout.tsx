import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Appbar from '@/components/Appbar';
import { getServerSession } from 'next-auth';
import SessionProvider from '@/components/SessionProvider';
import Providers from '@/lib/query-provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Better-You.',
  description: 'Be Better Than Before.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Providers>
            <Appbar />
            {children}
          </Providers>
        </SessionProvider>
      </body>
    </html>
  )
}

// 'use client';

import { Link } from '@/components/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { setCookie, parseCookies } from 'nookies';
import { SetStateFromJwt } from './login/fn';
import { cookies } from 'next/headers';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      pagina mostrando um pouco do app, ainda a ser feita
      <Link href={'/login'} type='primary'>Login</Link>
    </main>
  );
}

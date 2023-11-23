'use client';

import { Link } from '@/components/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <main className="flex flex-col items-center justify-between p-24">
      pagina mostrando um pouco do app, ainda a ser feita
      <Link href={'/login'} type='primary'>Login</Link>
    </main>
  );
}

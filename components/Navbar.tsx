'use client';
import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { User } from 'next-auth';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';
import { ModeToggle } from './modetoggle';

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;
  const pathname = usePathname();

  return (
    <>
      {pathname === '/signin' ||
      pathname === '/signup' ||
      pathname === '/verify' ? null : (
        <nav className="p-4 md:p-6 shadow-md">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <Link
              className="text-xl font-bold mb-4 md:mb-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 px-4 p-2 rounded-md text-white"
              href="#"
            >
              cipherchat.ai
            </Link>
            <div className="flex gap-3 items-center">
              {session ? (
                <span>Welcome, {user?.username || user.email}</span>
              ) : null}
              <ModeToggle />
              {session ? (
                <Button className="w-full md:w-auto" onClick={() => signOut()}>
                  Logout
                </Button>
              ) : (
                <Link href="/signin">
                  <Button className="w-full md:w-auto">Login</Button>
                </Link>
              )}
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;

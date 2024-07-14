'use client';
import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { User } from 'next-auth';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';

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
            <Link className="text-xl font-bold mb-4 md:mb-0" href="#">
              cipherchat.ai
            </Link>
            {session ? (
              <>
                <span className="mr-4">
                  Welcome, {user?.username || user.email}
                </span>
                <Button className="w-full md:w-auto" onClick={() => signOut()}>
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/signin">
                <Button className="w-full md:w-auto">Login</Button>
              </Link>
            )}
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;

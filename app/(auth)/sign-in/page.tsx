'use client';
import Link from 'next/link';

function page() {
  return (
    <div className="flex justify-center item-center min-h-screen p-8">
      <div className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join cipherchat.ai
          </h1>
          <p className="mb-4">Sign in to start your anonymous adventure</p>
        </div>
        <p>
          Already a member?{' '}
          <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default page;

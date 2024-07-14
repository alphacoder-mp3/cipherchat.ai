import { ShowMessages } from '@/components/ShowMessages';

export default function Home() {
  return (
    <main className="flex flex-grow flex-col items-center justify-center p-24 md:px-24 py-12">
      <section className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-bold">
          {' '}
          Dive into the world of Anonymous conversation
        </h1>
        <p className="mt-3 md:mt-4 text-base md:text-lg">
          Explore cipherchat.ai - where your identity remains a secret.
        </p>
        {/* <div className="text-3xl md:text-6xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
          work forward.
        </div> */}
      </section>
      <ShowMessages />
      {/* <footer className="text-center p-4 md:p-6">
        © 2024 cipherchat.ai. All rights reserved.
      </footer> */}
    </main>
  );
}

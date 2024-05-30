import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">

      <h1 className='text-3xl font-bold'>Pagination Original</h1>

      <li className='text-xl text-blue-400 hover:text-blue-500 active:text-blue-600'>
        <Link href={'/pagination'}>Go to pagination + searchbar</Link>
      </li>

    </main>
  );
}

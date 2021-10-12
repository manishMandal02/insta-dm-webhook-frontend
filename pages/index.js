import Head from 'next/head';
import InstaDM from '../components/instaDM';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-mainbg'>
      <Head>
        <title>Social Scrapper</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <InstaDM />
    </div>
  );
}

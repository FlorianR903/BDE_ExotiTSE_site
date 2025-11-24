import Link from 'next/link';
import Nav from '../components/Nav';
import Head from 'next/head';

export default function Success() {
  return (
    <>
      <Head>
        <title>Paiement Réussi - Exoti'TSE</title>
      </Head>
      <Nav />
      <div className="min-h-screen flex flex-col items-center justify-center text-white pt-24 px-4 text-center">
        <div className="bg-emerald-500/20 p-8 rounded-3xl backdrop-blur-xl border border-emerald-500/30">
          <h1 className="text-4xl font-bold mb-4 text-emerald-400">Paiement Réussi !</h1>
          <p className="text-lg mb-8 text-white/80">
            Merci pour votre commande. Vous recevrez un email de confirmation sous peu.
          </p>
          <Link 
            href="/menu" 
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 font-bold text-white transition-colors"
          >
            Retour au menu
          </Link>
        </div>
      </div>
    </>
  );
}

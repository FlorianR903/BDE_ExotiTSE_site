import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-700/20 to-pink-500/20 text-white">
            <Component {...pageProps} />
        </div>
    );
}
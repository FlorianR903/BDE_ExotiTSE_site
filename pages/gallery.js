import Nav from '../components/Nav'
import GallerySection from '../components/GallerySection'
import Head from "next/head";

export default function Gallery(){
    const demo = []
    const placeholderBoxes = Array(9).fill(null); // 9 cases par exemple

    return (
        <>
            <Head>
                <title>Exoti'TSE</title>
            </Head>

            <Nav />

            <section className="py-20 px-6 text-white">
                <h1 className="text-4xl font-bold text-center mb-10">Galerie</h1>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {placeholderBoxes.map((_, index) => (
                        <div
                            key={index}
                            className="aspect-square bg-white/10 border border-white/20 rounded-xl flex items-center justify-center cursor-pointer hover:bg-white/20 transition"
                        >
                            <span className="text-5xl font-bold text-white/50">+</span>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
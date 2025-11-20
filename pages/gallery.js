import Nav from '../components/Nav'
import GallerySection from '../components/GallerySection'
import Head from "next/head";

export default function Gallery(){
    const demo = []

    return (
        <>
            <Head>
                <title>Exoti'TSE</title>
            </Head>

            <Nav />

            <div className="pt-24">
                <GallerySection items={demo} />
            </div>
        </>
    );
}
import Nav from '../components/Nav'
import MenuSection from '../components/MenuSection'
import Head from "next/head";
import Footer from '../components/Footer'

export const dynamic = 'force-dynamic';

export default function Menu(){
    const demo = []

    return (
        <>
            <Head>
                <title>Exoti'TSE</title>
            </Head>

            <Nav />

            <div className="pt-24">
                <MenuSection items={demo} />
            </div>

            <Footer />
        </>
    );
}
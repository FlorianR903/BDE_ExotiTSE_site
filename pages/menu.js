import Nav from '../components/Nav'
import MenuSection from '../components/MenuSection'
import Head from "next/head";

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
        </>
    );
}
import Nav from '../components/Nav'
import ContactSection from '../components/ContactSection'
import Head from "next/head";

export default function Contact(){
    return (
        <>
            <Head>
                <title>Exoti'TSE</title>
            </Head>

            <Nav />

            <div className="pt-24">
                <ContactSection />
            </div>
        </>
    );
}
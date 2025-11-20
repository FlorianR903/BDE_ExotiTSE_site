import Nav from '../components/Nav'
import TeamSection from '../components/TeamSection'
import Head from "next/head";

export default function Team(){
    const demo = []

    return (
        <>
            <Head>
                <title>Exoti'TSE</title>
            </Head>

            <Nav />

            <div className="pt-24">
                <TeamSection team={demo} />
            </div>
        </>
    );
}
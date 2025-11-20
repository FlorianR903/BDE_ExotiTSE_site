import Nav from '../components/Nav'
import EventsSection from '../components/EventsSection'
import Head from "next/head";

export default function Events(){
const demo = []
    return (
        <>
            <Head>
                <title>Exoti'TSE</title>
            </Head>

            <Nav />

            <div className="pt-24">
                <EventsSection events={demo} />
            </div>
        </>
    );
}
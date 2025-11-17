import Nav from '../components/Nav'
import EventsSection from '../components/EventsSection'


export default function Events(){
const demo = []
return (<>
<Nav />
<div className="pt-24">
<EventsSection events={demo} />
</div>
</>)
}
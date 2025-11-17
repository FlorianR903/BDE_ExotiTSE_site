import Nav from '../components/Nav'
import TeamSection from '../components/TeamSection'
export default function Team(){
const demo = []
return (<>
<Nav />
<div className="pt-24">
<TeamSection team={demo} />
</div>
</>)
}
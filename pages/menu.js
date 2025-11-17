import Nav from '../components/Nav'
import MenuSection from '../components/MenuSection'
export default function Menu(){
const demo = []
return (<>
<Nav />
<div className="pt-24">
<MenuSection items={demo} />
</div>
</>)
}
import Nav from '../components/Nav'
import GallerySection from '../components/GallerySection'
export default function Gallery(){
const demo = []
return (<>
<Nav />
<div className="pt-24">
<GallerySection items={demo} />
</div>
</>)
}
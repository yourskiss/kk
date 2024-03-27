import Image from 'next/image'
 
export default function Pageloading() {
  return (
    <div className="pageloading"> 
        <div>
            <Image src="/assets/images/logo.png" width={100} height={100} alt="Logo" quality={99} />
        </div>
    </div>
  )
}
 
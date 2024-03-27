"use client";
import Image from 'next/image'
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import HeaderComponent from "../shared/HeaderComponent";
import {  isUserToken } from "@/config/userauth";
import Link from 'next/link';
import TotalrewardpointsComponent from '../shared/TotalrewardpointsComponent';
 
const DashboardComponent = () => {
  const { push } = useRouter();
  const isUT = isUserToken();
  const rewardspoints = TotalrewardpointsComponent();
 

 
  useEffect(() => {
  if(!isUT) { push("/"); return  }
  }, [isUT]);


  return (
  <>
    <HeaderComponent />
    <div className="screenmain" > 
      <div className="screencontainer">
   
          <div className="dashboard_head">
              <h2>
                  PRODUCT CATEGORIES
                  <span>Earn reward points everytime you purchase!</span>
              </h2>
          </div>

          <div className="dashboard_single_pro">
              <aside>
                <Image src="/assets/images/dashboard_single_pro.png" width={100} height={100} alt="product" quality={100} />
              </aside>
              <h2>
                  <span>Learn more</span>
                  <Image src="/assets/images/arrows.png" width={100} height={100} alt="product" quality={100} />
              </h2>
          </div>

 
          <div className="dashboard_mid">
              <h2>
                  REWARD KERAKOLL AWARDS
                  <span>you’ve earned your reward points is</span>
              </h2>
              <p><span>{rewardspoints}</span><b>pt</b></p>
          </div>

          <div className="dashboard_double_pro">
              <aside>
                   <Link href="/scanqrcode"><Image src="/assets/images/dashboard_double_pro2.png" width={100} height={100} alt="product" quality={100} /></Link>
              </aside>
              <aside>
                  <Image src="/assets/images/dashboard_double_pro1.png" width={100} height={100} alt="product" quality={100} />
              </aside>
          </div>
          
      </div>
    </div> 
  </>
  )
}
export default DashboardComponent; // isauths(DashboardComponent);
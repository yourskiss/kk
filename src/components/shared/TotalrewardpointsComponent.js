"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { setBearerToken } from '@/config/beararauth';
import { getUserID  } from "@/config/userauth";
 
export default function TotalrewardpointsComponent() {
    const [points, setPoints] = useState(0);
    const setBT = setBearerToken();
    const userID = getUserID();
 
        useEffect(() => {
            axios({
                url: process.env.BASE_URL + "Customer/UserTotalRewardPoints?userid="+ userID,
                method: "GET",
                headers: { 'authorization': 'Bearer '+ setBT },
            }).then((res) => {
               // console.log("UserTotalRewardPoints response - ", res);
                setPoints(res.data.result[0].totalpoints);
            }).catch((error) => {
                console.log(error.message);
            });
        }, [userID]);

        return points;
  }
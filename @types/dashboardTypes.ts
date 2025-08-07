import { StaticImageData } from "next/image";
import { IconType } from "react-icons/lib";

type quickLinks= {
    id: number;
    title: string;
    link: string;
    img: StaticImageData
}

type upcommingPay = {
    id: number;
    icon: IconType;
    title : string;
    payment: number;
    date: string;
}

export interface recentCardTypes {
    id: string;
    subject : string;
    category : string;
    amount: number;
    bankType: string;
    paymentDate: string
}

export interface quickNaviationButtonTypes {
    navButton:quickLinks []
}

export interface upcommingCardTypes {
    upcommingPayments: upcommingPay[]
}
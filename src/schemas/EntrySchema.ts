import { ReactElement } from "react";

export interface entryProps {
    name: string;
    image: string;
    genre: string;
    platform: ReactElement;
    price: number;
    originalPrice: number;
    quantity: number;
}
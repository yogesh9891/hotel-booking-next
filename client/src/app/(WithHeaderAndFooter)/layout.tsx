"use client";
import Header from '@/layout/Header'
import Footer from '@/layout/Footer'
import OffcanvasSearchInput from '@/components/OffcanvasSearchInput/OffcanvasSearchInput'
import { usePathname } from 'next/navigation';
// import SearchInput from '@/components/SearchInput/SearchInput';


export default function RootLayout({children,params}: {children: React.ReactNode, params: { slug: string } }){

    const currentRoute = usePathname();
    return (
        <>
            <Header  params={params}/>
           {
             currentRoute == '/Hotels' || currentRoute == '/Apartments' || currentRoute == "/Property" || currentRoute.includes("/PropertyDetail/") || currentRoute == "/location/mussoorie"  || currentRoute.includes("/location/dehradun")  || currentRoute.includes("/location/rishikesh") || currentRoute.includes("/HotelDetail/") || currentRoute.includes("/collection/") ? <OffcanvasSearchInput/>  : ""
           }
            {children}
            <Footer />
        </>
    )
}

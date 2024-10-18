import Sidebar from "./component/Sidebar";
import style from '@/app/(WithHeaderAndFooter)/(MyAccountPages)/component/Sidebar.module.scss'


export default function RootLayout({
    children,
}: {
    children: React.ReactNode,

}) {
    return (
        <>
            <div className={style.profile_page}>
                <div className='container'>
                    <div className="row">
                        <div className="col-lg-3 col-md-4 ">
                            <Sidebar />
                        </div>
                        <div className="col-lg-9 col-md-8 ">
                            {children}
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

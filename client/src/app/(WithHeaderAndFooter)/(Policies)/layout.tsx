"use client"
import style from '@/app/(WithHeaderAndFooter)/(Policies)/component/PolicySidebar.module.scss'
import PolicySidebar from './component/PolicySidebar'
import { usePathname } from 'next/navigation';


export default function RootLayout({ children, }: { children: React.ReactNode, }) {

    const currentRoute = usePathname();

    return (
        <>
            <div className={style.policy}>
                <div className="row g-0">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        {
                            currentRoute == "/Cancellation"
                            &&
                            <div className={style.headings}>
                                <h4 className={style.title}>Refund and Cancellation Policy</h4>
                                <p className={style.date}>Last modified: Jan 09, 2024</p>
                            </div>
                        }
                        {
                            currentRoute == "/TermAndCondition"
                            &&
                            <div className={style.headings}>
                                <h4 className={style.title}>Terms and Conditions</h4>
                                <p className={style.date}>Last modified: Jan 09, 2024</p>
                            </div>
                        }
                        {
                            currentRoute == "/PrivacyPolicy"
                            &&
                            <div className={style.headings}>
                                <h4 className={style.title}>Privacy Policy</h4>
                                <p className={style.date}>Last modified: Jan 09, 2024</p>
                            </div>
                        }
                        {
                            currentRoute == "/ChildrenPrivacy"
                            &&
                            <div className={style.headings}>
                                <h4 className={style.title}>Children Privacy</h4>
                                <p className={style.date}>Last modified: Jan 09, 2024</p>
                            </div>
                        }




                    </div>
                </div>
                <div className='container'>
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-3">
                            <PolicySidebar />
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-9">
                            {children}
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
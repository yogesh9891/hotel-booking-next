
import React from 'react'
import style from '@/app/(WithHeaderAndFooter)/(Policies)/ChildrenPrivacy/ChildrenPrivacy.module.scss'
import Link from 'next/link'

export default function page() {

    return (

        <div className={style.children_sec}>
            <h4 className={style.head}>Children's Privacy</h4>
            <p className={style.para}>Our Service does not address anyone under the age of 13. We do not
                knowingly collect personally identifiable information from anyone under the age of 13. If You are
                a parent or guardian and You are aware that Your child has provided Us with Personal Data, please
                contact Us. If We become aware that We have collected Personal Data from anyone under the age of
                13 without verification of parental consent, We take steps to remove that information from Our
                servers.</p>

            <p className={style.para}>If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.</p>

            <h4 className={style.head}>1. Links to Other Websites</h4>
            <p className={style.para}>Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit</p>
            <p className={style.para}>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>

            <h4 className={style.head}>2. Changes to this Privacy Policy</h4>
            <ul className={style.list}>
                <li className={style.item}>We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</li>
                <li className={style.item}>We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.</li>
                <li className={style.item}>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</li>
            </ul>

            <h4 className={style.head}>3. Contact Us</h4>
            <p className={style.para}>If you have any questions about this Privacy Policy, You can contact us</p>

            <p className={style.desc}>By email: <Link href='#'>hello@wabisabistays.com</Link></p>
        </div>
    )
}


import React from 'react'
import style from '@/app/(WithHeaderAndFooter)/(Policies)/Cancellation/Cancellation.module.scss'
import Link from 'next/link'

export default function page() {


  return (


    <ul className={style.cancel_sec}>
      <li className={style.para}>
        Cancellation has to be made on the corresponding email ID: <Link href='#'>hello@wabisabistays.com</Link>, <Link href='#'>wabisabistays@gmail.com</Link> ONLY otherwise no cancellation will be entertained.
      </li>
      <li className={style.para}>
        We do not accept Cancellations over the Phone.
      </li>
      <li className={style.para}>
        100% refund after booking, up to 7 days before check-in
      </li>
      <li className={style.para}>
        No refund if the cancellation is made within 7 days of the date of check-in.
      </li>
      <li className={style.para}>
        If the guest arrives and decides to leave early, the nights not spent are not refunded.
      </li>
      <li className={style.para}>
        All refunds required in the event of cancellations and amendments will be credited to your bank account as per the bank policy.
      </li>
      <li className={style.para}>
        Please note that refunds will be made in the form of a credit to your bank account and the transaction fee/convenience fee is to be borne by the Guest.
      </li>
      <li className={style.para}>
        All refunds will be processed in a timely manner. Once the refund instructions leave our office it can take anywhere from 2 to 14 business days for the refund to arrive in your account.
      </li>
      <li className={style.para}>
        We understand that the policy may come across as stringent, and having been through the pandemic phase as a hospitality venture, these genuinely are our final terms.
      </li>
      <li className={style.para}>
        Alterations or modifications will be treated as cancellation. Please refer to the cancellation policy
      </li>
    </ul>

  )
}

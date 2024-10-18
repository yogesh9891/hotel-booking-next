import React from "react";
import style from "@/components/Destination/Destination.module.scss";
import Image from "next/image";
// import { Images } from "@/assets/Utility/Images";
import Link from "next/link";
import { generateImageUrl } from "@/service/url.service";

export default function Destination({ locationArr }: { locationArr: any[] }) {
  return (
    <div className={style.destination_sec}>
      <div className="container">
        <div className="row">
          <div className={style.main_content}>
            {locationArr &&
              locationArr?.map((lcoation: any, i: number) => (
                <div className={style.boxes} key={i}>
                  <div className={style.circle}>
                  <Link href={`/location/${lcoation?.slug}`}>
                    <div className={style.image}>
                      <Image
                        src={generateImageUrl(lcoation.imageUrl)}
                        alt=""
                        fill
                        priority
                      />
                    </div>
                    </Link>
                  </div>

                  {/* <h6 className={style.text}>
                    <Link href={`/location/${lcoation?.slug}`}>
                      {lcoation.name}
                    </Link>
                  </h6> */}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

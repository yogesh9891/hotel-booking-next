import React from "react";
import style from "@/components/AboutExperience/AboutExperience.module.scss";
// import Image from "next/image";
// import { Images } from "@/assets/Utility/Images";

export default function AboutExperience({ data }: { data: any }) {
  return (
    <div className={style.experience_sec}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-md-10 col-sm-10">
            <h2 className={style.head}>
              About <span>{data?.name}</span> Experiences
            </h2>
            <p
              className={style.para}
              dangerouslySetInnerHTML={{
                __html: data?.description,
              }}
            ></p>
          </div>

          {/* <div className="col-lg-10 col-md-10 col-sm-10">
            <div className="row mt-5 pt-3">
              <div className="col-lg-4 col-md-4 col-sm-4">
                <div className={style.main_content}>
                  <div className={style.box}>
                    <div className={style.image}>
                      <Image src={Images.about1} alt="" fill />
                    </div>
                  </div>
                  <div className={style.text}>
                    <h6 className={style.head}>Bird Watching</h6>
                    <p className={style.desc}>
                      Seegreen is famous for nature trails in surrounding
                      forests
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-4 col-sm-4">
                <div className={style.main_content}>
                  <div className={style.box}>
                    <div className={style.image}>
                      <Image src={Images.about2} alt="" fill />
                    </div>
                  </div>
                  <div className={style.text}>
                    <h6 className={style.head}>Adventure</h6>
                    <p className={style.desc}>
                      Camping, Trekking, Rafting & Cycling are some of most
                      popular adventure
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-4 col-sm-4">
                <div className={style.main_content}>
                  <div className={style.box}>
                    <div className={style.image}>
                      <Image src={Images.about3} alt="" fill />
                    </div>
                  </div>
                  <div className={style.text}>
                    <h6 className={style.head}>Nature Trails</h6>
                    <p className={style.desc}>
                      Located just 4 kms from the mall road, seegreen is your
                      best base to explore
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-5 pt-5">
              <div className="col-lg-4 col-md-4 col-sm-4">
                <div className={style.main_content}>
                  <div className={style.box}>
                    <div className={style.image}>
                      <Image src={Images.about1} alt="" fill />
                    </div>
                  </div>
                  <div className={style.text}>
                    <h6 className={style.head}>Step Out Side</h6>
                    <p className={style.desc}>
                      For those of you who can bring yourselves to step out of
                      the premises
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-4 col-sm-4">
                <div className={style.main_content}>
                  <div className={style.box}>
                    <div className={style.image}>
                      <Image src={Images.about2} alt="" fill />
                    </div>
                  </div>
                  <div className={style.text}>
                    <h6 className={style.head}>A Day Visit</h6>
                    <p className={style.desc}>
                      A day visit to Dhanaulti is recommended. One can explore
                      this small{" "}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-4 col-sm-4">
                <div className={style.main_content}>
                  <div className={style.box}>
                    <div className={style.image}>
                      <Image src={Images.about3} alt="" fill />
                    </div>
                  </div>
                  <div className={style.text}>
                    <h6 className={style.head}>Photography</h6>
                    <p className={style.desc}>
                      If you have a good camera, you could spot out the Mountain
                      Hawk Eagle
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

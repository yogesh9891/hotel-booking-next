import React, { useState } from "react";
import style from "@/app/(WithHeaderAndFooter)/Blogs/Blogs.module.scss";
import Image from "next/image";
import { Images } from "@/assets/Utility/Images";
import Link from "next/link";
import { FaCalendarDays } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
// import blog1 from "@/assets/images/blog.webp";
// import blog2 from "@/assets/images/recent_blog1.webp";
// import blog3 from "@/assets/images/recent_blog2.webp";
// import blog4 from "@/assets/images/recent_blog3.webp";
// import blog5 from "@/assets/images/recent_blog4.webp";
import { getBlogApi } from "@/service/home.service";
import { generateFilePath } from "@/lib/axios";
// import image from "@/assets/images/image.webp";

const handlegetBlog = async () => {
  try {
    let { data: res } = await getBlogApi("");
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};


const handlegetMustRaedBlog = async () => {
  try {
    let { data: res } = await getBlogApi("read=true");
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default async function page() {
  let blogs = await handlegetBlog();
  let singleBlog = blogs?.length > 0 ? blogs[0] : []
  blogs = blogs.filter((el: any, i: number) => i > 0);
  let mustRead = await handlegetMustRaedBlog();


  return (
    <div className={style.blogs_sec}>
      <div className="container">
        <div className="row">
          {
            singleBlog && singleBlog?._id && (
              <div className="col-xl-8 col-lg-8 col-md-12  ">
                <div className={style.latest_blog}>
                  <div className={style.image}>
                    <Link href={`/BlogDetail/${singleBlog.slug}`}>
                      <Image src={generateFilePath(singleBlog?.image)} alt="" fill />
                    </Link>
                  </div>

                  <div className={style.content}>
                    <div className={style.top_sec}>
                      <div className={style.date}>
                        <FaCalendarDays />
                        {new Date(singleBlog?.createdAt).toDateString()}
                      </div>

                      <div className={style.view}>
                        <FaRegUser />
                        {singleBlog?.author}
                      </div>
                    </div>

                    <Link href={`/BlogDetail/${singleBlog.slug}`}>
                      <h6 className={style.heading}>
                        {singleBlog?.title}
                      </h6>
                    </Link>
                    <p className={style.para} dangerouslySetInnerHTML={{ __html: (singleBlog?.description.substring(0, 200)) }}></p>

                    <Link href={`/BlogDetail/${singleBlog.slug}`} className={`${style.btn1} btn`}>
                      Read More
                    </Link>
                  </div>
                </div>

                <div className={`row ${style.mt_5}`}>
                  {blogs &&
                    blogs?.length &&
                    blogs?.map((el: any, i: number) => (
                      <div className="col-lg-6 col-md-6 col-sm-6" key={i}>
                        <div className={style.blogs}>
                          <div className={style.image}>
                            <Link href={`/BlogDetail/${el.slug}`}>
                              <Image
                                src={generateFilePath(el.image)}
                                alt=""
                                fill
                                priority
                              />
                            </Link>
                          </div>

                          <div className={style.content}>
                            <div className={style.top_sec}>
                              <div className={style.date}>
                                <FaCalendarDays />
                                {new Date(el?.createdAt).toDateString()}
                              </div>

                              <div className={style.view}>
                                <FaRegUser />
                                {el?.author}
                              </div>
                            </div>

                            <Link href={`/BlogDetail/${el.slug}`}>
                              <h6 className={style.heading}>{el?.title}</h6>
                            </Link>
                            <p className={style.para} dangerouslySetInnerHTML={{ __html: (el?.description.substring(0, 200)) }}></p>

                            <Link
                              href={`/BlogDetail/${el.slug}`}
                              className={`${style.btn1} btn`}
                            >
                              Read More
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )
          }


          <div className="col-xl-4 col-lg-4 col-md-12 ">
            <div className={`${style.must_sec} sticky-top`}>
              <h6 className={style.title}>Must Reads</h6>

              <div className="row">
                {mustRead &&
                  mustRead?.length &&
                  mustRead?.map((ele: any, ind: number) => (
                    <div className="col-lg-12 col-md-6 col-sm-12" key={ind}>
                      <div className={style.main_content}>
                        <div className={style.image}>
                          <Link href={`/BlogDetail/${ele.slug}`}>
                            <Image src={generateFilePath(ele.image)} alt="" fill />
                          </Link>
                        </div>
                        <p className={style.number}> {new Date(ele?.createdAt).toDateString()}</p>
                        <Link href={`/BlogDetail/${ele.slug}`}>
                          <p className={style.head}>{ele?.title}</p>
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}

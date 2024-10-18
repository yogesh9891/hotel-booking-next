"use client";

import React, { useEffect, useState } from "react";
import style from "@/app/(WithHeaderAndFooter)/BlogDetail/[slug]/BlogDetail.module.scss";
// import blogdetail1 from "@/assets/images/blogdetail1.webp";
import Image from "next/image";
import { Images } from "@/assets/Utility/Images";
import Link from "next/link";
// import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";
// import recent1 from "@/assets/images/recent1.webp";
import { getBlogApi, getBlogBySlugApi } from "@/service/home.service";
import { generateFilePath } from "@/lib/axios";
// import image from "@/assets/images/image.webp";

export default function page(props: any) {
  const [blogObj, setblogObj] = useState<any>();
  const [blogArr, setblogArr] = useState([]);

  useEffect(() => {
    if (props.params && props.params.slug) {
      handleGetBlogBySlug(props.params.slug);
    }
  }, [props]);

  const handleGetBlogBySlug = async (slug: string) => {
    try {
      let { data: res } = await getBlogBySlugApi(slug);
      if (res?.data) {
        setblogObj(res.data);
        if(res.data && res.data?.blogCategoryId){
        await handlegetMustRaedBlog(res.data?.blogCategoryId,res.data?._id)

        }
      }
    } catch (error) {}
  };

  
const handlegetMustRaedBlog = async (categoryId:string,blogid:string) => {
  try {
    let { data: res } = await getBlogApi(`blogCategoryId=${categoryId}`);
    if (res.data) {
      setblogArr(res.data.filter((el:any) => el._id != blogid));
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};


  return (
    <>
      <div className={style.detail_page}>
        <div className={style.image}>
          <Image src={generateFilePath(blogObj?.image)} alt="" fill />
        </div>
        <h2 className={style.heading}>{blogObj?.title}</h2>
      </div>

      <div className={style.content_sec}>
        <div className="container">
          <div className="row">
            <div className="col-xl-9 col-lg-9 col-md-8 ">
              <div className={style.content}>
                <div className={style.top_sec}>
                  <div className={style.name_info}>
                    <div className={style.image}>
                      <Image src={Images.profile} alt="" fill />
                    </div>
                    <div className={style.text}>By: {blogObj?.author}</div>
                  </div>
                  <span className={style.date}>
                    {new Date(blogObj?.createdAt).toDateString()}
                  </span>
                </div>

                <div className={style.main_content}>
                  <p
                    className={style.para}
                    dangerouslySetInnerHTML={{
                      __html: blogObj?.description,
                    }}
                  ></p>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-3 col-md-4">
              <div className={`${style.recent_blog} sticky-top`}>
                <h6 className={style.head}>Recent Blog</h6>

                {blogArr &&
                  blogArr?.length &&
                  blogArr?.map((el:any, iin:number) => (
                    <div className={`${style.blogs} ${style.mt_4}`} key={iin}>
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
                      <Link href={`/BlogDetail/${el.slug}`}>
                          <p className={style.heading}>{el?.title}</p>
                        </Link>
                        <div className={style.bottom1}>
                          <div className={style.info}>
                            <MdOutlineRemoveRedEye />
                            <span className={style.text}>
                            {new Date(el?.createdAt).toDateString()}
                            </span>
                          </div>
                          <div className={style.info}>
                            <BiCommentDetail />
                            <span className={style.text}>
                              {el?.author} 
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

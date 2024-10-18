"use client"
import { getSettingApi } from "@/service/setting.service";
import React, { useEffect, useState } from "react";

const Analytics = () => {
  const [analyticsObj, setAnalyticsObj] = useState({
    facebookCode: "433213676354939",
    googleCode: "G-3DYNVKFE7X",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data: res } = await getSettingApi();
        if (res?.data?.data) {
          setAnalyticsObj(res.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <>
      <noscript>
        <img
          height="1"
          width="1"
          src={`https://www.facebook.com/tr?id=${analyticsObj.facebookCode}&ev=PageView&noscript=1`}
        />
      </noscript>
      <script src={`https://www.googletagmanager.com/gtag/js?id=${analyticsObj.googleCode}`}></script>
      <script
        id="3DYNVKFE7X"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${analyticsObj.googleCode}');`,
        }}
      />
      <script
        id="433213676354939"
        dangerouslySetInnerHTML={{
          __html: `<!-- Meta Pixel Code -->
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${analyticsObj.facebookCode}');
                fbq('track', 'PageView');
                <!-- End Meta Pixel Code -->`,
        }}
      />
    </>
  );
};

export default Analytics;

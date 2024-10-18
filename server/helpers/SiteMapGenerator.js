import builder from 'xmlbuilder';
import fs from "fs"
import blog from "../models/blog.model";
import moment from 'moment/moment';

export const generateSiteMapFile = async () => {

    var feedObj = {
        'urlset': {
            '@xmlns': "https://www.sitemaps.org/schemas/sitemap/0.9",
            'url': [ {
                "loc":"https://sundaysforever.com/",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/about-us",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/Blogs",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/Contact",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/location/luxury-hotels-homestays-in-chail",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/location/luxury-hotels-homestays-in-jaipur",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/location/luxury-hotels-homestays-in-shimla",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/location/luxury-hotels-homestays-in-dehradun",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/location/luxury-hotels-homestays-in-goa",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/location/luxury-hotels-homestays-in-mussoorie",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/location/luxury-hotels-homestays-in-leh-ladakh",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/location/luxury-hotels-homestays-in-ajmer-rajasthan",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/location/luxury-hotels-homestays-in-bhimtal",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/PropertyListing",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/Faq",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/Testimonials",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/Privacy-Policy",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/Terms",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/Cancellation-Policy",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/collection/pet-friendly",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/collection/senior-citizen-friendly",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/collection/beach-houses",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
               
                {
                "loc":"https://sundaysforever.com/collection/family-getaways",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/collection/romantic-hideaways",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/collection/couple-friendly",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/collection/heritage-properties",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/collection/newly-launched",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/collection/budget-friendly-homes",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/collection/our-premium-properties",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/collection/estates",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/property/kings-cottage",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/property/hill-top-cottage",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/property/barlows-cottage",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/property/readers-cottage",
               
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/property/thistle-house",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/property/thistle-house-first-floor",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/property/thistle-house-ground-floor",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/property/wildflower-1-bedroom-cottage",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/property/wildflower-2-bedroom-cottage",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/property/wildflower-3-bedroom-cottage",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/property/slice-of-heaven",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/property/anjuna-house",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/property/villa-101-m",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/property/sundays-forever-144",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/property/sundays-forever-124",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/property/sundays-forever-127",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
              
                {
                "loc":"https://sundaysforever.com/property/sundays-forever-129-suite-room",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/property/sundays-forever-129",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/property/fern-cottage",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
                {
                "loc":"https://sundaysforever.com/property/petal-cottage",
                "lastmod":`${moment(new Date()).format()}`,
                 'changefreq':'daily',
                
               
                },
            ]
        }
    }

    // let preDefinedObj  = [
    //          {
    //         "loc":"https://sundaysforever.com/",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/our-hotels",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/our-homestays",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/about-us",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/Blogs",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/Contact",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/location/luxury-hotels-homestays-in-chail",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/location/luxury-hotels-homestays-in-jaipur",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/location/luxury-hotels-homestays-in-shimla",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/location/luxury-hotels-homestays-in-dehradun",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/location/luxury-hotels-homestays-in-goa",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/location/luxury-hotels-homestays-in-mussoorie",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/location/luxury-hotels-homestays-in-leh-ladakh",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/location/luxury-hotels-homestays-in-ajmer-rajasthan",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/location/luxury-hotels-homestays-in-bhimtal",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/PropertyListing",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/Faq",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/Testimonials",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/Privacy-Policy",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/Terms",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/Cancellation-Policy",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/collection/pet-friendly",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/collection/senior-citizen-friendly",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/collection/beach-houses",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/collection/family-getaways",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/collection/family-getaways",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/collection/romantic-hideaways",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/collection/couple-friendly",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/collection/heritage-properties",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/collection/newly-launched",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/collection/budget-friendly-homes",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/collection/our-premium-properties",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/collection/estates",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/collection/estates",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/blog/5-reasons-to-choose-a-homestay-for-your-next-vacation",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/blog/importance-of-supporting-local-communities-through-homestay-travel",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/blog/how-to-choose-the-right-homestay-for-your-needs",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/blog/goa-a-whole-new-side",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/blog/bhimtal-a-serene-hill-station-in-uttarakhand",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/blog/sustainable-travel-gear-essential-items-for-eco-friendly-travel",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/blog/the-ultimate-guide-to-budget-travel-in-india",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/blog/the-ultimate-guide-to-the-holi-festival-celebrating-the-festival-of-colors-in-india",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/blog/discovering-indias-hidden-gem-the-hampi-ruinsa",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/blog/shashvat-kings-cottage-mussoorie",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/blog/the-ultimate-guide-to-the-spice-trail-of-kerala",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/blog/naveen-talwar-shared-his-beautiful-experience-with-sundays-forever",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/blog/discovering-the-unique-customs-and-beliefs-of-indias-local-communities",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/blog/sipping-on-indias-traditional-drinks-from-chai-to-lassi",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/blog/from-fear-to-fervor-how-these-travelers-overcame-their-travel-anxiety",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/property/kings-cottage",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/property/hill-top-cottage",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/property/barlows-cottage",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/property/readers-cottage",
           
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/property/thistle-house",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/property/thistle-house-first-floor",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/property/thistle-house-ground-floor",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/property/wildflower-1-bedroom-cottage",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/property/wildflower-2-bedroom-cottage",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/property/wildflower-3-bedroom-cottage",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/property/slice-of-heaven",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/property/anjuna-beach-house",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/property/villa-101-m",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/property/sundays-forever-144",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/property/sundays-forever-124",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/property/sundays-forever-127",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/property/sundays-forever-128",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/property/sundays-forever-129-suite-room",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/property/sundays-forever-129",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/property/fern-cottage",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
    //         {
    //         "loc":"https://sundaysforever.com/property/petal-cottage",
    //         "lastmod":`${moment(new Date()).format()}`,
    
    
    //        
    //         },
            
    // ]
 
    let blogs = await blog.find().lean().exec();

    
    for (const el of blogs) {
        feedObj.urlset.url.push({
            'loc':`https://sundaysforever.com/blog/${el.slug}`,
            'lastmod': `${moment(el.updatedAt).format()}`,
            'changefreq':'daily'
        })
    }

    var urlset = builder.create(feedObj, { encoding: 'utf-8' })
    console.log(urlset.end({ pretty: true }));
    fs.writeFile(`${process.env.LOCAL_URL}/sitemap.xml`, urlset.toString("base64"), function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });
    // let fs
}
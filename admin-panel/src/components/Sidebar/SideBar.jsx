import React from "react";
import { images } from "../Images/Images";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

function SideBar({ style }) {
  let role = useSelector((state) => state.auth.role);

  let location = useLocation();
  const [sidebar_item, setsidebar_item] = useState([
    {
      isrotated: true,
      active: true,
      name: "dashboard",
      roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
      path: "/",
      icon: "ion-grid",
      children: [],
    },

    {
      isrotated: true,
      active: false,
      name: "Location",
      roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
      path: "/Location/View-Location",
      icon: "fa fa-list",
      children: [],
    },
    {
      isrotated: true,
      active: false,
      name: "Collection",
      roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
      path: "/Collection/View-Collection",
      icon: "fa fa-list",
      children: [],
    },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Location",
    //   roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
    //   path: "/",
    //   icon: "fa-solid fa-location-dot",
    //   children: [
    //     {
    //       name: "Country",
    //       roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
    //       path: "/Location/View-Country",
    //       active: false,
    //     },
    //     {
    //       name: "State",
    //       roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
    //       path: "/Location/View-State",
    //       active: false,
    //     },
    //     {
    //       name: "City",
    //       roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
    //       path: "/Location/View-City",
    //       active: false,
    //     },
    //   ],
    // },
    {
      isrotated: false,
      active: false,
      name: "Amenity category",

      roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
      path: "/Amenities/View-category",
      icon: "fa-solid fa-location-dot",
      children: [
        {
          name: "Amenity category",
          roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
          path: "/Amenities/View-category",
          active: false,
        },
        {
          name: "Amenity",
          roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
          path: "/Amenities/View",
          active: false,
        },
      ],
    },
    // {
    //   isrotated: true,
    //   active: false,
    //   name: "Package",
    //   roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
    //   path: "/Package/View-Package",
    //   icon: "fas fa-umbrella-beach",
    //   children: [],
    // },
    // {
    //   isrotated: true,
    //   active: false,
    //   name: "Property",
    //   roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
    //   path: "/Propertys/View",
    //   icon: "fa-solid fa-hotel",
    //   children: [],
    // },

    {
      isrotated: true,
      active: false,
      name: "Coupon",
      roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
      path: "/Coupon/View-Coupon",
      icon: "fa fa-list",
      children: [],
    },
    {
      isrotated: true,
      active: false,
      name: "Seo",
      roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
      path: "/Seo/View-Seo",
      icon: "fa fa-list",
      children: [],
    },
    {
      isrotated: false,
      active: false,
      name: "Property",
      roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
      path: "/Dashboard",
      icon: "fa-solid fa-users",
      children: [
        // {
        //   name: "Property Sequence",
        //   path: "/Propertys/PropertySequence",
        //   roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
        //   active: false,
        // },
        {
          name: "Hotels",
          path: "/Propertys/View?type=Hotels",
          roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
          active: false,
        },
        {
          name: "Apartments",
          path: "/Propertys/View?type=Home Stays",
          roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
          active: false,
        },
        {
          name: "Property Available",
          path: "Propertys/PropertyAvailable",
          roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
          active: false,
        },
        {
          roleArr: ["ADMIN", "SUBADMIN"],
          name: "Property Review",
          path: "/Review/Product-Review",
          active: false,
        },
      ],
    },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "products",
    //   path: "/Dashboard",
    //   icon: "fa-brands fa-product-hunt",
    //   roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
    //   children: [
    //     {
    //       name: "Category",
    //       roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
    //       path: "/Product/Category",
    //       active: false,
    //     },
    //     {
    //       name: "Brand",
    //       path: "/Product/Brand",
    //       roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
    //       active: false,
    //     },
    //     {
    //       name: "Attribute",
    //       path: "/Product/Attribute",
    //       roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
    //       active: false,
    //     },
    //     {
    //       name: "Add New Product",
    //       path: "/Product/AddProduct",
    //       roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
    //       active: false,
    //     },
    //     // {
    //     //   name: "Bulk Product Upload",
    //     //   path: "/Product/Bulk-Product-Upload",
    //     //   roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
    //     //   active: false,
    //     // },
    //     {
    //       name: "Product List",
    //       path: "/Product/Product-List",
    //       roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
    //       active: false,
    //     },
    //     // {
    //     //   name: "Recent View Config",
    //     //   path: "/Product/Config",
    //     //   active: false,
    //     // },
    //   ],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "shipping",
    //   path: "/Dashboard",
    //   icon: "fa-solid fa-money-bill-1",
    //   children: [
    //     {
    //       name: "Carriers",
    //       path: "/Dashboard",
    //       active: false,
    //     },
    //     {
    //       name: "Shipping Rates",
    //       path: "/Dashboard",
    //       active: false,
    //     },
    //     {
    //       name: "Pickup Locations",
    //       path: "/Dashboard",
    //       active: false,
    //     },
    //     {
    //       name: "Shipping Orders",
    //       path: "/Dashboard",
    //       active: false,
    //     },
    //     {
    //       name: "Configuration",
    //       path: "/Dashboard",
    //       active: false,
    //     },
    //   ],
    // },
    {
      isrotated: false,
      active: false,
      name: "Booking Manage",
      path: "/Dashboard",
      roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
      icon: "ion-android-cart",
      children: [
        {
          name: "Booking",
          path: "/Booking/Total-Booking",
          roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
          active: false,
        },
        // {
        //   name: "Inhouse Orders",
        //   path: "/Order/Inhouse-Order",
        //   roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
        //   active: false,
        // },
        // {
        //   name: "delivery Process",
        //   path: "/Order/Delivery-Process",
        //   roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
        //   active: false,
        // },
        // {
        //   name: "Cancel Reason",
        //   path: "/Order/Cancle-Reason",
        //   roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
        //   active: false,
        // },
        // {
        //   name: "Track order Config",
        //   path: "/Order/Track-Order",
        //   roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
        //   active: false,
        // },
      ],
    },

    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Users",
    //   path: "/Dashboard",
    //   icon: "fa-solid fa-users",
    //   roleArr: ["ADMIN", "SUBADMIN"],
    //   children: [
    //     {
    //       name: "All Users",
    //       path: "/User-list",
    //       roleArr: ["ADMIN", "SUBADMIN"],
    //       active: false,
    //     },
    //     {
    //       name: "Customer KYC",
    //       path: "/Customer/KYC",
    //       active: false,
    //     },
    //   ],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Refund Manage",
    //   path: "/",
    //   icon: "ion-android-cart",
    //   children: [
    //     {
    //       name: "Refund Requests",
    //       path: "/Refund-Manage/Refund-Request",
    //       active: false,
    //     },
    //     {
    //       name: "Reasons",
    //       path: "/Refund-Manage/Reason",
    //       active: false,
    //     },
    //     {
    //       name: "Refund Process",
    //       path: "/Refund-Manage/Refund-Process",
    //       active: false,
    //     },
    //     {
    //       name: "Configuration",
    //       path: "/Refund-Manage/Refund-Config",
    //       active: false,
    //     },
    //   ],
    // },
    {
      isrotated: false,
      active: false,
      name: "Frontend CMS",
      path: "/Dashboard",
      roleArr: ["ADMIN", "SUBADMIN"],
      icon: "fa-solid fa-user",
      children: [
        {
          name: "HomePage",
          path: "/HomePage",
          roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
          active: false,
        },
        {
          name: "Banners",
          path: "/Banners",
          roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
          active: false,
        },
        {
          name: "Testimonial",
          path: "/Testimonial/View-Testimonial",
          roleArr: ["ADMIN", "SUBADMIN"],
          active: false,
        },
        // {
        //   name: "Gallery",
        //   path: "/Gallery/View-Gallery",
        //   roleArr: ["ADMIN", "SUBADMIN"],
        //   active: false,
        // },
        {
          name: "Home Faq",
          path: "/Faq/Home",
          roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
          active: false,
        },
        {
          name: " Property Listing Faq",
          path: "/Faq/PropertyListing",
          roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
          active: false,
        },
      ],
    },
    {
      isrotated: false,
      active: false,
      name: "Blog",
      roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
      path: "/Dashboard",
      icon: "fa-solid fa-users",
      children: [
        {
          name: "Blog",
          path: "/Blog/post",
          roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
          active: false,
        },
        {
          name: "blog category",
          path: "/Blog/Category",
          roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
          active: false,
        },
      ],
    },
    {
      isrotated: false,
      active: false,
      name: "Property Enquiry",
      roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
      path: "/Property",
      icon: "fa fa-envelope",
      children: [],
    },
    {
      isrotated: false,
      active: false,
      name: "Contact Query",
      roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
      path: "/Contact",
      icon: "fa fa-envelope",
      children: [],
    },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Appearance",
    //   path: "/Dashboard",
    //   icon: "ion-grid",
    //   children: [
    //     {
    //       name: "Menu",
    //       path: "/Menus",
    //       active: false,
    //     },
    //   ],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Contact",
    //   roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
    //   path: "/Contact",
    //   icon: "fa fa-envelope",
    //   children: [],
    // },

    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Booking Enquiry",
    //   roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
    //   path: "/Booking-Enquiry?isBook=true",
    //   icon: "fa fa-envelope",
    //   children: [],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Property",
    //   roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
    //   path: "/Property",
    //   icon: "fa fa-envelope",
    //   children: [],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Settlement Details",
    //   roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
    //   path: "/Settlement-Details",
    //   icon: "fa-solid fa-handshake",
    //   children: [],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Accounts & Ledger",
    //   roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
    //   path: "/Accounts-and-Ledger",
    //   icon: "fa-solid fa-file-invoice-dollar",
    //   children: [],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Blog",
    //   roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
    //   path: "/Dashboard",
    //   icon: "fa-solid fa-users",
    //   children: [
    //     {
    //       name: "Blog",
    //       path: "/Blog/post",
    //       roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
    //       active: false,
    //     },
    //     {
    //       name: "blog category",
    //       path: "/Blog/Category",
    //       roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
    //       active: false,
    //     },
    //   ],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Emails/Newsletters",
    //   roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
    //   path: "/Dashboard",
    //   icon: "fa-solid fa-users",
    //   children: [
    //     {
    //       name: "Email Template",
    //       path: "/Email/post",
    //       roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
    //       active: false,
    //     },
    //     {
    //       name: "Notifications",
    //       path: "/Notification/post",
    //       roleArr: ["ADMIN", "SELLER", "SUBADMIN"],
    //       active: false,
    //     },
    //   ],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Wallet Manage",
    //   path: "/Dashboard",
    //   icon: "fa-solid fa-wallet",
    //   children: [
    //     {
    //       name: "Wallet Recharge",
    //       path: "/Wallet/Recharge",
    //       active: false,
    //     },
    //     {
    //       name: "Configuration",
    //       path: "/Wallet/Configuration",
    //       active: false,
    //     },
    //   ],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Marketing",
    //   path: "/Dashboard",
    //   icon: "fa-solid fa-user",
    //   children: [
    //     {
    //       name: "News Letters",
    //       path: "/Marketing/NewsLetter",
    //       active: false,
    //     },
    //   ],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Review",
    //   roleArr: ["SELLER", "SUBADMIN"],
    //   path: "/Dashboard",
    //   icon: "fa-solid fa-user",
    //   children: [
    //     {
    //       roleArr: ["SELLER", "SUBADMIN"],
    //       name: "Product Review",
    //       path: "/Review/Product-Review",
    //       active: false,
    //     },
    //     {
    //       roleArr: ["SELLER", "SUBADMIN"],
    //       name: "Company Review ",
    //       path: "/Review/Seller-Review",
    //       active: false,
    //     },
    //     {
    //       roleArr: ["SELLER", "SUBADMIN"],
    //       name: "Review Configuration",
    //       path: "/Review/Review-Configuration",
    //       active: false,
    //     },
    //   ],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Settings",
    //   roleArr: ["SELLER", "SUBADMIN"],
    //   path: "/Dashboard",
    //   icon: "fa-solid fa-user",
    //   children: [
    //     {
    //       roleArr: ["SELLER", "SUBADMIN"],
    //       name: "General",
    //       path: "/settings/general",
    //       active: false,
    //     },
    //   ],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Admin Reports",
    //   path: "/",
    //   icon: "ion-ios-folder",
    //   children: [
    //     {
    //       name: "Keywords Search",
    //       path: "/Admin-Reports/User-Searches-Keyword",
    //       active: false,
    //     },
    //     {
    //       name: "Visitor",
    //       path: "/Admin-Reports/Visitor-Report",
    //       active: false,
    //     },
    //     {
    //       name: "Inhouse product sale",
    //       path: "/Admin-Reports/Inhouse-Sale",
    //       active: false,
    //     },
    //     {
    //       name: "Product Stock",
    //       path: "/Admin-Reports/Producte-Stock",
    //       active: false,
    //     },
    //     {
    //       name: "Wishlist",
    //       path: "/Admin-Reports/Wishlist",
    //       active: false,
    //     },
    //     {
    //       name: "Wallet recharge history",
    //       path: "/Admin-Reports/Wallet-Recharge-History",
    //       active: false,
    //     },
    //     {
    //       name: "Top Customers",
    //       path: "/Admin-Reports/Top-Customer",
    //       active: false,
    //     },
    //     {
    //       name: "Top selling item",
    //       path: "/Admin-Reports/Top-Selling-Item",
    //       active: false,
    //     },
    //     {
    //       name: "Order",
    //       path: "/Admin-Reports/Order",
    //       active: false,
    //     },
    //     {
    //       name: "Payment",
    //       path: "/Admin-Reports/Payment-Method",
    //       active: false,
    //     },
    //     {
    //       name: "Product Review",
    //       path: "/Admin-Reports/Product-Review",
    //       active: false,
    //     },
    //     {
    //       name: "Company Review ",
    //       path: "/Admin-Reports/Company-Review",
    //       active: false,
    //     },
    //   ],
    // },
    {
      isrotated: false,
      active: false,
      name: "Contact Request",
      path: "/Dashboard",
      icon: "fa-solid fa-user",
      children: [
        {
          name: "Contact Mail",
          path: "/Contact-Mail",
          active: false,
        },
      ],
    },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Payment Gateways",
    //   path: "/Payment-Gateway",
    //   icon: "fa-solid fa-money-bill-1",
    //   children: [],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "GST/VAT/TAX Setup",
    //   path: "/GST-SETUP",
    //   icon: "ion-settings",
    //   children: [
    //     {
    //       name: "GST/VAT/TAX List",
    //       path: "/GST-SETUP",
    //       active: false,
    //     },
    //     {
    //       name: "Configuration",
    //       path: "/GST-Configuation",
    //       active: false,
    //     },
    //   ],
    // },
    {
      isrotated: false,
      active: false,
      name: "Setup",
      path: "/",
      icon: "ion-settings",
      children: [
        {
          name: "Currency List",
          path: "/SetUp/Currency-List",
          active: false,
        },
        {
          name: "Location",
          path: "/SetUp/Location",
          active: false,
        },
        {
          name: "Tags",
          path: "/SetUp/Tags",
          active: false,
        },
      ],
    },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "System Settings",
    //   path: "/",
    //   icon: "ion-gear-b",
    //   children: [
    //     {
    //       name: "Company Information",
    //       path: "/Company-Information",
    //       active: false,
    //     },
    //   ],
    // },
  ]);

  const isRotating = (i) => {
    let temp_array = sidebar_item.map((el, index) => {
      if (index === i) {
        el.isrotated = !el.isrotated;
        el.active = true;
      } else {
        el.active = false;
      }
      return el;
    });
    setsidebar_item([...temp_array]);
  };

  const childActive = (i) => {
    let temp_array = sidebar_item.map((el, index) => {
      if (el.children && el.children.length > 0) {
        el.children.map((item, childIndex) => {
          if (childIndex === i) {
            item.active = true;
          } else {
            item.active = false;
          }
          return item;
        });
      }
      return el;
    });
    setsidebar_item([...temp_array]);
  };

  return (
    <div id="sidebar">
      <div
        className="main-logo my-3"
        style={style ? { padding: "26px 10px", height: "auto" } : {}}
      >
        {style ? (
          <img src={images?.favicon} alt="" />
        ) : (
          <img style={{ width: 150 }} src={images?.logo} alt="" />
        )}
      </div>
      <ul className="sidebar-menu" id="sidebarMenu">
        {sidebar_item &&
          sidebar_item?.map((item, i) => {
            if (
              typeof array === "undefined" &&
              item?.children &&
              item?.children?.length === 0 &&
              item?.roleArr.some(
                (el) => `${el}`.toLowerCase() == `${role}`.toLowerCase()
              )
            ) {
              return (
                <li key={`sidebar_item_${i}`}>
                  <Link
                    to={item?.path}
                    className={item?.active ? "active" : ""}
                    onClick={() => isRotating(i)}
                  >
                    <i className={item?.icon}></i>
                    {!style && <p className="mb-0">{item?.name}</p>}
                  </Link>
                </li>
              );
            } else {
              if (
                item?.roleArr &&
                item?.roleArr?.length > 0 &&
                item?.roleArr.some(
                  (el) => `${el}`.toLowerCase() == `${role}`.toLowerCase()
                )
              ) {
                return (
                  <li key={`sidebar_item_${i}`}>
                    <Link
                      to={`#sidebar_item_children_${i}`}
                      className={
                        item?.active || location === item?.path ? "active" : ""
                      }
                      data-bs-toggle="collapse"
                      aria-expanded={item?.active}
                      aria-controls={`sidebar_item_children_${i}`}
                      role="button"
                      onClick={() => isRotating(i)}
                    >
                      <i className={item.icon}></i>
                      {!style && (
                        <p className="mb-0">
                          {item?.name}
                          {item?.isrotated ? (
                            <i className="ion-arrow-up-b pe-3"></i>
                          ) : (
                            <i className="ion-arrow-down-b pe-3"></i>
                          )}
                        </p>
                      )}
                    </Link>
                    {!style && (
                      <ul
                        className="collapse"
                        id={`sidebar_item_children_${i}`}
                        data-bs-parent="#sidebarMenu"
                      >
                        {item?.children?.map((child, index) => {
                          if (
                            child?.roleArr &&
                            child?.roleArr?.length > 0 &&
                            child?.roleArr?.some(
                              (el) =>
                                `${el}`?.toLowerCase() ==
                                `${role}`?.toLowerCase()
                            )
                          ) {
                            return (
                              <li key={`${child?.name}_${index}`}>
                                <Link
                                  to={child?.path}
                                  className={
                                    child?.active || location === child?.path
                                      ? "active"
                                      : ""
                                  }
                                  onClick={() => childActive(index)}
                                >
                                  {child?.name}
                                </Link>
                              </li>
                            );
                          }
                        })}
                      </ul>
                    )}
                  </li>
                );
              }
            }
          })}
      </ul>
    </div>
  );
}

export default SideBar;

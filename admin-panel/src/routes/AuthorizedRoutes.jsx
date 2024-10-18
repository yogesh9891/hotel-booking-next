import { Route, Routes } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../assets/scss/main.css";
import Profile from "../components/Admin/Profile";
import AddBlog from "../components/Blog/AddBlog";
import Blog from "../components/Blog/Blog";
import BlogCategory from "../components/Blog/BlogCategory";
import ShowBlog from "../components/Blog/ShowBlog";
import CompanyInfo from "../components/CompanyInfo/CompanyInfo";
import ContactMail from "../components/ContactMail/ContactMail";
import ShowContact from "../components/ContactMail/ShowContact";
import AddCustomer from "../components/Customer/AddCustomer";
import Customer from "../components/Customer/Customer";
import ProductDetail from "../components/Customer/CustomerDetail";
import Dashboard from "../components/dashboard/Dashboard";
import AddEmailTemplate from "../components/EmailTemplate/AddEmailTemplate";
import EmailTemplate from "../components/EmailTemplate/EmailTemplate";
import AddBanner from "../components/Frontend-CMS/Banners/AddBanner";
import Banners from "../components/Frontend-CMS/Banners/Banners";
import AddContactInfo from "../components/Frontend-CMS/ContactInfo/AddContactInfo";
import ContactInfo from "../components/Frontend-CMS/ContactInfo/ContactInfo";
import AddFaq from "../components/Frontend-CMS/FAQ/AddFaq";
import Faq from "../components/Frontend-CMS/FAQ/Faq";
import AddLogo from "../components/Frontend-CMS/Logo/AddLogo";
import Logo from "../components/Frontend-CMS/Logo/Logo";
import AddPrivacy from "../components/Frontend-CMS/PrivacyPolicy/AddPrivacy";
import Privacy from "../components/Frontend-CMS/PrivacyPolicy/Privacy";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import AddMenu from "../components/Menus/AddMenu";
import EditMenu from "../components/Menus/EditMenu";
import MenuItem from "../components/Menus/MenuItem";
import Menus from "../components/Menus/Menus";
import CancleReason from "../components/Order/CancleReason/CancleReason";
import DeliveryProcess from "../components/Order/DeliveryProcess/DeliveryProcess";
import SaleDetail from "../components/Order/Detail/SaleDetail";
import InHouse from "../components/Order/InhouseOrder/Inhouse";
import TotalOrder from "../components/Order/TotalOrder/TotalOrder";
import TrackOrder from "../components/Order/TrackOrder/TrackOrder";
import PaymentGateway from "../components/PaymentGateway/PaymentGateway";
import AddProduct from "../components/Products/AddProduct/AddProduct";
import Attribute from "../components/Products/Attribute/Attribute";
import AttributeValue from "../components/Products/Attribute/AttributeValue";
import AddBrand from "../components/Products/Brand/AddBrand";
import Brand from "../components/Products/Brand/Brand";
import BulkBrandUpload from "../components/Products/Brand/BulkBrandUpload";
import BulkProductUpload from "../components/Products/BulkProductUpload";
import BulkCategoryUpload from "../components/Products/Category/BulkCategoryUpload";
import Category from "../components/Products/Category/Category";
import Config from "../components/Products/Config";
import ProductList from "../components/Products/ProductList";
import ProductReview from "../components/Review/ProductReview";
import ReviewConfig from "../components/Review/ReviewConfig";
import SellerReview from "../components/Review/SellerReview";
import AddCurrency from "../components/SetUp/CurrencyList/AddCurrency";
import CurrencyList from "../components/SetUp/CurrencyList/CurrencyList";
import Location from "../components/SetUp/Location/Location";
import Tags from "../components/SetUp/Tags/Tags";
import SideBar from "../components/Sidebar/SideBar";
import GstConfig from "../components/Tax/GstConfig";
import GstSetup from "../components/Tax/GstSetup";
import AddUser from "../components/Users/AddUser";
import EditUser from "../components/Users/EditUser";
import UserDetail from "../components/Users/UserDetail";
import User from "../components/Users/Users";

import AccountsLedger from "../components/AccountsLedger/AccountsLedger";
import AddAmenityCategory from "../components/Amenities/AmenitiesCategory/AddAmenityCategory";
import ViewAmenityCategory from "../components/Amenities/AmenitiesCategory/ViewAmenityCategory";
import AddAmenity from "../components/Amenities/Amenity/AddAmenity";
import ViewAmenity from "../components/Amenities/Amenity/ViewAmenity";
import SettlementDetails from "../components/dashboard/SettlementDetails";
import NotificationsAdd from "../components/EmailTemplate/AddNotifications";
import NotificationsView from "../components/EmailTemplate/Notifications";
import AddCity from "../components/Location/City/AddCity";
import ViewCity from "../components/Location/City/ViewCity";
import AddCountry from "../components/Location/Country/AddCountry";
import ViewCountry from "../components/Location/Country/ViewCountry";
import AddState from "../components/Location/State/AddState";
import ViewState from "../components/Location/State/ViewState";
import CloneGeneralProduct from "../components/Products/AddProduct/CloneProduct";
import UpdateProductListPage from "../components/Products/AddProduct/UpdateProductListPage";
import GeneralSettings from "../components/SelllerSettings/GeneralSettings";
// import ViewWareHouse from "../components/WareHouse/ViewWareHouse";
// import AddWareHouse from "../components/WareHouse/AddWareHouse";
import AddHotel from "../components/Hotels/AddHotel";
import EditHotel from "../components/Hotels/EditHotel";
import ViewHotels from "../components/Hotels/ViewHotels";
import ViewRooms from "../components/Hotels/Rooms/ViewRooms";
import AddRoom from "../components/Hotels/Rooms/AddRoom";
import AddPackage from "../components/Package/AddPackage";
import ViewPackage from "../components/Package/ViewPackage";
import ViewLocation from "../components/Location/Location/ViewLocation";
import AddLocation from "../components/Location/Location/AddLocation";
import ViewCollection from "../components/Collection/ViewCollection";
import AddCollection from "../components/Collection/AddCollection";
import ViewTestimonial from "../components/Testimonial/ViewTestimonial";
import AddTestimonial from "../components/Testimonial/AddTestimonial";
import HomePage from "../components/Frontend-CMS/HomePage/HomePage";
import ViewCoupon from "../components/Coupon/ViewCoupon";
import AddCoupon from "../components/Coupon/AddCoupon";
import HotelAvailable from "../components/Hotels/HotelAvailable/HotelAvailable";
import AddHotelAvailable from "../components/Hotels/HotelAvailable/AddHotelAvailable";
import AddGallery from "../components/Gallery/AddGallery";
import ViewGallery from "../components/Gallery/ViewGallery";
import Property from "../components/Property/Property";
import PropertyInfo from "../components/Property/PropertyInfo";
import ViewSeo from "../components/Seo/ViewSeo";
import AddSeo from "../components/Seo/AddSeo";
import HotelSequence from "../components/Hotels/HotelSequence";
import PendingOrder from "../components/Order/TotalOrder/PendingOrder";
import AddReview from "../components/Review/AddReview.jsx";

export default function AuthorizedRoutes() {
  return (
    <section className="body_bg">
      <div className="row g-0">
        <div className="col-12 col-md-2" style={{ contain: "content" }}>
          <SideBar />
        </div>
        <div
          className="col-12 col-md-10"
          style={{ height: "100vh", overflow: "hidden scroll" }}
        >
          <Header />
          <Routes>
            <Route exact path="/" element={<Dashboard />}></Route>
            <Route
              exact
              path="/Settlement-Details"
              element={<SettlementDetails />}
            ></Route>
            <Route
              exact
              path="/Location/View-State"
              element={<ViewState />}
            ></Route>
            <Route
              exact
              path="/Location/Add-State"
              element={<AddState />}
            ></Route>
            <Route
              exact
              path="/Location/View-City"
              element={<ViewCity />}
            ></Route>
            <Route
              exact
              path="/Location/Add-City"
              element={<AddCity />}
            ></Route>
            <Route
              exact
              path="/Location/View-Location"
              element={<ViewLocation />}
            ></Route>
            <Route
              exact
              path="/Location/Add-Location"
              element={<AddLocation />}
            ></Route>
            <Route
              exact
              path="/Collection/View-Collection"
              element={<ViewCollection />}
            ></Route>
            <Route
              exact
              path="/Collection/Add-Collection"
              element={<AddCollection />}
            ></Route>
            <Route
              exact
              path="/Package/View-Package"
              element={<ViewPackage />}
            ></Route>
            <Route
              exact
              path="/Package/Add-Package"
              element={<AddPackage />}
            ></Route>
            <Route
              exact
              path="/Testimonial/View-Testimonial"
              element={<ViewTestimonial />}
            ></Route>
            <Route
              exact
              path="/Testimonial/Add-Testimonial"
              element={<AddTestimonial />}
            ></Route>
            <Route
              exact
              path="/Gallery/View-Gallery"
              element={<ViewGallery />}
            ></Route>
            <Route
              exact
              path="/Gallery/Add-Gallery"
              element={<AddGallery />}
            ></Route>
            <Route
              exact
              path="/Propertys/View"
              element={<ViewHotels />}
            ></Route>
            <Route exact path="/Propertys/Add" element={<AddHotel />}></Route>
            <Route
              exact
              path="/Propertys/PropertySequence"
              element={<HotelSequence />}
            ></Route>
            <Route
              exact
              path="/Propertys/Edit/:id"
              element={<EditHotel />}
            ></Route>
            <Route
              exact
              path="/Propertys/AddRoom/:id"
              element={<AddRoom />}
            ></Route>
            <Route
              exact
              path="/Propertys/ViewRoom/:id"
              element={<ViewRooms />}
            ></Route>
            <Route
              exact
              path="/Propertys/PropertyAvailable"
              element={<HotelAvailable />}
            ></Route>
            <Route
              exact
              path="/Propertys/AddPropertyAvailable"
              element={<AddHotelAvailable />}
            ></Route>

            <Route
              exact
              path="/Coupon/View-Coupon"
              element={<ViewCoupon />}
            ></Route>
            <Route
              exact
              path="/Coupon/Add-Coupon"
              element={<AddCoupon />}
            ></Route>

            <Route exact path="/Seo/View-Seo" element={<ViewSeo />}></Route>
            <Route exact path="/Seo/Add-Seo" element={<AddSeo />}></Route>

            <Route
              exact
              path="/Amenities/View"
              element={<ViewAmenity />}
            ></Route>
            <Route exact path="/Amenities/Add" element={<AddAmenity />}></Route>
            <Route
              exact
              path="/Amenities/Add-category"
              element={<AddAmenityCategory />}
            ></Route>
            <Route
              exact
              path="/Amenities/View-category"
              element={<ViewAmenityCategory />}
            ></Route>

            <Route
              exact
              path="/Accounts-and-Ledger"
              element={<AccountsLedger />}
            ></Route>
            <Route exact path="/Category" element={<Category />}></Route>
            <Route exact path="/Product/Brand" element={<Brand />}></Route>
            <Route
              exact
              path="/Product/clone-Product"
              element={<CloneGeneralProduct />}
            ></Route>
            <Route
              exact
              path="/Product/Brand-Create"
              element={<AddBrand />}
            ></Route>
            <Route
              exact
              path="/Product/Update-Product"
              element={<UpdateProductListPage />}
            ></Route>
            <Route
              exact
              path="/Product/Attribute"
              element={<Attribute />}
            ></Route>
            <Route
              exact
              path="/Product/Attribute-Value"
              element={<AttributeValue />}
            ></Route>
            <Route
              exact
              path="/Product/AddProduct"
              element={<AddProduct />}
            ></Route>
            <Route
              exact
              path="/Product/Bulk-Product-Upload"
              element={<BulkProductUpload />}
            ></Route>
            <Route
              exact
              path="/Product/Bulk-Category-Upload"
              element={<BulkCategoryUpload />}
            ></Route>
            <Route
              exact
              path="/Product/Bulk-Brand-Upload"
              element={<BulkBrandUpload />}
            ></Route>
            <Route
              exact
              path="/Product/Product-List"
              element={<ProductList />}
            ></Route>
            <Route exact path="/Product/Config" element={<Config />}></Route>
            <Route exact path="/Admin/Profile" element={<Profile />}></Route>
            <Route exact path="/Blog/post" element={<Blog />}></Route>
            <Route exact path="/Blog/post/create" element={<AddBlog />}></Route>
            <Route exact path="/Email/post" element={<EmailTemplate />}></Route>
            <Route
              exact
              path="/Email/post/create"
              element={<AddEmailTemplate />}
            ></Route>
            <Route
              exact
              path="/Notification/post"
              element={<NotificationsView />}
            ></Route>
            <Route
              exact
              path="/Notification/post/create"
              element={<NotificationsAdd />}
            ></Route>
            <Route
              exact
              path="/Blog/Category"
              element={<BlogCategory />}
            ></Route>
            <Route exact path="/Blog/View-Post" element={<ShowBlog />}></Route>
            <Route
              exact
              path="/Booking/Total-Booking"
              element={<PendingOrder />}
            ></Route>
            <Route
              exact
              path="/Order/Inhouse-Order"
              element={<InHouse />}
            ></Route>
            <Route
              exact
              path="/Order/Delivery-Process"
              element={<DeliveryProcess />}
            ></Route>
            <Route
              exact
              path="/Order/Cancle-Reason"
              element={<CancleReason />}
            ></Route>
            <Route
              exact
              path="/Order/Track-Order"
              element={<TrackOrder />}
            ></Route>
            <Route
              exact
              path="/Order/Sale-Detail"
              element={<SaleDetail />}
            ></Route>
            <Route exact path="/Contact" element={<ContactMail />}></Route>
            <Route
              exact
              path="/Booking-Enquiry"
              element={<ContactMail />}
            ></Route>
            <Route exact path="/Contact-Info" element={<ShowContact />}></Route>
            <Route exact path="/Property" element={<Property />}></Route>
            <Route
              exact
              path="/Property-Info/:id"
              element={<PropertyInfo />}
            ></Route>
            <Route
              exact
              path="/Review/Product-Review"
              element={<ProductReview />}
            ></Route>
            <Route
              exact
              path="/Review/Add-Review"
              element={<AddReview />}
            ></Route>
            <Route
              exact
              path="/Review/Seller-Review"
              element={<SellerReview />}
            ></Route>
            <Route
              exact
              path="/Review/Review-Configuration"
              element={<ReviewConfig />}
            ></Route>
            <Route
              exact
              path="/settings/general"
              element={<GeneralSettings />}
            ></Route>
            <Route
              exact
              path="/Company-Information"
              element={<CompanyInfo />}
            ></Route>
            <Route exact path="/Menus" element={<Menus />}></Route>
            <Route
              exact
              path="/Menus/Menus-Create"
              element={<AddMenu />}
            ></Route>
            <Route
              exact
              path="/Menus/Menus-Edit"
              element={<EditMenu />}
            ></Route>
            <Route
              exact
              path="/Menus/Menus-Item"
              element={<MenuItem />}
            ></Route>
            <Route
              exact
              path="/Payment-Gateway"
              element={<PaymentGateway />}
            ></Route>
            <Route exact path="/GST-SETUP" element={<GstSetup />}></Route>
            <Route
              exact
              path="/GST-Configuation"
              element={<GstConfig />}
            ></Route>
            <Route exact path="/Customer-list" element={<Customer />}></Route>
            <Route
              exact
              path="/Customer-Create"
              element={<AddCustomer />}
            ></Route>
            <Route
              exact
              path="/Customer-Detail"
              element={<ProductDetail />}
            ></Route>
            <Route exact path="/User-list" element={<User />}></Route>
            <Route
              exact
              path="/User/User-edit/:id"
              element={<EditUser />}
            ></Route>
            <Route exact path="/User-Create" element={<AddUser />}></Route>
            <Route exact path="/User-Detail" element={<UserDetail />}></Route>
            <Route exact path="/Banners" element={<Banners />}></Route>
            <Route
              exact
              path="/Banners/Banner-Create"
              element={<AddBanner />}
            ></Route>

            <Route exact path="/Logo" element={<Logo />}></Route>
            <Route exact path="/Logo/Logo-Create" element={<AddLogo />}></Route>
            <Route exact path="/HomePage" element={<HomePage />}></Route>
            <Route exact path="/ContactInfo" element={<ContactInfo />}></Route>
            <Route
              exact
              path="/Contact-Info/Contact-Info-Create"
              element={<AddContactInfo />}
            ></Route>
            <Route exact path="/Faq/:type" element={<Faq />}></Route>
            <Route
              exact
              path="/Faq/:type/Faq-Create"
              element={<AddFaq />}
            ></Route>
            <Route exact path="/PrivacyPolicy" element={<Privacy />}></Route>
            <Route
              exact
              path="/PrivacyPolicy/PrivacyPolicy-Create"
              element={<AddPrivacy />}
            ></Route>

            <Route
              exact
              path="/SetUp/Currency-List"
              element={<CurrencyList />}
            ></Route>
            <Route
              exact
              path="/SetUp/Currency-Create"
              element={<AddCurrency />}
            ></Route>
            <Route exact path="/SetUp/Location" element={<Location />}></Route>
            <Route exact path="/SetUp/Tags" element={<Tags />}></Route>
          </Routes>
          <Footer />
        </div>
      </div>
    </section>
  );
}

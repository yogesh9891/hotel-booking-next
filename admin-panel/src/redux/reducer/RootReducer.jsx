import { combineReducers } from "redux";

import { authReducer } from "./auth/auth.reducer";
import { BrandReducer } from "./Brand/Brand.reducer";
import { TaxReducer } from "./Tax/Tax.reducer";
import { BannerReducer } from "./Banner/Branner.reducer";
import { userReducer } from "./Users/users.reducer";
import { AttributeReducer } from "./Attribute/Attribute.reducer";
import { CategoryReducer } from "./Category/Category.reducer";
import { ProductReducer } from "./Product/Product.reducer";
import { stateReducer } from "./State/States.reducer";
import { cityReducer } from "./City/City.reducer";
import { countryReducer } from "./Country/Country.reducer";
import { packageReducer } from "./Package/Package.reducer";
import { AmenityCategoryReducer } from "./AmenityCategory/AmenityCategory.reducer";
import { AmenityReducer } from "./Amenity/Amenity.reducer";
import { HotelReducer } from "./Hotel/Hotel.reducer";
import { locationReducer } from "./Location/Location.reducer";
import { collectionReducer } from "./Collection/Collection.reducer";
import { testimonialReducer } from "./Testimonial/Testimonial.reducer";
import { galleryReducer } from "./Gallery/Gallery.reducer";
import { blogReducer } from "./Blog/Blog.reducer";
import { roomReducer } from "./Room/Room.reducer";
import { seoReducer } from "./Seo/Seo.reducer";

const RootReducer = combineReducers({
  auth: authReducer,
  brand: BrandReducer,
  taxes: TaxReducer,
  banner: BannerReducer,
  users: userReducer,
  states: stateReducer,
  cities: cityReducer,
  countries: countryReducer,
  packages: packageReducer,
  attribute: AttributeReducer,
  category: CategoryReducer,
  product: ProductReducer,
  amenityCategory: AmenityCategoryReducer,
  amenity: AmenityReducer,
  hotel: HotelReducer,
  collection:collectionReducer,
  location:locationReducer,
  blog:blogReducer,
  testimonial:testimonialReducer,
  room:roomReducer,
  gallery:galleryReducer,
  seo:seoReducer
});

export default RootReducer;

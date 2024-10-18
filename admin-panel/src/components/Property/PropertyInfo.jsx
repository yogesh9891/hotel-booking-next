import React, { useEffect, useState } from "react";
import { DashboardBox } from "../Utility/DashboardBox";
import { getById } from "../../services/Property.service";
import { useParams } from "react-router-dom";
import { toastError } from "../Utility/ToastUtils";
import { generateFilePath } from "../Utility/utils";

function PropertyInfo() {
  const [contactObj, setContactObj] = useState("");
  let { id } = useParams();
  useEffect(() => {
    if (id) {
      handleGetById(id);
    }
  }, [id]);

  const handleGetById = async (id) => {
    try {
      let { data: res } = await getById(id);
      if (res.data) {
        setContactObj(res.data);
      }
    } catch (error) {
      toastError(error);
    }
  };
  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4">Property Query</h5>
          <DashboardBox>
            <div className="row">
              <div className="col-md-6">
                <h6 className="blue-1">Basics</h6>
                <ul className="blue-1 fs-14 customer-profile p-3">
                  <li>
                    <span className="fw-600">
                      Property Name<span>:</span>
                    </span>
                    {contactObj?.name}
                  </li>
                  <li>
                    <span className="fw-600">
                      Property Type<span>:</span>
                    </span>
                    {contactObj?.hotelType}
                  </li>
                  <li>
                    <span className="fw-600">
                      Property Description<span>:</span>
                    </span>
                    {contactObj?.description}
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <h6 className="blue-1">Location</h6>
                <ul className="blue-1 fs-14 customer-profile p-3">
                  <li>
                    <span className="fw-600">
                      Full Address<span>:</span>
                    </span>

                    {contactObj?.address}
                  </li>
                  <li>
                    <span className="fw-600">
                      State / Province<span>:</span>
                    </span>
                    {contactObj?.propertyState}
                  </li>
                  <li>
                    <span className="fw-600">
                      City <span>:</span>
                    </span>
                    {contactObj?.city}
                  </li>
                  {/* <li>
                    <span className="fw-600">
                    ZIP / Postal code  <span>:</span>
                    </span>
                    {contactObj?.description}
                  </li> */}
                </ul>
              </div>
              {/* <div className="col-md-12">
                <h6 className="blue-1">Amentity</h6>
            
                    {
                      contactObj?.amenitiesArr &&  contactObj?.amenitiesArr.map((el =>(
                        <>
                                <span className="fw-600">  {el.amenityCategoryName} :   </span>
                            <ul className="blue-1 fs-14 customer-profile p-3">
                
                          {
                                el.amenityArr &&  el.amenityArr.map((elx) =>(
                                  <li>{elx.amenityName}</li>   
                                ))

                          }
                </ul>

                        </>
                      )))
                    }
              </div> */}
              {/* <div className="col-md-12">
                <h6 className="blue-1">Rooms and details</h6>
                <ul className="blue-1 fs-14 customer-profile p-3">
                  <li>
                    <span className="fw-600">
                    Accommodates<span>:</span>
                    </span>

                    {contactObj?.people}
                  </li>
                  <li>
                    <span className="fw-600">
                    Bathrooms <span>:</span>
                    </span>
                    {contactObj?.bathroom}
                  </li>
                  <li>
                    <span className="fw-600">
                    Price <span>:</span>
                    </span>
                    {contactObj?.extraPrice}
                  </li>
                  <li>
                    <span className="fw-600">
                    Meal  <span>:</span>
                    </span>
                    {contactObj?.meal}
                  </li>
                </ul>
                <h4>Room Section</h4>
                <p>{contactObj?.roomsArr && contactObj?.roomsArr.map((rl) => (
                  <>
                  <div className="row">
                    <div className="col-md-4">
                      <p>Name:{rl.name}</p>
                    </div>
                    <div className="col-md-4">
                    <p>Size:{rl.size}</p>

                    </div>
                    <div className="col-md-4">
                    <p>Image:  <img src={generateFilePath(rl.image)} alt='no image' width="200px"  />  </p>
                      
                    </div>
                    <div className="col-md-4">
                    <p>Description:{rl.description}</p>


                    </div>
                  </div>
                  </>
               
                ))}</p>
              </div> */}
              <div className="col-md-12">
                <h6 className="blue-1">Property Photo</h6>
                <p>
                  Property Main Photo <br />{" "}
                  <img
                    src={generateFilePath(contactObj?.mainImage)}
                    width="200px"
                  />{" "}
                </p>
                <div className="row">
                  {contactObj?.imagesArr &&
                    contactObj?.imagesArr.map((el) => (
                      <div className="col-md-2">
                        <img
                          src={generateFilePath(el?.imageUrl)}
                          width="200px"
                        />
                      </div>
                    ))}
                </div>
              </div>
              <div className="col-md-6">
                <h6 className="blue-1">Account details</h6>
                <ul className="blue-1 fs-14 customer-profile p-3">
                  <li>
                    <span className="fw-600">
                      Name<span>:</span>
                    </span>

                    {contactObj?.fname}
                  </li>
                  <li>
                    <span className="fw-600">
                      Last name<span>:</span>
                    </span>
                    {contactObj?.lname}
                  </li>
                  <li>
                    <span className="fw-600">
                      Mobile number <span>:</span>
                    </span>
                    {contactObj?.phone}
                  </li>
                  <li>
                    <span className="fw-600">
                      Email <span>:</span>
                    </span>
                    {contactObj?.email}
                  </li>
                  {/* <li>
                    <span className="fw-600">
                      Address <span>:</span>
                    </span>
                    {contactObj?.address}
                  </li> */}
                  {/* <li>
                    <span className="fw-600">
                      payment <span>:</span>
                    </span>
                    {contactObj?.paymentRecevied}
                  </li> */}
                </ul>
              </div>
            </div>
          </DashboardBox>
        </div>
      </section>
    </main>
  );
}

export default PropertyInfo;

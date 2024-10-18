import axios from "axios";
import moment from "moment";
import convert from "xml-js";
export const searchHotelByDestination = async (obj) => {
  try {
    let xmlData = `<?xml version="1.0"?>
        <HotelFindRequest>
            <Authentication>
                <AgentCode>CD32429</AgentCode>
                <UserName>sidhant@deyor.in</UserName>
                <Password>Techstack@123</Password>
            </Authentication>
            <Booking>
                <ArrivalDate>${moment(obj.arrivalDate).format("DD/MM/YYYY")}</ArrivalDate>
                <DepartureDate>${moment(obj.departureDate).format("DD/MM/YYYY")}</DepartureDate>
                <CountryCode>${obj.countryCode}</CountryCode>
                <City>${obj.cityCode}</City>
                <GuestNationality>IN</GuestNationality>
                <HotelRatings>
                    <HotelRating>1</HotelRating>
                    <HotelRating>2</HotelRating>
                    <HotelRating>3</HotelRating>
                    <HotelRating>4</HotelRating>
                    <HotelRating>5</HotelRating>
                </HotelRatings>
                <Rooms>
                    <Room>
                        <Type>Room-1</Type>
                        <NoOfAdults>1</NoOfAdults>
                        <NoOfChilds>0</NoOfChilds>
                    </Room>
                </Rooms>
            </Booking>
        </HotelFindRequest>`;
    console.log(xmlData);
    let { data: res } = await axios.post(`http://test.xmlhub.com/testpanel.php/action/findhotel`, { XML: xmlData }, { headers: { "Content-Type": "application/x-www-form-urlencoded" } });

    return convert.xml2json(res);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const searchHotelByHotelId = async (obj) => {
  try {
    let xmlData = `
            <?xml version="1.0"?>
                <HotelDetailsRequest>
                    <Authentication>
                        <AgentCode>CD32429</AgentCode>
                        <UserName>sidhant@deyor.in</UserName>
                        <Password>Techstack@123</Password>
                    </Authentication>
                    <Hotels>
                        <HotelId>${obj.hotelId}</HotelId>
                    </Hotels>
                </HotelDetailsRequest>
          `;
    console.log(xmlData);
    let { data: res } = await axios.post(`http://test.xmlhub.com/testpanel.php/action/gethoteldetails`, { XML: xmlData }, { headers: { "Content-Type": "application/x-www-form-urlencoded" } });

    return convert.xml2json(res);
    return res;
  } catch (error) {
    console.error(error);
  }
};

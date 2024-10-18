import axios from "axios";
import { CONFIG } from "../helpers/Config";
import moment from "moment";

export const rmsrmsAuthLogin = async () => {
  try {
    let obj = {
      agentId: `${CONFIG.RMS_AGENT_ID}`,
      agentPassword: `${CONFIG.RMS_AGENT_PASSWORD}`,
      clientId: `${CONFIG.RMS_CLIENT_ID}`,
      clientPassword: `${CONFIG.RMS_CLIENT_PASSWORD}`,
      moduleType: ["Distribution"],
      useTrainingDatabase: CONFIG.RMS_TEST_MODE,
    };
    let data = JSON.stringify(obj);

    console.log(obj, "rmsrmsAuthLoginrmsrmsAuthLogin");

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${CONFIG.RMS_URL}/authToken`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    let { data: res } = await axios.request(config);

    return res;
  } catch (error) {
    console.error(error, "RMS AUTH TOKEN");
    return error;
  }
};

export const listofPropertyType = async (token) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${CONFIG.RMS_URL}/properties?modelType=full`,
      headers: {
        accept: "application/json",
        authtoken: token,
      },
    };

    let { data: res } = await axios.request(config);
    return res;
  } catch (error) {
    console.error(error, "RMS AUTH listofPropertyType");
    return [];
  }
};

export const listofPropertiesByCategory = async (token, categoryId) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${CONFIG.RMS_URL}/categories?limit=100&modelType=full&offset=0&propertyId=${categoryId}`,
      headers: {
        accept: "application/json",
        authtoken: token,
      },
    };

    let { data: res } = await axios.request(config);
    return res;
  } catch (error) {
    console.error(error, "ERROR listofPropertiesByCategory");
    return [];
  }
};

export const listofPropertiesAreaByCategory = async (token, categoryId) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${CONFIG.RMS_URL}/areas?limit=100&modelType=full&offset=0&propertyId=${categoryId}`,
      headers: {
        accept: "application/json",
        authtoken: token,
      },
    };

    let { data: res } = await axios.request(config);
    console.log(res, "listofPropertiesAreaByCategory", config);

    return res;
  } catch (error) {
    console.error(error, "ERROR listofPropertiesAreaByCategory");
    return [];
  }
};
export const searchHotelAvailabltiyByDestination = async (obj) => {
  try {
    if (!obj.token) {
      let rmsAuthData = await rmsrmsAuthLogin();
      console.log(rmsAuthData, "rmsAuthDatarmsAuthData", obj);
      obj.token = rmsAuthData.token;
      if (!rmsAuthData.token) {
        throw new Error("Unable to authorize");
      }
    }

    let seatchObj = {
      dateFrom: moment(obj.startDate).format("YYYY-MM-DD") + " 00:00:00",
      dateTo: moment(obj.endDate).format("YYYY-MM-DD") + " 00:00:00",
      propertyId: obj.propertyId,
      infants: 0,
      adults: obj.adult ? obj.adult : 1,
      children: obj.child ? obj.child : 0,
      agentId: `${CONFIG.RMS_AGENT_BOOK_ID}`,
      rateIds:
        obj.propertyId == 5 ? [2, 6, 4, 5] : [`${CONFIG.RMS_AGENT_RATE_ID}`],
      categoryIds: obj.proprtyids,
    };
    let ddata = JSON.stringify(seatchObj);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${CONFIG.RMS_URL}/availabilityRateGrid?includeEstimatedRates=false`,
      headers: {
        accept: "application/json",
        authtoken: obj.token,
        "Content-Type": "application/json",
      },
      data: ddata,
    };

    let { data: res } = await axios.request(config);
    console.log(res, "searchHotelAvailabltiyByDestination", config);

    return res;
  } catch (error) {
    console.error(error, "ERROR searchHotelAvailabltiyByDestination");
    return [];
  }
};

export const createReservationRmsApi = async (obj) => {
  try {
    let rmsAuthData = await rmsrmsAuthLogin();
    console.log(rmsAuthData, "rmsAuthDatarmsAuthData", obj);
    if (!rmsAuthData.token) {
      throw new Error("Unable to authorize");
    }

    let seatchObj = {
      adults: obj.adult,
      areaId: obj.areaId,
      children: obj.child,
      categoryId: obj.rmsPropertyId,
      arrivalDate: obj.startDate,
      departureDate: obj.endDate,
      guestId: obj.guestId,
      rateTypeId: 2,
      status: "Confirmed",
      travelAgentId: 17,
      bookingSourceId: 13,
      voucherId: `${obj._id}`,
    };
    let ddata = JSON.stringify(seatchObj);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${CONFIG.RMS_URL}/reservations?ignoreMandatoryFieldWarnings=true`,
      headers: {
        accept: "application/json",
        authtoken: rmsAuthData.token,
        "Content-Type": "application/json",
      },
      data: ddata,
    };

    let { data: res } = await axios.request(config);
    console.log(res, "createReservationRmsApi", config);

    return res?.accountId
      ? { id: res?.id, accountId: res?.accountId }
      : { id: "", accountId: "" };
  } catch (error) {
    console.error(error, "ERROR searchHotelAvailabltiyByDestination");
    return "";
  }
};

export const createReservationGroupRmsApi = async (obj) => {
  try {
    let rmsAuthData = await rmsrmsAuthLogin();
    console.log(rmsAuthData, "rmsAuthDatarmsAuthData", obj);
    if (!rmsAuthData.token) {
      throw new Error("Unable to authorize");
    }
    let odata = [];
    if (obj && obj?.hotelsArr && obj?.hotelsArr?.length > 0) {
      for (const hotel of obj?.hotelsArr) {
        let seatchObj = {
          adults: obj.adult,
          areaId: hotel.areaId,
          children: obj.child,
          categoryId: hotel.rmsPropertyId,
          arrivalDate: obj.startDate,
          departureDate: obj.endDate,
          guestId: obj.guestId,
          rateTypeId: hotel.rateId ? hotel.rateId:2,
          status: "Confirmed",
          travelAgentId: 17,
          bookingSourceId: 13,
          voucherId: `${obj._id}`,
        };
        odata.push(seatchObj);
      }
    }
    let ddata = JSON.stringify(odata);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${CONFIG.RMS_URL}/reservations/group?ignoreMandatoryFieldWarnings=true`,
      headers: {
        accept: "application/json",
        authtoken: rmsAuthData.token,
        "Content-Type": "application/json",
      },
      data: ddata,
    };

    let { data: res } = await axios.request(config);
    console.log(res, "createReservationRmsApi", config);
    let respnseArr = [];

    if (res && res?.length > 0) {
      for (const resobj of res) {
        let bookingObj = {
          id: resobj?.id,
          accountId: resobj?.accountId,
          rmsPropertyId: resobj?.categoryId,
        };
        respnseArr.push(bookingObj);
      }
    }
    return respnseArr;
  } catch (error) {
    console.error(error, "ERROR searchHotelAvailabltiyByDestination");
    return [];
  }
};
export const addGuestRmsApi = async (obj) => {
  try {
    let rmsAuthData = await rmsrmsAuthLogin();
    console.log(rmsAuthData, "rmsAuthDatarmsAuthData", obj);
    if (!rmsAuthData.token) {
      throw new Error("Unable to authorize");
    }

    let seatchObj = {
      email: obj.email,
      guestGiven: obj.name.split(" ")[0],
      mobile: obj.mobile,
      guestSurname:
        obj.name.split(" ").length > 1 ? obj.name.split(" ")[1] : ".",
    };
    let ddata = JSON.stringify(seatchObj);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${CONFIG.RMS_URL}/guests?ignoreMandatoryFieldWarnings=true`,
      headers: {
        accept: "application/json",
        authtoken: rmsAuthData.token,
        "Content-Type": "application/json",
      },
      data: ddata,
    };

    let { data: res } = await axios.request(config);
    console.log(res, "addGuestRmsApi", config);

    return res?.id ? res?.id : "";
  } catch (error) {
    console.error(error, "ERROR searchHotelAvailabltiyByDestination");
    return "";
  }
};

export const searchGuestRmsApi = async (obj) => {
  try {
    let rmsAuthData = await rmsrmsAuthLogin();
    console.log(rmsAuthData, "rmsAuthDatarmsAuthData", obj);
    if (!rmsAuthData.token) {
      throw new Error("Unable to authorize");
    }

    let seatchObj = {
      mobile: obj.mobile,
    };
    let ddata = JSON.stringify(seatchObj);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${CONFIG.RMS_URL}/guests/search?limit=100&modelType=basic&offset=0`,
      headers: {
        accept: "application/json",
        authtoken: rmsAuthData.token,
        "Content-Type": "application/json",
      },
      data: ddata,
    };

    let { data: res } = await axios.request(config);
    console.log(res, "addGuestRmsApi", config);

    return res?.length > 0 ? res[0] : false;
  } catch (error) {
    console.error(error, "ERROR searchHotelAvailabltiyByDestination");
    return "";
  }
};

export const createReceiptRmsApi = async (obj) => {
  try {
    let rmsAuthData = await rmsrmsAuthLogin();
    console.log(rmsAuthData, "rmsAuthDatarmsAuthData", obj);
    if (!rmsAuthData.token) {
      throw new Error("Unable to authorize");
    }

    let seatchObj = {
      accountId: obj.accountId,
      amount: obj.totalAmount,
      receiptType: "CreditCard",
      source: "standard",
      cardId: 9,
      comment: " Online Payment",
      dateOfTransaction: moment(obj.createdAt).format("YYYY-MM-DD"),
      description: `${obj.paymentObj?.gatwayPaymentObj.merchantTransactionId}`,
      exchangeRateId: 0,
      useRmsAccountingDateForPostingDate: true,
    };
    let ddata = JSON.stringify(seatchObj);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${CONFIG.RMS_URL}/transactions/receipt`,
      headers: {
        accept: "application/json",
        authtoken: rmsAuthData.token,
        "Content-Type": "application/json",
      },
      data: ddata,
    };

    let { data: res } = await axios.request(config);
    console.log(res, "createReceiptRmsApi", config);

    return res?.id ? res?.id : "";
  } catch (error) {
    console.error(error, "ERROR searchHotelAvailabltiyByDestination");
    return "";
  }
};


export const cancelReservationById = async (token, reservationId) => {
  try {
    
    let seatchObj = {
      status: "cancelled",
      reasonid: 1,
      cancellationNote: "Payment Not Confirmed",
    };
    let ddata = JSON.stringify(seatchObj);

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${CONFIG.RMS_URL}/reservations/${reservationId}/status?preventRateRecalculation=false`,
      headers: {
        accept: "application/json",
        authtoken: token,
      },
      data: ddata,
    };

    let { data: res } = await axios.request(config);
    console.log(res, "cancelReservationById", config);

    return true;
  } catch (error) {
    // console.error(error, "ERROR cancelReservationById");
    return false
  }
};

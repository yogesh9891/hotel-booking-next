"use client";

import moment from "moment";
import { SessionProvider } from "next-auth/react";
import { createContext, useContext, useState } from "react";
export type SearchDateInput = {
  location: string;
  locationId: string;
  roomId: string;
  propertyId: string;
  startDate: Date;
  endDate: Date;
  adult: number;
  child: number;
  rooms: number;
  roomsArr: {
    roomId: string;
    rateId: string;
    rmsPropertyId: string;
    rmsCategoryId: string;
    rooms: number;
    guest: number;
  }[];
};
type UserSearchType = [
  locationSearch: SearchDateInput,
  setLocationSearch: React.Dispatch<React.SetStateAction<SearchDateInput>>
];
const userSearchDefault: UserSearchType = [
  {
    location: "",
    locationId: "",
    propertyId: "",
    roomId: "",
    startDate: new Date(moment(new Date()).format("YYYY-MM-DD")),
    endDate: new Date(moment(new Date()).add(1, "days").format("YYYY-MM-DD")),
    adult: 1,
    child: 0,
    rooms: 0,
    roomsArr: [],
  },
  () => {},
];
export const SearchContext = createContext<UserSearchType>(userSearchDefault);
export const useSearch = () => {
  return useContext(SearchContext);
};

export const Provider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}): React.ReactNode => {
  const [locationSearch, setLocationSearch] = useState<SearchDateInput>({
    location: "",
    locationId: "",
    propertyId: "",
    roomId: "",
    startDate: new Date(),
    endDate: new Date(moment(new Date()).add(1, "days").format("YYYY-MM-DD")),
    adult: 1,
    child: 0,
    rooms: 0,
    roomsArr: [],
  });
  return (
    <SessionProvider session={session}>
      <SearchContext.Provider value={[locationSearch, setLocationSearch]}>
        {children}
      </SearchContext.Provider>
    </SessionProvider>
  );
};

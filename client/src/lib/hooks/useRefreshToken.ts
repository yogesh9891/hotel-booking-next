"use client";

import { refreshTokenApi } from "@/service/user.service";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
export const useRefreshToken = () => {
  const { data: session } :any = useSession();

  const refreshToken = async () => {

    console.log(session,"session?.usersession?.user")
          
    const res = await refreshTokenApi({ refresh: session?.user.refreshToken,
      email: session?.user.email,
    });

    if (session) session.user.accessToken = res.data.token;
    else signIn();
  };
  return refreshToken;
};

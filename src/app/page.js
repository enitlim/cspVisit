"use client"
import React, {useContext, useEffect, useState}from 'react';
import { useSelector, useDispatch } from "react-redux";
import { login } from "./redux/features/auth/authSlice";
import { useRouter } from 'next/navigation';
import { CspContext } from "./context/cspContext";
import Head from 'next/head';
import { listentoAuthChanges } from "./redux/actions/authAction";
const Home = () => {
  const route = useRouter();

  const [loading, setloading] = useState(0);
  const dispatch = useDispatch();
  const { userID, email, accessToken, isLoading } = useSelector(
    (state) => state.auth
  );
  const { userData } = useSelector((state) => state.user);
  console.log(userID);
  console.log(email);
  console.log(accessToken);
  console.log(isLoading);
  console.log(userData);
  useEffect(() => {
    dispatch(listentoAuthChanges());
  }, [dispatch]);
 
   useEffect(() => {
     if (isLoading == "logged" && userID != "") {
       //  setloading(1);
       route.push("/home");
       console.log("Go to Home Page");
     } else if (isLoading == "notlogged" && userID == "") {
       route.push("/login");
       console.log("Go to Login Page");
     } else if (isLoading == "loading") {
     }
   }, [isLoading]);
  // console.log(loading);

  return (
    <>
      <Head>
        <title>TGB CSP Visit</title>
        <meta
          name="description"
          content="This app is used for the CSP Visit"
          key="desc"
        />
      </Head>
      {loading === 0 ? (
        <>
          <h1>Loading...</h1>
        </>
      ) : null}
    </>
  );
}

export default Home
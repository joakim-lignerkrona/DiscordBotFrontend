import Head from "next/head";
import React from "react";
import BotMain from "../../Components/bot/IndexPage/BotMain";
import InfoSegment from "../../Components/bot/IndexPage/InfoSegment";
import Navbar from "../../Components/bot/Navbar";

export default function index() {
  return (
    <>
      <Head>
        <meta name="theme-color" content="#427d76" />
      </Head>
      <div>
        <Navbar />
        <BotMain />
        <InfoSegment />
      </div>
    </>
  );
}

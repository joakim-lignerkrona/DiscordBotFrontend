import React, { useEffect, useRef, useState } from "react";

export default function BotMain() {
  const mainContentRef = useRef();
  const [height, setHeight] = useState(0);
  console.log(mainContentRef);
  useEffect(() => {
    if (mainContentRef.current)
      // @ts-ignore
      setHeight(mainContentRef.current.offsetHeight);
    console.log(height);
  }, [mainContentRef]);

  return (
    <header
      className="masthead"
      style={{
        background:
          "url('/assets/image/bg-pattern.png'), radial-gradient(circle, rgba(98,62,107,1) 0%, rgba(222,94,255,1) 35%, rgba(127,255,242,1) 81%, rgba(14,93,85,1) 100%)",
        minHeight: "100vh",
        height: height !== 0 ? `calc(${height}px + 9rem)` : "100vh",
      }}
    >
      <div className="container h-100">
        <div ref={mainContentRef} className="row h-100">
          <div className="col-lg-7 my-auto">
            <div className="mx-auto header-content">
              <h1 className="my-5">Some cringe description goes here</h1>
              <a
                className="btn btn-outline-dark btn-xl"
                role="button"
                href="#download"
              >
                Add the bot to your Discord server
              </a>
            </div>
          </div>
          <div className="col-lg-5 my-auto">
            <div className="device-container">
              <div className="device-mockup iphone6_plus portrait white">
                <div className="device">
                  <div className="screen">
                    <img
                      className="img-fluid"
                      src="/assets/image/discord.png"
                    />
                  </div>
                  <div className="button"></div>
                </div>
              </div>
            </div>
            <div className="iphone-mockup"></div>
          </div>
        </div>
      </div>
    </header>
  );
}

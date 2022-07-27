import Link from "next/link";
import React, { ReactElement, useEffect, useRef, useState } from "react";

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>();
  const [navHeight, setNavHeight] = useState("5rem");

  useEffect(() => {
    console.log(navRef);
    if (navRef.current) {
      navRef.current.clientHeight
        ? setNavHeight(`${navRef.current.clientHeight} px`)
        : setNavHeight(`5rem`);
    }
    return () => {};
  }, [navRef]);
  return (
    <>
      <nav
        id="mainNav"
        className="navbar navbar-light navbar-expand fixed-top"
        style={{ borderColor: "transparent", backgroundColor: "transparent" }}
        ref={navRef}
      >
        <div className="container">
          <a className="navbar-brand" href="#page-top">
            JockanBot
          </a>
          <button
            className="navbar-toggler navbar-toggler-right"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            type="button"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa fa-bars"></i>
          </button>
          <div id="navbarResponsive" className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto text-uppercase">
              {/* <li className="nav-item">
                <a className="nav-link" href="#services">
                  Services
                </a>
              </li> */}

              <li className="nav-item">
                <Link href={"/"}>
                  <a className="nav-link" href="#home">
                    &larr; Home
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href={"/discordbot/Stats"}>
                  <a className="nav-link" href="#stats">
                    Stats
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

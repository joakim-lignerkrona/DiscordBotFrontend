import { GetServerSideProps } from "next";
import React, { useState } from "react";

export default function SelectIntro() {
  const [isFetching, setIsFetching] = useState(false);
  let data = {
    user: {
      username: "Template User",
      imageURL: "https://cdn.discordapp.com/embed/avatars/1.png",
    },
    message: "some message",
  };

  return (
    <>
      <header
        className="masthead login-dark"
        style={{
          background:
            "url('/assets/image/bg-pattern.png'), radial-gradient(circle, rgba(98,62,107,1) 0%, rgba(222,94,255,1) 35%, rgba(127,255,242,1) 81%, rgba(14,93,85,1) 100%)",
          minHeight: "100vh",
          height: "100vh",
        }}
      >
        <form>
          {data.user ? (
            <>
              <div className="row mb-3">
                <div className="col 9 d-flex flex-column">
                  <h2 className="">Settings for</h2>
                  <h3>{data.user.username}</h3>
                </div>
                <div className="col-3">
                  <img className="user-icon" src={data.user.imageURL} alt="" />
                </div>
              </div>

              <select
                name=""
                id=""
                disabled={false}
                className="form-select mb-3"
              >
                <option value="intro1">intro.mp3</option>
                <option value="intro2">intro1.mp3</option>
                <option value="intro3">intro2.mp3</option>
              </select>

              <div className="mb-3">
                <button className="btn btn-primary d-block w-100" type="submit">
                  Save
                </button>
              </div>
            </>
          ) : (
            <h2 className="">{data.message}</h2>
          )}
        </form>
        {isFetching ? (
          <div className="loading d-flex justify-content-center align-items-center">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                width: "60vw",
                height: "60vh",
                backgroundColor: "#5F506BF2",
                borderRadius: "10%",
              }}
            ></div>
          </div>
        ) : (
          ""
        )}
      </header>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  let jwt = context.query.jwt ? context.query.jwt : null;
  return {
    props: { jwt }, // will be passed to the page component as props
  };
};

import type { GetServerSideProps, NextPage } from "next";
import Router, { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { validateFile } from "../../features/uploadFiles/validateFile";

export default function AddIntro({ jwt }) {
  // #region State
  const [isFetching, setIsFetching] = useState(false);
  const [gotResponse, setgotResponse] = useState({
    status: false,
    message: "",
  });
  const [file, setFile] = useState<any>();
  const [errors, setErrors] = useState("");
  const [data, setData] = useState<any>({
    message: "fetching...",
  });
  const [useJWT, setuseJWT] = useState(jwt);
  // #endregion
  let router = useRouter();
  let query = router.query;

  // #region Setup for React dropzone
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 1) return;
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive, fileRejections, open } =
    useDropzone({
      onDrop,
      noClick: true,
      noKeyboard: true,
      validator: validateFile,
    });
  useDetectDrop(isDragActive, setgotResponse, setIsFetching);
  // #endregion

  // #region Handle the file upload
  useEffect(() => {
    let errors = fileRejections.map(({ errors }) => {
      console.log(errors);
      return errors;
    });
    let errorString = "";
    errors.map((error) => {
      console.log(
        error.map(({ message }) => {
          errorString = message;
          return message;
        })
      );
      console.log("errorString: " + errorString);
    });
    setErrors(errorString);
  }, [fileRejections]);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsFetching(true);
    if (file?.name) {
      let formData = new FormData();
      formData.append("intro", file, file.name);
      formData.append("jwt", jwt);

      axios
        .post("https://discordbot.jockan.com/api/intro", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((data) => {
          console.log(data);
          if (data.status === 200) {
            setgotResponse({
              status: true,
              message: "Success \nyou may now close this window",
            });
            Router.prefetch("/discordbot");
            setTimeout(() => {
              Router.push("/discordbot");
            }, 20000);
          } else {
            setgotResponse({
              status: true,
              message: `${data.status}: ${data.statusText}`,
            });
            setTimeout(() => {
              setgotResponse({ status: false, message: "" });
              setIsFetching(false);
            }, 5000);
          }
        })
        .catch((error) => {
          console.table(error.response);

          setgotResponse({
            status: true,
            message: error.response.data
              ? error.response.data
              : "Failed to upload",
          });
          if (error.response.status !== 400)
            setTimeout(() => {
              setgotResponse({ status: false, message: "" });
              setIsFetching(false);
            }, 5000);
        });
    } else {
      setErrors("No file");
      setgotResponse({ status: false, message: "" });
      setIsFetching(false);
    }
  };
  //#endregion

  //#region Handle the JWT
  useEffect(() => {
    if (useJWT) {
      axios
        .get(`https://discordbot.jockan.com/api?jwt=${useJWT}`)
        .then((res) => {
          if (res.status === 200) {
            setData(res.data);
          }
        });
    } else {
      setData({
        user: {
          username: "Template User",
          imageURL: "https://cdn.discordapp.com/embed/avatars/1.png",
        },
      });
    }
    return () => {};
  }, [useJWT]);

  useEffect(() => {
    if (query.jwt && !jwt) {
      setuseJWT(query.jwt);
    }
  }, [query.jwt]);
  //#endregion

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
        {...getRootProps()}
      >
        <form onSubmit={onSubmit}>
          {data.user ? (
            <>
              <div className="row mb-3">
                <div className="col 9 d-flex flex-column">
                  <h2 className="">Upload new intro for</h2>
                  <h3>{data.user.username}</h3>
                </div>
                <div className="col-3">
                  <img className="user-icon" src={data.user.imageURL} alt="" />
                </div>
              </div>

              <input {...getInputProps()} />
              <div className="input-group mb-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    open();
                  }}
                  className="btn btn-primary"
                >
                  Choose file
                </button>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={file?.name ? file.name : "Select a file"}
                  disabled={true}
                  readOnly={true}
                ></input>
              </div>
              <div className="bg-danger px-3">
                {typeof errors === "string" ? errors : ""}
              </div>
              <div className="mb-3">
                <button className="btn btn-primary d-block w-100" type="submit">
                  Upload
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
            >
              {gotResponse.status ? (
                <div>
                  <h1>{gotResponse.message}</h1>
                </div>
              ) : (
                <div
                  className="spinner-border"
                  style={{ width: "13rem", height: "13rem" }}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </div>
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
function useDetectDrop(
  isDragActive: boolean,
  setgotResponse: React.Dispatch<
    React.SetStateAction<{ status: boolean; message: string }>
  >,
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
    console.log(isDragActive);
    if (isDragActive) {
      setgotResponse({
        status: true,
        message: "Drop file to upload",
      });
      setIsFetching(true);
    } else {
      setTimeout(() => {
        setgotResponse({
          status: false,
          message: "",
        });
        setIsFetching(false);
      }, 700);
    }
  }, [isDragActive]);
}

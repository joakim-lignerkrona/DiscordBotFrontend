import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Jockan.com</title>
        <meta name="description" content="Jockan.com" />
        <meta name="theme-color" content="#e6e4ce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="#">Jockan.com</a>
          </h1>

          <div className={styles.description} style={{ minWidth: "50%" }}></div>

          <div className={styles.grid}>
            <Link href="/discordbot">
              <a className={styles.card}>
                <h2>Discord Bot &rarr;</h2>
                <p>
                  for custom behaviours for when users join a voice channel.
                </p>
              </a>
            </Link>
            {/* <Link href="/quiz">
              <a className={styles.card}>
                <h2>Quiz &rarr;</h2>
                <p>
                  the quiz is a fun way to test your knowledge about just about
                  anything.
                </p>
              </a>
            </Link> */}
          </div>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" Next.js "}
            <span className={styles.logo}>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </div>
    </>
  );
};

export default Home;

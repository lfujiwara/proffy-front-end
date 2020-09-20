import { Text } from "@chakra-ui/core";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Proffy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Text>Hello, world</Text>
    </div>
  );
}

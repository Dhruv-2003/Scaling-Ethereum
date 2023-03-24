import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className=" min-h-screen py-16">
      <Head>
        <title>Datum</title>
        <meta
          name="description"
          content="Cross chain permissionless Oracle Protocol"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hero min-h-scree py-10">
        <div className="hero-content text-center">
          <div className="max-w-md ">
            <h1 className="text-2xl leading-normal font-semibold">
              Welcome to
            </h1>
            <h1 className="text-8xl font-bold py-1.5">DATUM</h1>
            <p className="pb-6 pt-3 leading-relaxed">
              Cross chain permessionless Oracle Protocol Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Accusantium, saepe ratione
            </p>
            <button className="btn btn-primary my-4">Get Started</button>
          </div>
        </div>
      </div>
      <div className=" md:w-10/12 md:px-4 px-10 mx-auto">
        <div className="mockup-window border border-base-100 bg-violet-700 text-black text-opacity-100">
          <div className="flex justify-center px-4 py-16 border-t border-base-100 bg-bgDefault">
            <div className="mockup-code mockup-window border-0 border-base-100 bg-transparent text-opacity-0 w-11/12">
              <pre data-prefix="$" className=" text-gray-300">
                <code>npm i datum</code>
              </pre>
              <pre data-prefix=">" className="text-warning">
                <code>installing...</code>
              </pre>
              <pre data-prefix=">" className="text-success">
                <code>Done!</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

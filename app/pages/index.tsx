import Head from "next/head";
import { Inter } from "next/font/google";
import Image from "next/image";
import multi from "../src/assets/multi.png";
import dice from "../src/assets/dice.png";
import price from "../src/assets/price.png";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="navbar bg-transparent fixed py-3  w-full border-b border-gray-500 z-50 bg-opacity-40 backdrop-blur-xl">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Datum</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <button className="btn btn-md btn-primary mx-4">Docs</button>
          </ul>
        </div>
      </div>
      <div className=" min-h-screen pb-8">
        <Head>
          <title>Datum</title>
          <meta
            name="description"
            content="Cross chain permissionless Oracle Protocol"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="hero min-h-scree py-10 text-gray-200   pt-28 bg-red-5">
          <div className="hero-content text-center">
            <div className="max-w-md ">
              <h1 className="text-2xl leading-normal font-semibold">
                Introducing
              </h1>
              <h1 className=" writer-tex text-8xl font-bold py-1.5">DATUM</h1>
              <p className="pb-6 pt-3 leading-relaxed">
                Datum is a cross-chain permissionless oracle protocol for your
                smart contracts built on top of Optimism's newly created OP
                stack
              </p>
              <button className="btn btn-primary my-4">Docs</button>
            </div>
          </div>
        </div>

        <div className=" md:w-10/12 md:px-4 px-10 mx-auto">
          <div className="mockup-window border border-base-100 bg-primary text-black text-opacity-100">
            <div className="flex justify-center px-4 py-8 border-t border-base-100 bg-bgDefault">
              <div className="mockup-code mockup-window border-0 border-base-100 bg-transparent text-opacity-0 w-full pt-0">
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

        <div className=" bg-violet-70 my-24 relative ">
          <h2 className=" pb-5 text-center text-4xl font-semibold underline">
            Features
          </h2>
          <div className=" text-white flex justify-between items-stretch flex-wrap mx-auto md:w-10/12  md:px-2 px-4 mt-10 py-">
            <div className="card w-96 m-3  bg-gray-900 shadow-xl">
              <figure>
                <Image src={multi} alt="card image" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Multi Chain</h2>
                <p>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Delectus, aut adipisci nulla repudiandae id ex! Delectus
                  doloribus adipisci laudantium praesentium! Architecto nihil,
                  enim magnam a sunt at ducimus voluptatem eius?
                </p>
              </div>
            </div>
            <div className="card w-96 m-3 bg-gray-900 shadow-xl">
              <figure>
                <Image src={dice} alt="card image" />
              </figure>
              <div className="card-body bg-red-5">
                <h2 className="card-title">VRF Randomness</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Delectus, aut adipisci nulla repudiandae id ex! Delectus
                  doloribus adipisci laudantium praesentium! Architecto nihil,
                  enim magnam a sunt at ducimus voluptatem eius?
                </p>
              </div>
            </div>
            <div className="card w-96 m-3  bg-gray-900 shadow-xl">
              <figure>
                <Image src={price} alt="card image" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Price Feeds</h2>
                <p>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Delectus, aut adipisci nulla repudiandae id ex! Delectus
                  doloribus adipisci laudantium praesentium! Architecto nihil,
                  enim magnam a sunt at ducimus voluptatem eius?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

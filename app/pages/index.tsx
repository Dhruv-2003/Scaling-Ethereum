import YouTube, { YouTubeProps } from "react-youtube";
import Head from "next/head";
import Image from "next/image";
import multi from "../src/assets/multi.png";
import dice from "../src/assets/dice.png";
import price from "../src/assets/price.png";
import img from "../src/assets/img.png";
import img1 from "../src/assets/img1.png";

export default function Home() {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "580",
    width: "906.25",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const opts2: YouTubeProps["opts"] = {
    height: "290",
    width: "370",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return (
    <>
      <nav className=" z-40 flex justify-between items-center px-6 bg-[#121214]text-white py-2 bg-opacity-90 fixedbackdrop-blur w-full top-0">
        <div className=" flex justify-start items-center cursor-pointer">
          <h1 className=" text-4xl font-bold tracking-wider">DATUM</h1>
        </div>
        <div>
          <a
            className="btn btn-accent btn-outline rounded-sm mx-3"
            href="https://datum.gitbook.io/datum/"
            rel="noreferrer"
            target="_blank"
          >
            Docs
          </a>
          <a
            className=" btn btn-accent rounded-sm normal-case"
            href="https://datum.gitbook.io/datum/"
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>
        </div>
      </nav>

      <div className="hero min-h-scree mt-10 mt28">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <h1 className="text-7xl font-bold leading-8 tracking-wide mb-4">
              DATUM
            </h1>
            <div className="   flex justify-center z-0">
              <Image src={img1} alt="img" />
            </div>
            <p className="py-4 text-lg leading-8 tracking-wider">
              A a cross-chain permissionless oracle protocol for your smart
              contracts built on top of Optimism&#39;s newly created OP stack
            </p>
            <a
              className="btn btn-accent rounded-sm"
              href="https://datum.gitbook.io/datum/"
              rel="noreferrer"
              target="_blank"
            >
              Docs
            </a>
          </div>
        </div>
      </div>

      <div className=" px-5 z-10 my-5 w-full flex justify-around items-start md:flex-row flex-col mt-20">
        <div className=" hidden md:block">
          <YouTube videoId="VUyWEQKURok" opts={opts} onReady={onPlayerReady} />
        </div>
        <div className=" max-w-md px-5 mb-5 md:mb-0">
          <p className="text-lg leading-8 tracking-wider text-justify">
            The protocol incentivizes an open, permissionless network of data
            reporting and data validation, ensuring that data can be provided by
            anyone and checked by everyone.
          </p>
          <a
            className=" btn btn-accent rounded-sm my-5 "
            href="https://datum.gitbook.io/datum/"
            rel="noreferrer"
            target="_blank"
          >
            Learn More
          </a>
        </div>
        <div className=" md:hidden flex justify-center">
          <YouTube videoId="VUyWEQKURok" opts={opts2} onReady={onPlayerReady} />
        </div>
      </div>

      <div className="  grid grid-cols-3 mx-auto text-white  md:px-10 bg-[#121214] px-4 -mt-36 -z-10 py-20 pt-44">
        <div className="card w-96 col-span-3 md:col-span-1 border-l-4 border-accent md:m-0 m-3 rounded-none  bg-opacity-80 backdrop-blur-xs shadxl-xl">
          <div className="card-body">
            <h2 className="card-title">Multi Chain</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus,
              aut adipisci nulla repudiandae id ex! Delectus doloribus adipisci
              laudantium praesentium! Architecto nihil, enim magnam a sunt at
              ducimus voluptatem eius?
            </p>
          </div>
        </div>
        <div className="card w-96 col-span-3 md:col-span-1 border-l-4 border-accent md:m-0 m-3 rounded-none  bg-opacity-80 backdrop-blur-xl  ">
          <div className="card-body bg-red-5">
            <h2 className="card-title">VRF Randomness</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus,
              aut adipisci nulla repudiandae id ex! Delectus doloribus adipisci
              laudantium praesentium! Architecto nihil, enim magnam a sunt at
              ducimus voluptatem eius?
            </p>
          </div>
        </div>
        <div className="card w-96 col-span-3 md:col-span-1 border-l-4 border-accent md:m-0 m-3 rounded-none   bg-opacity-80 backdrop-blur-xl  ">
          <div className="card-body">
            <h2 className="card-title">Price Feeds</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus,
              aut adipisci nulla repudiandae id ex! Delectus doloribus adipisci
              laudantium praesentium! Architecto nihil, enim magnam a sunt at
              ducimus voluptatem eius?
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
{
  /* <>
<div className="navbar bg-transparent fixed py-3   w-full border-b border-gray-500 z-50 bg-opacity-40 backdrop-blur-xl">
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

  <div className="hero min-h-screen py-10 text-gray-200 bg pt-28 md:px-24 bg-red-5">
    <div className="flex justify-between items-center w-full flex-col lg:flex-row">
      <div className="max-w-md ">
        <h1 className=" writer-tex text-8xl font-bold py-1.5">DATUM</h1>
        <p className="pb-6 pt-3 leading-relaxed">
          Datum is a cross-chain permissionless oracle protocol for your
          smart contracts built on top of Optimism&#39;s newly created OP
          stack
        </p>
        <button className="btn btn-primary my-4">Docs</button>
      </div>

      <div className=" md:w-7/12 w-full bg-red-0 md:px-4 px-10 mx-auto py-20 bg">
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
    </div>
  </div>

  <div className=" bg-violet-70 mt-24 relative bg2 ">
    <h2 className=" pb-5 text-center text-4xl font-semibold underline pt-10">
      Features
    </h2>
    <div className="  grid grid-cols-3 mx-auto md:w-10/12  md:px-2 px-4 mt-10 pb-10">
      <div className="card w-96 col-span-3 md:col-span-1 border-l-4 border-accent rounded-none  bg-opacity-80 backdrop-blur-xs shadxl-xl">
        <figure>
          <Image className=" w-[360px]" src={multi} alt="card image" />
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
      <div className="card w-96 col-span-3 md:col-span-1 border-l-4 border-accent rounded-none  bg-opacity-80 backdrop-blur-xl  ">
        <figure>
          <Image className=" w-96" src={dice} alt="card image" />
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
      <div className="card w-96 col-span-3 md:col-span-1 border-l-4 border-accent rounded-none   bg-opacity-80 backdrop-blur-xl  ">
        <figure>
          <Image className=" w-80" src={price} alt="card image" />
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
</> */
}

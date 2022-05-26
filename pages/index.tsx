import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

type Color = {
  rgb: {
    r: number;
    g: number;
    b: number;
  };
  hsl: {
    h: number;
    s: number;
    l: number;
  };
};

const Home: NextPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await (await fetch("api/colors")).json();
    setData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Head>
        <title>Assignment</title>
        <meta name="description" content="Just a assignment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-center justify-center h-screen">
        <div className="space-y-8">
          <div className="flex gap-3">
            {data &&
              data.map((color: Color, i: number) => (
                <div key={i}>
                  <div
                    className="w-24 h-24 mx-auto transition-all"
                    style={{
                      backgroundColor: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`,
                    }}
                    key={i}
                  ></div>
                  <p className="text-center">
                    rgb({color.rgb.r}, {color.rgb.g}, {color.rgb.b})
                  </p>
                  <p className="text-center">
                    hsl({color.hsl.h}, {color.hsl.s}, {color.hsl.l})
                  </p>
                </div>
              ))}
          </div>

          <div className="flex justify-center">
            <button
              className="px-12 py-3 font-bold text-white transition-all bg-blue-500 rounded-md hover:bg-blue-600"
              onClick={fetchData}
            >
              Regenarate colors
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

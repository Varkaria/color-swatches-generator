import type { NextPage } from "next";
import Head from "next/head";
import { SetStateAction, useEffect, useState } from "react";
import { Color } from "./api/types/colors";

const Home: NextPage = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(5);
  const [isLoading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await (await fetch("api/colors?count=" + count)).json();
    setData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event: any) => {
    setCount(event.target.value);
  };

  return (
    <div>
      <Head>
        <title>Assignment</title>
        <meta name="description" content="Just a assignment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-center justify-center h-screen">
        <div className="space-y-8">
          <div
            className="flex gap-3 transition-all"
            style={{
              opacity: isLoading ? 0.5 : 1,
            }}
          >
            {data &&
              data.map((color: Color, i: number) => (
                <div key={i} className="max-w-xs">
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
            <div className="space-y-4">
              <label
                htmlFor="colors"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Count
              </label>
              <input
                type="text"
                id="colors"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
                onChange={handleChange}
                min={1}
                max={20}
                placeholder="5"
              />
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
    </div>
  );
};

export default Home;

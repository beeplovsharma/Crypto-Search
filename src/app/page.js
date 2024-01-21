"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState([]);

  useEffect(() => {
    axios
      .get("https://openapiv1.coinstats.app/coins", {
        headers: {
          "X-API-KEY": "ZyqPnDEazEwYjnHA+L3/pZsTlxcl7cdIUVIuYyXl1+8=",
        },
      })
      .then((res) => {
        console.log(res);
        setCurrency(res.data.result);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div id="main">
        <div id="page-1" className="w-full h-screen">
          <div className="mt-12 flex justify-center items-center flex-col">
            <h1 className="text-center text-4xl font-bold">
              Crypto Currency App
            </h1>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-2 py-1 mt-4 w-[40vmax]"
            />
          </div>

          <div className="flex justify-center items-center mt-10">
            <table className="">
              <thead className="">
                <tr>
                  <th className="border px-2 py-1">Rank</th>
                  <th className="border px-2 py-1">Name</th>
                  <th className="border px-2 py-1">Symbol</th>
                  <th className="border px-2 py-1">Market Cap</th>
                  <th className="border px-2 py-1">Price</th>
                  <th className="border px-2 py-1">Available Supply</th>
                  <th className="border px-2 py-1">Volume(24hr)</th>
                </tr>
              </thead>

              <tbody>
                {currency
                .filter((val)=>{
                  return val.name.toLowerCase().includes(search.toLowerCase())
                })
                .map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="border px-2 py-1">{index + 1}</td>
                      <td className="border px-4 py-1 flex gap-4 items-center">
                        <img src={item.icon} alt="" className="w-8" />
                        {item.name}
                      </td>
                      <td className="border px-2 py-1">{item.symbol}</td>
                      <td className="border px-2 py-1">
                        ${item.marketCap.toFixed(2)}
                      </td>
                      <td className="border px-2 py-1">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="border px-2 py-1">
                        {item.availableSupply}
                      </td>
                      <td className="border px-2 py-1">
                        {item.volume.toFixed(0)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

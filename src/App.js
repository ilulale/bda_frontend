import "./styles/output.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const entities = [
    "Bitcoin",
    "Cardano",
    "DogeCoin",
    "Ethereum",
    "Solana",
    "Tether",
  ];
  let [resData, setResData] = useState({});

  const onSubmit = (data) => {
    console.log(data);
    axios
      .get(
        `http://athena.medicineforchaos.tk:3005/api/cryptodata?startdate=${data["startdate"]}&coin=Bitcoin&units=${data["units"]}`
      )
      .then((res) => {
        // console.log(res.data);
        setResData(res.data);
      });
  };

  const DataForm = () => {
    return (
      <div
        className={
          `${resData["message"] == "200" && "hidden"}` +
          " w-screen h-screen bg-background flex flex-col justify-center items-center text-white"
        }
      >
        <form
          className="bg-primary border-4 border-black flex flex-col w-3/4 text-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="ml-4 mr-4 mt-4 text-xl font-bold">
            What would you buy?
          </div>
          <select
            className="outline-none bg-accent p-2 m-2 border-2 border-black text-center font-semibold"
            {...register("entity")}
          >
            {entities.map((ent) => (
              <option>{ent}</option>
            ))}
          </select>
          {/* <input
            className="outline-none bg-accent p-2 m-2 border-2 border-black text-center font-semibold"
            placeholder="BTC"
            type="text"
            {...register("entity")}
          ></input> */}
          <div className="ml-4 mr-4 mt-4 text-xl font-bold">
            How much did you buy?
          </div>
          <input
            className="outline-none bg-accent p-2 m-2 border-2 border-black text-center font-semibold"
            placeholder="1"
            type="number"
            {...register("units")}
          ></input>
          <div className="ml-4 mr-4 mt-4 text-xl font-bold">
            When did you buy it?
          </div>
          <input
            type="date"
            max="2020-07-06"
            className="outline-none bg-accent p-2 m-2 border-2 border-black text-center font-semibold"
            placeholder="2020-07-06"
            {...register("startdate")}
          ></input>
          <input
            type="submit"
            className="bg-accent text-white font-semibold text-lg w-1/2 self-center mt-4 mb-4 border-2 border-black"
            value="Go"
          ></input>
        </form>
      </div>
    );
  };

  const ResponseCard = () => {
    return (
      <div
        className={
          `${resData["message"] != "200" && "hidden"}` +
          " w-screen h-screen bg-background flex flex-col justify-center items-center text-white"
        }
      >
        <div className="bg-primary border-4 border-black flex flex-col w-3/4 pl-2 pr-2 text-xl">
          <div className="font-semibold">If you bought </div>
          <div>
            <span className="font-bold">
              {resData["message"] == "200" && resData["query"]["units"] + " "}
            </span>
            {resData["message"] == "200" && resData["query"]["coin"]} on
          </div>
          <div className="font-bold">
            {resData["message"] == "200" && resData["query"]["startdate"]} @
            {" USD "}
            {resData["message"] == "200" && resData["handeledData"]["cost"]}
          </div>
          <div>The value of it would be</div>
          <div>
            <span className="font-bold">
              {"USD "}
              {resData["message"] == "200" && resData["handeledData"]["sale"]}
            </span>
            {" 1 year later "}
          </div>
          <div>Giving you a net profit of</div>
          <div className="font-bold">
            {"USD "}
            {resData["message"] == "200" && resData["handeledData"]["profit"]}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <DataForm />
      <ResponseCard />
    </>
  );
}

export default App;

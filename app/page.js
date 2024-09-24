

"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Home() {
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupFraction, setPopupFraction] = useState("");
  const [isFalseFlags, setIsFalseFlags] = useState({
    isFalse1: false,
    isFalse2: false,
    isFalse3: false,
    isFalse4: false,
    isFalse5: false,
  });

  const [formData, setFormData] = useState({
    item1: "1",
    item2: "2",
    item3: "3",
    item4: "4",
    item5: "5",
    item6: "",
    item7: "",
    item8: "",
    item9: "",
    item10: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/pair",
        formData
      );
      const pair = response.data.pair;

      setIsFalseFlags({
        isFalse1: pair.isFalse1,
        isFalse2: pair.isFalse2,
        isFalse3: pair.isFalse3,
        isFalse4: pair.isFalse4,
        isFalse5: pair.isFalse5,
      });

      let trueIsFalseCount = 0;
      if (!pair.isFalse1) trueIsFalseCount++;
      if (!pair.isFalse2) trueIsFalseCount++;
      if (!pair.isFalse3) trueIsFalseCount++;
      if (!pair.isFalse4) trueIsFalseCount++;
      if (!pair.isFalse5) trueIsFalseCount++;

      const fraction = `${trueIsFalseCount}`;

      setPopupFraction(fraction);
      setShowPopup(true);
    } catch (error) {
      console.error("Error creating pair:", error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setPopupFraction("");
  };
  const Popup = ({ fraction, handleClose, allCorrect }) => {
    useEffect(() => {
      if (!allCorrect) {
        const timer = setTimeout(() => {
          handleClose();
        }, 3000);

        return () => clearTimeout(timer);
      }
    }, [allCorrect, handleClose]);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-md">
          {allCorrect ? (
            ((<h2 className="text-lg font-semibold mb-4">Congratulations!</h2>),
            (<p className="mb-4">All pairs are correct! Congratulation !!!</p>))
          ) : (
           
            <h2 className="text-lg font-semibold mb-4">
              You won {fraction} marks out of 5!
            </h2>
          )}
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="  ">
        <div className=" h-screen">
          <img
            src="./images/bgimg1.jpg"
            alt=""
            className=" object-cover relative h-full w-full"
          />
        </div>
        <div className="  ">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 absolute inset-0  bg-purple-300   h-fit   mt-10 p-2 w-fit px-8 justify-center items-center text-center flex flex-col  mx-auto"
          >
            <div className="flex flex-col   items-center justify-between">
              <div className="flex items-center justify-between mb-4">
                <input
                  type="text"
                  id="item1"
                  name="item1"
                  value={formData.item1}
                  onChange={handleChange}
                  className={`border border-gray-300 rounded px-2 py-1 w-20 mr-4 z-20 hidden ${
                    isFalseFlags.isFalse1 ? "bg-red-200" : ""
                  }`}
                />
                <div className="w-10 h-10 flex justify-center mr-5 bg-purple-400 rounded-full items-center text-center">
                  <span className=" text-center text-white font-semibold">
                    1
                  </span>
                </div>
                <img
                  src={`/images/catbgremove.png`}
                  alt="cat"
                  className="w-24 h-auto mr-8"
                />
                <input
                  type="text"
                  id="item6"
                  name="item6"
                  value={formData.item6}
                  onChange={handleChange}
                  className={`border border-gray-300 rounded text-center px-2 py-1 w-20 ml-4 z-20 ${
                    isFalseFlags.isFalse1 ? "bg-red-200" : ""
                  }`}
                  autoComplete="off"
                />
                <img
                  src={`/images/dog_shadow.png`}
                  alt="shadow"
                  className="w-24 h-auto ml-8 "
                />
              </div>

              <div className="flex items-center justify-between mb-4">
                <input
                  type="text"
                  id="item2"
                  name="item2"
                  value={formData.item2}
                  onChange={handleChange}
                  className={`border border-gray-300 rounded text-center px-2 py-1 w-20 z-20 hidden ${
                    isFalseFlags.isFalse2 ? "bg-red-200" : ""
                  }`}
                />
                <div className="w-10 h-10 flex justify-center mr-5 bg-purple-400 rounded-full items-center text-center">
                  <span className=" text-center text-white font-semibold">
                    2
                  </span>
                </div>
                <img
                  src={`/images/lionbgremove.png`}
                  alt="lion"
                  className="w-24 h-auto mr-8"
                />
                <input
                  type="text"
                  id="item7"
                  name="item7"
                  value={formData.item7}
                  onChange={handleChange}
                  className={`border border-gray-300 rounded text-center px-2 py-1 ml-4 w-20 z-20 ${
                    isFalseFlags.isFalse2 ? "bg-red-200" : ""
                  }`}
                  autoComplete="off"
                />
                <img
                  src={`/images/elephant_shadow.png`}
                  alt="shadow"
                  className="w-24 h-auto ml-8"
                />
              </div>

              <div className="flex items-center justify-between mb-4">
                <input
                  type="text"
                  id="item3"
                  name="item3"
                  value={formData.item3}
                  onChange={handleChange}
                  className={`border border-gray-300 rounded text-center px-2 py-1 mr-4 w-20 z-20 hidden ${
                    isFalseFlags.isFalse3 ? "bg-red-200" : ""
                  }`}
                />
                <div className="w-10 h-10 flex justify-center mr-5 bg-purple-400 rounded-full items-center text-center">
                  <span className=" text-center text-white font-semibold">
                    3
                  </span>
                </div>
                <img
                  src={`/images/elephantbgremove.png`}
                  alt="elephant"
                  className="w-24 h-auto mr-8"
                />
                <input
                  type="text"
                  id="item8"
                  name="item8"
                  value={formData.item8}
                  onChange={handleChange}
                  className={`border border-gray-300 rounded text-center px-2 py-1 ml-4 w-20 z-20 ${
                    isFalseFlags.isFalse3 ? "bg-red-200" : ""
                  }`}
                  autoComplete="off"
                />
                <img
                  src={`/images/crow_shadow.png`}
                  alt="shadow"
                  className="w-24 h-auto ml-8"
                />
              </div>

              <div className="flex items-center justify-between mb-4">
                <input
                  type="text"
                  id="item4"
                  name="item4"
                  value={formData.item4}
                  onChange={handleChange}
                  className={`border border-gray-300 rounded text-center px-2 py-1 mr-4 w-20 z-20 hidden ${
                    isFalseFlags.isFalse4 ? "bg-red-200" : ""
                  }`}
                />
                <div className="w-10 h-10 flex justify-center mr-5 bg-purple-400 rounded-full items-center text-center">
                  <span className=" text-center text-white font-semibold">
                    4
                  </span>
                </div>
                <img
                  src={`/images/crowbgremove.png`}
                  alt="crow"
                  className="w-24 h-auto mr-8"
                />
                <input
                  type="text"
                  id="item9"
                  name="item9"
                  value={formData.item9}
                  onChange={handleChange}
                  className={`border border-gray-300 rounded text-center px-2 py-1 ml-4 w-20 z-20 ${
                    isFalseFlags.isFalse4 ? "bg-red-200" : ""
                  }`}
                  autoComplete="off"
                />
                <img
                  src={`/images/lion_shadow.png`}
                  alt="shadow"
                  className="w-24 h-auto ml-8"
                />
              </div>

              <div className="flex items-center justify-between mb-4">
                <input
                  type="text"
                  id="item5"
                  name="item5"
                  value={formData.item5}
                  onChange={handleChange}
                  className={`border border-gray-300 rounded text-center px-2 py-1 mr-4 w-20 z-20 hidden ${
                    isFalseFlags.isFalse5 ? "bg-red-200" : ""
                  }`}
                />
                <div className="w-10 h-10 flex justify-center mr-5 bg-purple-400 rounded-full items-center text-center">
                  <span className=" text-center text-white font-semibold">
                    5
                  </span>
                </div>
                <img
                  src={`/images/dogbgremove.png`}
                  alt="dog"
                  className="w-24 h-auto mr-8"
                />
                <input
                  type="text"
                  id="item10"
                  name="item10"
                  value={formData.item10}
                  onChange={handleChange}
                  className={`border border-gray-300 rounded text-center px-2 py-1 ml-4 w-20 z-20 ${
                    isFalseFlags.isFalse5 ? "bg-red-200" : ""
                  }`}
                  autoComplete="off"
                />
                <img
                  src={`/images/cat_shadow.png`}
                  alt="shadow"
                  className="w-24 h-auto ml-8"
                />
              </div>

              <button
                type="submit"
                className="bg-purple-500 text-white rounded text-center px-4 py-2 hover:bg-purple-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        {showPopup && (
          <Popup
            fraction={popupFraction}
            handleClose={handleClosePopup}
            allCorrect={popupFraction === "5"}
          />
        )}
      </div>
    </>
  );
}

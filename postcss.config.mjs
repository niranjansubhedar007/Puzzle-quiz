/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;






// "use client";

// import { useEffect, useRef, useState } from "react";
// import axios from "axios";

// export default function Home() {
//   const [lines, setLines] = useState([]);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
//   const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
//   const canvasRef = useRef(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupFraction, setPopupFraction] = useState("");
//   const [isFalseFlags, setIsFalseFlags] = useState({
//     isFalse1: false,
//     isFalse2: false,
//     isFalse3: false,
//     isFalse4: false,
//     isFalse5: false,
//   });

//   const [formData, setFormData] = useState({
//     item1: "1",
//     item2: "2",
//     item3: "3",
//     item4: "4",
//     item5: "5",
//     item6: "",
//     item7: "",
//     item8: "",
//     item9: "",
//     item10: "",
//   });

//   const Popup = ({ fraction, handleClose, allCorrect }) => {
//     useEffect(() => {
//       if (!allCorrect) {
//         const timer = setTimeout(() => {
//           handleClose();
//         }, 3000);

//         return () => clearTimeout(timer);
//       }
//     }, [allCorrect, handleClose]);

//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//         <div className="bg-white p-6 rounded shadow-md">
//           {allCorrect ? (
//             <>
//               <h2 className="text-lg font-semibold mb-4">Congratulations!</h2>
//               <p className="mb-4">All pairs are correct!</p>
//             </>
//           ) : (
//             <>
//               <h2 className="text-lg font-semibold mb-4">
//                 You won {fraction} marks out of 5!
//               </h2>
//             </>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/pair",
//         formData
//       );
//       const pair = response.data.pair;

//       setIsFalseFlags({
//         isFalse1: pair.isFalse1,
//         isFalse2: pair.isFalse2,
//         isFalse3: pair.isFalse3,
//         isFalse4: pair.isFalse4,
//         isFalse5: pair.isFalse5,
//       });

//       let trueIsFalseCount = 0;
//       if (!pair.isFalse1) trueIsFalseCount++;
//       if (!pair.isFalse2) trueIsFalseCount++;
//       if (!pair.isFalse3) trueIsFalseCount++;
//       if (!pair.isFalse4) trueIsFalseCount++;
//       if (!pair.isFalse5) trueIsFalseCount++;

//       const fraction = `${trueIsFalseCount}`;

//       setPopupFraction(fraction);
//       setShowPopup(true);
//     } catch (error) {
//       console.error("Error creating pair:", error);
//     }
//   };

//   const handleClosePopup = () => {
//     setShowPopup(false);
//     setPopupFraction("");
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");
//     context.clearRect(0, 0, canvas.width, canvas.height);

//     lines.forEach((line) => {
//       context.beginPath();
//       context.moveTo(line.start.x, line.start.y);
//       context.lineTo(line.end.x, line.end.y);
//       context.strokeStyle = "black";
//       context.lineWidth = 2;
//       context.stroke();
//     });

//     if (isDrawing) {
//       context.beginPath();
//       context.moveTo(startPoint.x, startPoint.y);
//       context.lineTo(endPoint.x, endPoint.y);
//       context.strokeStyle = "black";
//       context.lineWidth = 2;
//       context.stroke();
//     }
//   }, [lines, isDrawing, startPoint, endPoint]);

//   const handleMouseDown = (e) => {
//     setIsDrawing(true);
//     const rect = e.target.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     setStartPoint({ x, y });
//     setEndPoint({ x, y });
//     document.body.style.cursor = "pointer";
//   };

//   const handleMouseMove = (e) => {
//     if (isDrawing) {
//       const rect = e.target.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
//       setEndPoint({ x, y });
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDrawing(false);
//     document.body.style.cursor = "default";
//     setLines((prevLines) => [
//       ...prevLines,
//       { start: startPoint, end: endPoint },
//     ]);
//   };

//   const handleShadowMouseEnter = (e) => {
//     if (isDrawing) {
//       const rect = e.target.getBoundingClientRect();
//       const x = rect.left + rect.width / 2;
//       const y = rect.top + rect.height / 2;
//       setEndPoint({ x, y });
//     }
//   };

//   return (
//     <>
//       <div
//         className="min-h-screen"
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//       >
//         <form
//           onSubmit={handleSubmit}
//           className="space-y-4 bg-gray-100 p-2 w-fit px-8 justify-center items-center text-center flex flex-col mx-auto"
//         >
//           <div className="flex flex-col items-center justify-between">
//             <div className="flex items-center justify-between mb-4">
//               <input
//                 type="text"
//                 id="item1"
//                 name="item1"
//                 value={formData.item1}
//                 onChange={handleChange}
//                 className={`border border-gray-300 rounded px-2 py-1 w-20 mr-4 z-20 hidden ${
//                   isFalseFlags.isFalse1 ? "bg-red-200" : ""
//                 }`}
//               />
//               <span className="mr-7">1</span>
//               <img
//                 src={`/images/cat.png`}
//                 alt="cat"
//                 className="w-24 h-auto mr-8"
//                 onMouseDown={handleMouseDown}
//               />
//               <div
//                 className="w-2 h-2 bg-black rounded-full mr-4 cursor-pointer"
//                 onMouseDown={handleMouseDown}
//               />
//               <div
//                 className="w-2 h-2 bg-black rounded-full mr-4 cursor-pointer"
//                 onMouseDown={handleMouseDown}
//               />
//               <img
//                 src={`/images/dog_shadow.png`}
//                 alt="shadow"
//                 className="w-24 h-auto"
//                 onMouseEnter={handleShadowMouseEnter}
//               />
//               <input
//                 type="text"
//                 id="item6"
//                 name="item6"
//                 value={formData.item6}
//                 onChange={handleChange}
//                 className={`border border-gray-300 rounded px-2 py-1 w-20 ml-4 z-20 ${
//                   isFalseFlags.isFalse1 ? "bg-red-200" : ""
//                 }`}
//                 autoComplete="off"
//               />
//             </div>

//             <div className="flex items-center justify-between mb-4">
//               <input
//                 type="text"
//                 id="item2"
//                 name="item2"
//                 value={formData.item2}
//                 onChange={handleChange}
//                 className={`border border-gray-300 rounded px-2 py-1 mr-4 w-20 z-20 hidden ${
//                   isFalseFlags.isFalse2 ? "bg-red-200" : ""
//                 }`}
//               />
//               <span className="mr-7">2</span>
//               <img
//                 src={`/images/lion.png`}
//                 alt="lion"
//                 className="w-24 h-auto mr-8"
//                 onMouseDown={handleMouseDown}
//               />
//               <div
//                 className="w-2 h-2 bg-black rounded-full mr-4 cursor-pointer"
//                 onMouseDown={handleMouseDown}
//               />
//               <div
//                 className="w-2 h-2 bg-black rounded-full mr-4 cursor-pointer"
//                 onMouseDown={handleMouseDown}
//               />
//               <img
//                 src={`/images/crow_shadow.png`}
//                 alt="shadow"
//                 className="w-24 h-auto"
//                 onMouseEnter={handleShadowMouseEnter}
//               />
//               <input
//                 type="text"
//                 id="item7"
//                 name="item7"
//                 value={formData.item7}
//                 onChange={handleChange}
//                 className={`border border-gray-300 rounded px-2 py-1 ml-4 w-20 z-20 ${
//                   isFalseFlags.isFalse2 ? "bg-red-200" : ""
//                 }`}
//                 autoComplete="off"
//               />
//             </div>

//             <div className="flex items-center justify-between mb-4">
//               <input
//                 type="text"
//                 id="item3"
//                 name="item3"
//                 value={formData.item3}
//                 onChange={handleChange}
//                 className={`border border-gray-300 rounded px-2 py-1 mr-4 w-20 z-20 hidden ${
//                   isFalseFlags.isFalse3 ? "bg-red-200" : ""
//                 }`}
//               />
//               <span className="mr-7">3</span>
//               <img
//                 src={`/images/elephant.png`}
//                 alt="elephant"
//                 className="w-24 h-auto mr-8"
//                 onMouseDown={handleMouseDown}
//               />
//               <div
//                 className="w-2 h-2 bg-black rounded-full mr-4 cursor-pointer"
//                 onMouseDown={handleMouseDown}
//               />
//               <div
//                 className="w-2 h-2 bg-black rounded-full mr-4 cursor-pointer"
//                 onMouseDown={handleMouseDown}
//               />
//               <img
//                 src={`/images/lion_shadow.png`}
//                 alt="shadow"
//                 className="w-24 h-auto"
//                 onMouseEnter={handleShadowMouseEnter}
//               />
//               <input
//                 type="text"
//                 id="item8"
//                 name="item8"
//                 value={formData.item8}
//                 onChange={handleChange}
//                 className={`border border-gray-300 rounded px-2 py-1 ml-4 w-20 z-20 ${
//                   isFalseFlags.isFalse3 ? "bg-red-200" : ""
//                 }`}
//                 autoComplete="off"
//               />
//             </div>

//             <div className="flex items-center justify-between mb-4">
//               <input
//                 type="text"
//                 id="item4"
//                 name="item4"
//                 value={formData.item4}
//                 onChange={handleChange}
//                 className={`border border-gray-300 rounded px-2 py-1 mr-4 w-20 z-20 hidden ${
//                   isFalseFlags.isFalse4 ? "bg-red-200" : ""
//                 }`}
//               />
//               <span className="mr-7">4</span>
//               <img
//                 src={`/images/crow.png`}
//                 alt="crow"
//                 className="w-24 h-auto mr-8"
//                 onMouseDown={handleMouseDown}
//               />
//               <div
//                 className="w-2 h-2 bg-black rounded-full mr-4 cursor-pointer"
//                 onMouseDown={handleMouseDown}
//               />
//               <div
//                 className="w-2 h-2 bg-black rounded-full mr-4 cursor-pointer"
//                 onMouseDown={handleMouseDown}
//               />
//               <img
//                 src={`/images/elephant_shadow.png`}
//                 alt="shadow"
//                 className="w-24 h-auto"
//                 onMouseEnter={handleShadowMouseEnter}
//               />
//               <input
//                 type="text"
//                 id="item9"
//                 name="item9"
//                 value={formData.item9}
//                 onChange={handleChange}
//                 className={`border border-gray-300 rounded px-2 py-1 ml-4 w-20 z-20 ${
//                   isFalseFlags.isFalse4 ? "bg-red-200" : ""
//                 }`}
//                 autoComplete="off"
//               />
//             </div>

//             <div className="flex items-center justify-between mb-4">
//               <input
//                 type="text"
//                 id="item5"
//                 name="item5"
//                 value={formData.item5}
//                 onChange={handleChange}
//                 className={`border border-gray-300 rounded px-2 py-1 mr-4 w-20 z-20 hidden ${
//                   isFalseFlags.isFalse5 ? "bg-red-200" : ""
//                 }`}
//               />
//               <span className="mr-7">5</span>
//               <img
//                 src={`/images/dog.png`}
//                 alt="dog"
//                 className="w-24 h-auto mr-8"
//                 onMouseDown={handleMouseDown}
//               />
//               <div
//                 className="w-2 h-2 bg-black rounded-full mr-4 cursor-pointer"
//                 onMouseDown={handleMouseDown}
//               />
//               <div
//                 className="w-2 h-2 bg-black rounded-full mr-4 cursor-pointer"
//                 onMouseDown={handleMouseDown}
//               />
//               <img
//                 src={`/images/cat_shadow.png`}
//                 alt="shadow"
//                 className="w-24 h-auto"
//                 onMouseEnter={handleShadowMouseEnter}
//               />
//               <input
//                 type="text"
//                 id="item10"
//                 name="item10"
//                 value={formData.item10}
//                 onChange={handleChange}
//                 className={`border border-gray-300 rounded px-2 py-1 ml-4 w-20 z-20 ${
//                   isFalseFlags.isFalse5 ? "bg-red-200" : ""
//                 }`}
//                 autoComplete="off"
//               />
//             </div>

//             <button
//               type="submit"
//               className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
//             >
//               Submit
//             </button>
//           </div>
//         </form>

//         {showPopup && (
//           <Popup
//             fraction={popupFraction}
//             handleClose={handleClosePopup}
//             allCorrect={popupFraction === "5"}
//           />
//         )}
//       </div>

//       <canvas
//           ref={canvasRef}
//           style={{ position: "absolute", top: 0, left: 0  ,zIndex: -1}}
//           width={window.innerWidth}
//           height={window.innerHeight}
//           onMouseDown={handleMouseDown}
//         />
//     </>
//   );
// }

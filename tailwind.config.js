/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};



// "use client";

// import { useEffect, useRef, useState } from "react";

// export default function Home() {
//   const [lines, setLines] = useState([]);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
//   const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
//   const canvasRef = useRef(null);

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
//     // Remove any existing line from the same bullet point
//     setLines((prevLines) =>
//       prevLines.filter(
//         (line) => line.start.x !== startPoint.x || line.start.y !== startPoint.y
//       )
//     );
//     // Add the newly drawn line
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

//   const [formData, setFormData] = useState({
//     item1: "",
//     item2: "",
//     item3: "",
//     item4: "",
//     item5: "",
//     item6: "",
//     item7: "",
//     item8: "",
//     item9: "",
//     item10: "",
//   });

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
//       console.log(response.data);
//       // Handle success, maybe show a success message or redirect
//     } catch (error) {
//       console.error("Error creating pair:", error);
//       // Handle error, maybe show an error message to the user
//     }
//   };

//   return (
//     <>
//       <div
//         className="max-w-screen-md mx-auto"
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//       >
//         <h1 className="text-2xl font-bold mb-4">Animal Puzzle</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="flex flex-col items-center">
//             <div className="animal-item flex items-center mb-4">
//               <input
//                 type="text"
//                 id="item1"
//                 name="item1"
//                 value={formData.item1}
//                 onChange={handleChange}
//                 className="border border-gray-300 rounded px-2 py-1 w-48 mr-4"
//               />
//               <img
//                 src={`/images/cat.png`}
//                 alt={"cat"}
//                 className="w-24 h-auto mr-8"
//                 onMouseDown={handleMouseDown}
//               />
//               <div
//                 className="w-2 h-2 bg-black rounded-full mr-64 cursor-pointer"
//                 onMouseDown={handleMouseDown}
//               />
//               <div
//                 className="w-2 h-2 bg-black rounded-full mr-4 cursor-pointer"
//                 onMouseDown={handleMouseDown}
//               />

//               <img
//                 src={`/images/dog_shadow.png`}
//                 alt={"shadow"}
//                 className="w-24 h-auto"
//                 onMouseEnter={handleShadowMouseEnter}
//               />
//               <input
//                 type="text"
//                 id="item6"
//                 name="item6"
//                 value={formData.item6}
//                 onChange={handleChange}
//                 className="border border-gray-300 rounded px-2 py-1 w-48 ml-4"
//               />
//             </div>

//             <div className="animal-item flex items-center mb-4">
//               <input
//                 type="text"
//                 id="item2"
//                 name="item2"
//                 value={formData.item2}
//                 onChange={handleChange}
//                 className="border border-gray-300 rounded px-2 py-1 mr-4 w-48"
//               />
//               <img
//                 src={`/images/lion.png`}
//                 alt={"cat"}
//                 className="w-24 h-auto mr-8"
//                 onMouseDown={handleMouseDown}
//               />
//               <div
//                 className="w-2 h-2 bg-black rounded-full mr-64 cursor-pointer"
//                 onMouseDown={handleMouseDown}
//               />
//               <div
//                 className="w-2 h-2 bg-black rounded-full mr-4 cursor-pointer"
//                 onMouseDown={handleMouseDown}
//               />
//               <img
//                 src={`/images/crow_shadow.png`}
//                 alt={"shadow"}
//                 className="w-24 h-auto"
//                 onMouseEnter={handleShadowMouseEnter}
//               />
//               <input
//                 type="text"
//                 id="item7"
//                 name="item7"
//                 value={formData.item7}
//                 onChange={handleChange}
//                 className="border border-gray-300 rounded px-2 py-1 w-48 ml-4"
//               />
//             </div>

//             <div className="animal-item flex items-center mb-4">
//               <input
//                 type="text"
//                 id="item3"
//                 name="item3"
//                 value={formData.item3}
//                 onChange={handleChange}
//                 className="border border-gray-300 rounded px-2 py-1 w-48 mr-4"
//               />
//               <img
//                 src={`/images/elephant.png`}
//                 alt={"cat"}
//                 className="w-24 h-auto mr-8"
//                 onMouseDown={handleMouseDown}
//               />
//               <div
//                 className="w-2 h-2 bg-black rounded-full mr-64 cursor-pointer"
//                 onMouseDown={handleMouseDown}
//               />
//               <div
//                 className="w-2 h-2 bg-black rounded-full mr-4 cursor-pointer"
//                 onMouseDown={handleMouseDown}
//               />
//               <img
//                 src={`/images/lion_shadow.png`}
//                 alt={"shadow"}
//                 className="w-24 h-auto"
//                 onMouseEnter={handleShadowMouseEnter}
//               />
//               <input
//                 type="text"
//                 id="item8"
//                 name="item8"
//                 value={formData.item8}
//                 onChange={handleChange}
//                 className="border border-gray-300 rounded px-2 py-1 w-48 ml-4"
//               />
//             </div>

//             <div className="animal-item flex items-center mb-4">
//               <input
//                 type="text"
//                 id="item4"
//                 name="item4"
//                 value={formData.item4}
//                 onChange={handleChange}
//                 className="border border-gray-300 rounded px-2 py-1 w-48 mr-4"
//               />
//               <img
//                 src={`/images/crow.png`}
//                 alt={"cat"}
//                 className="w-24 h-auto mr-8"
//                 onMouseDown={handleMouseDown}
//               />
//               <div
//                 className="w-2 h-2 bg-black rounded-full mr-64 cursor-pointer"
//                 onMouseDown={handleMouseDown}
//               />
//               <div
//                 className="w-2 h-2 bg-black rounded-full mr-4 cursor-pointer"
//                 onMouseDown={handleMouseDown}
//               />
//               <img
//                 src={`/images/elephant_shadow.png`}
//                 alt={"shadow"}
//                 className="w-24 h-auto"
//                 onMouseEnter={handleShadowMouseEnter}
//               />
//               <input
//                 type="text"
//                 id="item9"
//                 name="item9"
//                 value={formData.item9}
//                 onChange={handleChange}
//                 className="border border-gray-300 rounded px-2 py-1 w-48 ml-4"
//               />
//             </div>

//             <div className="animal-item flex items-center mb-4">
//               <input
//                 type="text"
//                 id="item5"
//                 name="item5"
//                 value={formData.item5}
//                 onChange={handleChange}
//                 className="border border-gray-300 rounded px-2 py-1 mr-4 w-48"
//               />
//               <img
//                 src={`/images/dog.png`}
//                 alt={"cat"}
//                 className="w-24 h-auto mr-8"
//                 onMouseDown={handleMouseDown}
//               />
//               <div
//                 className="w-2 h-2 bg-black rounded-full mr-64 cursor-pointer"
//                 onMouseDown={handleMouseDown}
//               />
//               <div
//                 className="w-2 h-2 bg-black rounded-full mr-4 cursor-pointer"
//                 onMouseDown={handleMouseDown}
//               />
//               <img
//                 src={`/images/cat_shadow.png`}
//                 alt={"shadow"}
//                 className="w-24 h-auto"
//                 onMouseEnter={handleShadowMouseEnter}
//               />
//               <input
//                 type="text"
//                 id="item10"
//                 name="item10"
//                 value={formData.item10}
//                 onChange={handleChange}
//                 className="border border-gray-300 rounded px-2 py-1 w-48 ml-4"
//               />
//             </div>
//           </div>
//         </form>
//         <canvas
//           ref={canvasRef}
//           style={{ position: "absolute", top: 0, left: 0 }}
//           width={window.innerWidth}
//           height={window.innerHeight}
//           onMouseDown={handleMouseDown}
//         />
//       </div>

//       <button
//         type="submit"
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         Submit
//       </button>
//     </>
//   );
// }


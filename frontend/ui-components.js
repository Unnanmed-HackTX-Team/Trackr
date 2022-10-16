import React from 'react';
import { useState } from "react";
import { useZxing } from "react-zxing";
import QRCode from "react-qr-code";

// ReactDOM.render(<QRCode value="hey" />, document.getElementById("Container"));



export function SignInPrompt({ onClick }) {
  return (
    <button onClick={onClick}>Sign in with NEAR Wallet</button>
  );
};

export function SignOutButton({ accountId, onClick }) {
  return (
    <button onClick={onClick}>
      Sign out {accountId}
    </button>
  );
};

// export const BarcodeScanner = () => {
//   const [result, setResult] = useState("");
//   const { ref } = useZxing({
//     onResult(result) {
//       setResult(result.getText());
//     },
//   });

//   return (
//     <>
//       <video ref={ref} />
//       <p>
//         <span>Last result:</span>
//         <span>{result}</span>
//       </p>
//     </>
//   );
// };


// MetaData = [
//   { date: "H=MM/DD/YY", creator: "H", name: "J", description: "a" }
// ]
// //need to put data into the table
// export function MetaData() {
//   return (
//     <div className="MetaData">
//       <table className="MetaData_table">
//         <tr>
//           <th>Date</th>
//           <th>Creator</th>
//           <th>Name</th>
//           <th>Description</th>
//         </tr>
//         {MetaData.map((val, key) => {
//           return (
//             <tr key={key}>
//               <td>{val.date}</td>
//               <td>{val.creator}</td>
//               <td>{val.name}</td>
//               <td>{val.description}</td>
//             </tr>
//           )
//         })}
//       </table>
//     </div>
//   );
}

// export function DropCategory({ onClick }) {
//   return (
//     <div>
//       <label>
//         Category?
//         <select>
//           <option value="produce">Produce</option>
//           <option value="voters">voters</option>
//           <option value="packages">packages</option>
//           <option value="supply_chain">supply chain</option>
//           <option value="evidence">evidence</option>
//           <option value="luggages">luggages</option>
//         </select>
//       </label>
//     </div>
//   );
// };



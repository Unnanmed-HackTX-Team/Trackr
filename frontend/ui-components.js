import React from 'react';
import { Link } from 'react-router-dom';

import { useState } from "react";
import { useZxing } from "react-zxing";
import QRCode from "react-qr-code";
import favicon from "./assets/favicon.png";

// ReactDOM.render(<QRCode value="hey" />, document.getElementById("Container"));

export function Navbar() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light px-3">
        <a class="navbar-brand" href="/">
          <img src={favicon} width="30" height="30" class="d-inline-block align-top mx-2" alt="" />
          Trackr
        </a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbar">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <Link class="nav-link" to="/">Home</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/track">Track</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/create">Create</Link>
            </li>
          </ul>
        </div>

      </nav>
    </div>
  );
}

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

export function Track({ trackId, setTrackId }) {
  return (
    <>
      <div class="text-center font-italic">
        <h1 class="display-1">Track Item</h1>
      </div>

      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="ID Search" aria-label="ID Search" aria-describedby="id-search-submit" />
        <button class="btn btn-outline-secondary" type="button" id="id-search-submit">Search</button>
      </div>



      <div class="d-flex justify-content-center">
        <button type="button" class="btn btn-light btn-lg">
          <QRCode value={trackId} />
        </button>
      </div>

      <p>Tracking {trackId}</p>
    </>
  )
}

// export const BarcodeScanner = () => {
//   const [result, setResult] = useState("");
//   const { ref } = useZxing({
//     onResult(result) {
//       setResult(result.getText());
//     },:32
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



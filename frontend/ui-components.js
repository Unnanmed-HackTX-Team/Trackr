import React from 'react';
import { Link } from 'react-router-dom';

import { useState } from "react";
import { useZxing } from "react-zxing";
import QRCode from "react-qr-code";
import favicon from "./assets/favicon.png";
import { CallTracker } from 'assert';

// ReactDOM.render(<QRCode value="hey" />, document.getElementById("Container"));

export function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
        <a className="navbar-brand" href="/">
          <img src={favicon} width="30" height="30" className="d-inline-block align-top mx-2" alt="" />
          Trackr
        </a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/track">Track</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create">Create</Link>
            </li>
          </ul>
        </div>

      </nav>
    </div>
  );
}

export function Footer() {
  return (
    <div className="text-center text-muted bg-light navbar fixed-bottom d-flex justify-content-center">
      © 2022 Trackr
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

export function Track() {
  const [result, setResult] = useState("");
  const { ref } = useZxing({
    onResult(result) {
      TrackItem(result.getText());
    },
  });
  const [trackId, setTrackId] = useState("");

  function handleTrackId(event) {
    setTrackId(event.target.value);
  }

  return (
    <>
      <div className="text-center font-italic mt-2">
        <h1 className="display-1">Track Item</h1>
      </div>

      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="ID Search" aria-label="ID Search" aria-describedby="id-search-submit" onChange={(evt) => handleTrackId(evt)} />
        <button className="btn btn-outline-secondary" type="button" id="id-search-submit" onClick={function (e) {
          TrackItem(trackId);
        }}>Search</button>
      </div>

      <video ref={ref} className="img-thumbnail w-100" />

      <div className="card mb-2">
        <div className="card-body">
          <h5 className="card-title text-center">Metadata</h5>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="card mb-5">
        <div className="card-body">
          <h5 className="card-title text-center">Logs</h5>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  function TrackItem(id) {
    // TODO: Call contract to get item info
    console.log("Tracking item with id: " + id);
    // TODO: Display item info
  }
};

export function Create({ wallet }) {
  return (
    <>
      <div className="text-center font-italic mt-2">
        <h1 className="display-1">Create Item</h1>
      </div>

      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Item Name" aria-label="Item Name" aria-describedby="item-search-submit-a" />

      </div>


      <label for="category-name" className="form-label">Category Name</label>
      <select id="category-name" className="form-select">
        <option selected>Select</option>
        <option value="1">Produce</option>
        <option value="2">Packages</option>
        <option value="3">Supply Chain</option>
        <option value="3">Votes</option>
        <option value="3">Evidence</option>
      </select>
      <div className="text-center font-italic mt-2">
        <button type="button" className="btn btn-dark w-100">Create</button>
      </div>

      <div class="form-group">
        <label for="exampleFormControlTextarea3">Description</label>
        <textarea class="form-control" id="exampleFormControlTextarea3" rows="7"></textarea>
      </div>


    </>
  )
};

export function Home() {
  return (
    <>
      <p>this is the home</p>
    </>
  );
};


// MetaData = [
//   { date: "H=MM/DD/YY", creator: "H", name: "J", description: "a" }
// ]
// //need to put data into the table
// export function MetaData() {
//   return (
//     <div classNameName="MetaData">
//       <table classNameName="MetaData_table">
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



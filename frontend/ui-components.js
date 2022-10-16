import React from 'react';
import { Link } from 'react-router-dom';

import { useState, useEffect } from "react";
import { useZxing } from "react-zxing";
import QRCode from "react-qr-code";
import favicon from "./assets/favicon.png";
import { CallTracker } from 'assert';
import { randomInt } from 'crypto';

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
  const [Logs, setLogs] = useState([]);
  const [Metadata, setMetadata] = useState([]);
  const [PageTitle, setPageTitle] = useState("first one");

  function handleTrackId(event) {
    setTrackId(event.target.value);
  }

  return (
    <>
      <div className="text-center font-italic mt-2">
        <h1 className="display-1">{PageTitle}</h1>
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
          <table className="table"  >
            <thead>
              <tr>
                <th >Date</th>
                <th >Creator</th>
                <th >Name</th>
                <th >Description</th>
              </tr>
            </thead>
            <tbody>
              {Metadata.map((key) => {
                return (
                  <tr key={key}>
                    <td >{val.date}</td>
                    <td >{val.creator}</td>
                    <td >{val.name}</td>
                    <td >{val.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card mb-5 ">
        <div className="card-body">
          <h5 className="card-title text-center">Logs</h5>
          <table className="table">
            <thead>
              <tr>
                <th >Time</th>
                <th >Location</th>
                <th >Creator</th>
                <th >State</th>
                <th >Notes</th>
              </tr>
            </thead>
            <tbody>
              {Logs.map((val, key) => {
                return (
                  <tr key={key}>
                    <td >{val.time}</td>
                    <td >{val.location}</td>
                    <td >{val.creator}</td>
                    <td >{val.state}</td>
                    <td >{val.notes}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  function TrackItem(id) {
    console.log("Tracking item with ID: " + id);
    setPageTitle(id);
// consti= 5;
//     Logs.push({
//       time: new Date().toLocaleString(),
//       location: "L " + i,
//       creator: "C " + i,
//       state: "S " + i,
//       notes: "N " + i
//     });
    // setLogs([{ time: "Date", location: "Location" }]);
    // for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
    //   Logs.push({
    //     time: new Date().toLocaleString(),
    //     location: "L " + i,
    //     creator: "C " + i,
    //     state: "S " + i,
    //     notes: "N " + i
    //   });
    // }
    // setLogs(Logs);
    // console.log(Logs);

  };
}

export function Create({ wallet }) {
  return (
    <>
      <div className="text-center font-italic mt-4">
        <h1 className="display-1">Create Item</h1>
      </div>

      <div className="input-group mt-5">
        <input type="text" className="form-control" placeholder="Item Name" aria-label="Item Name" aria-describedby="item-search-submit-a" />

      </div>

      <form>
        <label htmlFor="category-name" className="form-label"></label>
        <select id="category-name" className="form-select" defaultValue={'DEFAULT'}>
          <option value="DEFAULT">Select Category</option>
          <option value="produce">Produce</option>
          <option value="packages">Packages</option>
          <option value="supply-chain">Supply Chain</option>
          <option value="votes">Votes</option>
          <option value="evidence">Evidence</option>
        </select>

        <div className="form-group mb-3">
          <label htmlFor="description"></label>
          <textarea className="form-control" id="description" rows="5" placeholder="Write a description of the item here"></textarea>
        </div>

        <div className="text-center font-italic">
          <button type="button" className="btn btn-dark w-100" onClick={function (e) {
            CreateItem();
          }}>Create</button>
        </div>
      </form>
    </>
  )

  function CreateItem() {
    // form validation
    console.log("Creating item");

  }

};

export function Home() {
  return (
    <>
      <div className="jumbotron mt-4">
        <h1 className="display-4">Oh no!</h1>
        <p className="lead">Ever lost something dear to you? Well you're in luck!</p>
        <hr className="my-4" />
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
        <p className="lead">
          <a className="btn btn-dark btn-lg w-100" href="/track" role="button">
            <i className="fa-solid fa-qrcode mx-2"></i>Scan</a>
        </p>
      </div>

      <div id="carouselExampleIndicators" className="carousel slide mb-5" data-bs-ride="carousel">
        <ol className="carousel-indicators">
          <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></li>
          <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
          <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src="https://picsum.photos/500/300?random=1" alt="First slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="https://picsum.photos/500/300?random=3" alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="https://picsum.photos/500/300?random=2" alt="Third slide" />
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-bs-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-bs-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>

      <div class="card mb-5">
        <img class="card-img-top" src="https://picsum.photos/500/300?random=3" alt="Card image cap"/>
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
      </div>

      {/* <a href="/track"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" className height="100" /></a>

      <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
        <div className="carousel-inner row w-100 mx-auto" role="listbox">
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="10000">
            <div className="row">
              <div className="col"><img src="https://upload.wikimedia.org/wikipedia/commons/b/be/La_Boqueria.JPG" className="d-block w-100" alt="..." /></div>
              <div className="col"><img src="https://upload.wikimedia.org/wikipedia/commons/b/be/La_Boqueria.JPG" className="d-block w-100" alt="..." /></div>
              <div className="col" ><img src="https://upload.wikimedia.org/wikipedia/commons/b/be/La_Boqueria.JPG" className="d-block w-100" alt="..." /></div>
              <div className="carousel-caption d-none d-md-block"></div>
            </div>

  

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>

            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>

          </div>
        </div>
      </div> */}
    </>
  );
};
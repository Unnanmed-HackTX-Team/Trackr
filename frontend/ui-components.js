import React from 'react';
import { Link } from 'react-router-dom';

import { useState, useEffect } from "react";
import { useZxing } from "react-zxing";
import QRCode from "react-qr-code";
import favicon from "./assets/favicon.png";
import { CallTracker } from 'assert';
import { randomInt } from 'crypto';


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
  const [dummy, setDummy] = useState("dummy");

  function handleTrackId(event) {
    setTrackId(event.target.value);
  }

  return (
    <>
      <div className="text-center font-italic mt-2">
        <h1 className="display-1">Track</h1>
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
          <table className="table table-small">
            <thead>
              <tr>
                <th >Created</th>
                <th >Updated</th>
                <th >Creator</th>
                <th >Name</th>
                <th >Desc</th>
              </tr>
            </thead>
            <tbody>
              {Metadata.map((val, key) => {
                return (
                  <tr key={key}>
                    <td >{val.created}</td>
                    <td >{val.updated}</td>
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
          <table className="table table-small" >
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
    // clear logs and metadata
    setLogs([]);
    setMetadata([]);
    setDummy("dummyperson");

    console.log("Tracking item with ID: " + id);

    for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
      Logs.push({
        time: new Date().toLocaleString(),
        location: "L " + i,
        creator: "C " + i,
        state: "S " + i,
        notes: "N " + i
      });

      setLogs(Logs);
    }

    for (let i = 0; i < 1; i++) {
      Metadata.push({
        created: new Date().toLocaleString(),
        updated: new Date().toLocaleString(),
        creator: "C " + i,
        name: "N " + i,
        description: "D " + i
      });

      setMetadata(Metadata);
    }

    console.log("Logs: " + Logs);
    console.log("Metadata: " + Metadata);
    setDummy("dummyperson");
  };
}

export function Create({ wallet }) {
  let showQr = false;
  const [generateValue, setGenerateValue] = useState("");
  return (
    <>
      <div className="text-center font-italic mt-4">
        <h1 className="display-1">Create Item</h1>
      </div>

      <form>
        <div if={!showQr ? 0 : 1}>
          <input id="item-name" type="text" className="form-control mt-5" placeholder="Item Name" aria-label="Item Name" aria-describedby="item-search-submit-a" />
          <label htmlFor="category-name" className="form-label"></label>
          <select id="category-name" className="form-select" defaultValue={'DEFAULT'}>
            <option value="DEFAULT">Select Category</option>
            <option value="produce">Produce</option>
            <option value="packages">Packages</option>
            <option value="supply-chain">Supply Chain</option>
            <option value="votes">Votes</option>
            <option value="evidence">Evidence</option>
            <option value="luggage">Luggage</option>
          </select>

          <div className="form-group mb-3">
            <label htmlFor="description"></label>
            <textarea className="form-control" id="description" rows="5" placeholder="Write a description of the item here"></textarea>
          </div>

          <p id="create-item-message" className="text-danger text-center"></p>
        </div>
        <div className="text-center mb-3" if={showQr ? 1 : 0}>
          <QRCode value={generateValue} />
        </div>


        <div className="text-center font-italic mb-5">
          <button type="button" className="btn btn-dark w-100" onClick={function (e) {
            CreateItem();
          }}>Create</button>
        </div>
      </form>
    </>
  )

  function CreateItem() {
    let itemname = document.getElementById("item-name");
    let categoryName = document.getElementById("category-name");
    let description = document.getElementById("description");
    let error = document.getElementById("create-item-message");

    if (itemname.value == "" || categoryName.value == "DEFAULT" || description.value == "") {
      error.innerHTML = "Please fill out all fields";
      return;
    }

    let item = {
      name: itemname,
      category: categoryName,
      description: description,
      creator: "dummy",
      // creator: wallet.getPublicKey(),
      date: new Date().toLocaleString()
    };

    // TODO: Create item on blockchain
    let response = "dummy";
    // let response = await wallet.callContract("createItem", item);

    setGenerateValue(response);

    error.innerHTML = "Item created successfully";
    error.classList.add("text-success");
    error.classList.remove("text-danger");

    // clear all textboxes
    itemname.value = "";
    categoryName.value = "DEFAULT";
    description.value = "";

    setTimeout(function () {
      error.innerHTML = "";
      error.classList.remove("text-success");
      error.classList.add("text-danger");
    }, 2000);
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

      <div className="card mb-5">
        <img className="card-img-top" src="https://picsum.photos/500/300?random=3" alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </>
  );
};
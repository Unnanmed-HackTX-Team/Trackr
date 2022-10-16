import 'regenerator-runtime/runtime';
import React from 'react';
import contractWasm from "url:./hello_near.wasm";
import { connect, keyStores, KeyPair } from 'near-api-js';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { Thing } from './near-interface';

import './assets/global.css';

import { SignInPrompt, SignOutButton, Navbar, Track, Footer, Create, Home } from './ui-components';

export default function App({ isSignedIn, wallet }) {
  const [trackId, setTrackId] = React.useState("");

  return (
    <div >
    <BrowserRouter>
      <div>
        <Navbar></Navbar>
        <div className="container-fluid">
          <Routes>
            <Route path="/track" element={<Track trackId={trackId} setTrackId={setTrackId} />} />
            <Route path="/create" element={<Create wallet={wallet} />} />
            <Route path="/" element={<Home isSignedIn={isSignedIn} wallet={wallet} setTrackId={setTrackId} />} />
          </Routes>
        </div>
        <Footer></Footer>
      </div>
    </BrowserRouter>
    </div>
  )
}

function Home({ isSignedIn, wallet, setTrackId }) {
  return (
    <Home></Home>
  )

  // const navigate = useNavigate();

  // return (
  //   <main>
  //     <p style={{ textAlign: 'center' }}>
  //       <input type="text"
  //         onKeyUp={(event) => {
  //           if (event.key === "Enter") {
  //             setTrackId(event.target.value)
  //             navigate('/track')
  //           }
  //         }}
  //         placeholder="Enter ID to track" />
  //       <br /><br />
  //       <button onClick={() => navigate('/create')}>Create new thing to track</button>
  //       <br /><br />
  //       {!isSignedIn ? <SignInPrompt onClick={() => wallet.signIn()} /> : <SignOutButton accountId={wallet.accountId} onClick={() => wallet.signOut()} />}
  //     </p>
  //   </main>
  // );
}

function Track({ trackId, setTrackId }) {
  return (
    <Track></Track>
  )
}

function Create({wallet}) {
  return (
    <Create></Create>
  )

  // const [thingName, setThingName] = React.useState("");

  async function createNewThing(wallet) {
    // TODO: validate that all things are set
    const keyStore = new keyStores.BrowserLocalStorageKeyStore()
    const near = await connect({
      networkId: 'testnet',
      keyStore,
      nodeUrl: 'https://rpc.testnet.near.org'
    });
    const account = await near.account(wallet.accountId);
    const keyPair = await keyStore.getKey('testnet', wallet.accountId)

    const contractAccountId = `${uuid()}.${wallet.accountId}`;
    await account.createAccount(contractAccountId, keyPair.getPublicKey(), "8000000000000000000000000");
    await keyStore.setKey('testnet', contractAccountId, keyPair);
    const contractAccount = await near.account(contractAccountId);
    const contractBytes = new Uint8Array(await httpGetAsync(contractWasm))
    contractAccount.deployContract(contractBytes)
    return contractAccountId;
  }
  // return (
  // <>
  //   <h2>
  //     Create
  //   </h2>
  //   <form>
  //       <label>
  //         Name:
  //         <input type="text" name="name" onChange={(e) => setThingName(e.target.value)} />
  //       </label>
  //       <br/><br/>
  //       <input type="button" onClick={() => createNewThing(wallet)} value="Submit" />
  //   </form>
  // </>
  // );

  // async function createNewThing(wallet) {
  //   // TODO: validate that all things are set
  //   const near = await connect({
  //     networkId: 'testnet',
  //     keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  //     nodeUrl: 'https://rpc.testnet.near.org'
  //   });
  //   const account = await near.account(wallet.accountId);
  //   const keyPair = await account.findAccessKey(null, null)
  //   const subAccountId = `${uuid()}.${wallet.accountId}`;
  //   const newAccount = await account.createAndDeployContract(subAccountId, keyPair.publicKey, contractWasm, 5);
  //   console.log(newAccount)
  // }
}

function httpGetAsync(theUrl) {
  return new Promise ((resolve, reject) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.responseType = 'arraybuffer';
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            resolve(xmlHttp.response);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
  })
}

//   

//   /// If user not signed-in with wallet - show prompt
//   // Sign-in flow will reload the page later
  // if (!trackId && !showCreateDialog) {
    
  // }



//   if (showCreateDialog) {

//   }

//   if (trackId) {
//     return (
//       <main>
//         Track thing with id {trackId}
//       </main>
//     );
//   }



//   //   function changeGreeting(e) {
//   //     e.preventDefault();
//   //     setUiPleaseWait(true);
//   //     const { greetingInput } = e.target.elements;
//   //     helloNEAR.setGreeting(greetingInput.value)
//   //       .then(async () => { return helloNEAR.getGreeting(); })
//   //       .then(setValueFromBlockchain)
//   //       .finally(() => {
//   //         setUiPleaseWait(false);
//   //       });
//   //   }
//   if (!dropdown) {
//   }
// }


// if (!button){
//   return(
//     <Router>
//       <div>
//         
//         <Link to="/about">
//           <button>Click</button>
//         </Link>

//         <br />
//         <br />

//         
//         <a href="https://google.com" target="_blank" rel="noreferrer">
//           <button>Click</button>
//         </a>
//       </div>
//     </Router>
//   )
// }


  // Get blockchain state once on component load
  // React.useEffect(() => {
  //   helloNEAR.getGreeting()
  //     .then(setValueFromBlockchain)
  //     .catch(alert)
  //     .finally(() => {
  //       setUiPleaseWait(false);
  //     });
  // }, []);
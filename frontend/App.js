import 'regenerator-runtime/runtime';
import React from 'react';
import contractWasm from "url:./hello_near.wasm";
import { account } from 'near-api-js';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { randomUUID } from 'crypto';

import './assets/global.css';

import { SignInPrompt, SignOutButton } from './ui-components';

export default function App({ isSignedIn, helloNEAR, wallet }) {
  const [trackId, setTrackId] = React.useState("");

  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/track">Track</Link>
            </li>
            <li>
              <Link to="/create">Create</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/track" element={<Track trackId={trackId} setTrackId={setTrackId} />} />
          <Route path="/create" element={<Create wallet={wallet} />} />
          <Route path="/" element={<Home isSignedIn={isSignedIn} wallet={wallet} setTrackId={setTrackId} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

function Home({ isSignedIn, wallet, setTrackId }) {
  const navigate = useNavigate();

  return (
    <main>
      <p style={{ textAlign: 'center' }}>
        <input type="text"
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              setTrackId(event.target.value)
              navigate('/track')
            }
          }}
          placeholder="Enter ID to track" />
        <br /><br />
        <button onClick={() => navigate('/create')}>Create new thing to track</button>
        <br /><br />
        {!isSignedIn ? <SignInPrompt onClick={() => wallet.signIn()} /> : <SignOutButton accountId={wallet.accountId} onClick={() => wallet.signOut()} />}
      </p>
    </main>
  );
}

function Track({ trackId, setTrackId }) {
  return (
    <>
      <h2>Track</h2>;
      <p>Tracking {trackId}</p>
    </>
  )
}

function Create({wallet}) {
  const [thingName, setThingName] = React.useState("");

  return (
  <>
    <h2>
      Create
    </h2>
    <form>
        <label>
          Name:
          <input type="text" name="name" onChange={(e) => setThingName(e.target.value)} />
        </label>
        <br/><br/>
        <input onClick={() => createNewThing(wallet)} value="Submit" />
    </form>
  </>
  );

  async function createNewThing(wallet) {
    // TODO: validate that all things are set
    console.log(wallet)
    const account = await wallet.getWalletSelector().account(wallet.accountId);
    const newAccount = await account.createAndDeployContract(`${randomUUID()}.${wallet.accountId}`,
      wallet.publicKey, contractWasm, 5);
    console.log(newAccount);
  }
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
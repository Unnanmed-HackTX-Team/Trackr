import React from 'react';
import { useState } from "react";
import { useZxing } from "react-zxing";

export const BarcodeScanner = () => {
  const [result, setResult] = useState("");
  const { ref } = useZxing({
    onResult(result) {
      setResult(result.getText());
    },
  });

  console.log("result", result);

  return (
    <>
      <video ref={ref} />
      <p>
        <span>Last result:</span>
        <span>{result}</span>
      </p>
    </>
  );
};

export function IDsearch(result, onClick){
  return (
    <button style={{ float: 'right' }} onClick={onClick}>
     </button>
  );
}
MetaData = []
//need to put data into the table
export function MetaData(){
  return (
    <div className = "MetaData">
      <table className= "MetaData_table">
        <tr>
          <th>Date</th>
          <th>Creator</th>
          <th>Name</th>
          <th>Description</th>
        </tr>
        {MetaData.map((val, key) =>{
        return(
          <tr key = {key}>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        )
        })}
      </table>
    </div>
  );
}

const DropCategory = () => {
  return (
    <div>
      <label>
        
        <select>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
        </select>
      </label>
    </div>
  );
};

export function SignInPrompt({ onClick }) {
  return (
    <main>
      <h3>
        Welcome to Trackr!
      </h3>
      <br />
      <p style={{ textAlign: 'center' }}>
        <button onClick={onClick}>Sign in with NEAR Wallet</button>
      </p>
    </main>
  );
}

// export function SignOutButton({ accountId, onClick }) {
//   return (
//     <button style={{ float: 'right' }} onClick={onClick}>
//       Sign out {accountId}
//     </button>
//   );
// }

// export function EducationalText() {
//   return (
//     <>
//       <p>
//         Look at that! A Hello World app! This greeting is stored on the NEAR blockchain. Check it out:
//       </p>
//       <ol>
//         <li>
//           Look in <code>frontend/App.js</code> - you'll see <code>getGreeting</code> and <code>setGreeting</code> being called on <code>contract</code>. What's this?
//         </li>
//         <li>
//           Ultimately, this <code>contract</code> code is defined in <code>./contract</code> – this is the source code for your <a target="_blank" rel="noreferrer" href="https://docs.near.org/docs/develop/contracts/overview">smart contract</a>.</li>
//         <li>
//           When you run <code>npm run deploy</code>, the code in <code>./contract</code> gets deployed to the NEAR testnet. You can see how this happens by looking in <code>package.json</code>.</li>
//       </ol>
//       <hr />
//       <p>
//         To keep learning, check out <a target="_blank" rel="noreferrer" href="https://docs.near.org">the NEAR docs</a> or look through some <a target="_blank" rel="noreferrer" href="https://examples.near.org">example apps</a>.
//       </p>
//     </>
//   );
// }


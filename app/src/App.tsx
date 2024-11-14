// src/App.jsx
import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Web3 from "web3";

import "./App.css";

const App = () => {
  const [count, setCount] = useState(0);
  const [account, setAccount] = useState(null);

  // useEffect(() => {
  //   const initWeb3 = async () => {
  //     // Check if MetaMask is installed
  //     if (typeof window.ethereum !== 'undefined') {
  //       const web3 = new Web3(window.ethereum);
  //       try {
  //         // Request account access
  //         await window.ethereum.request({ method: 'eth_requestAccounts' });
  //         const accounts = await web3.eth.getAccounts();
  //         setAccount(accounts[0]);
  //       } catch (error) {
  //         console.error("User denied account access or error occurred");
  //       }
  //     } else {
  //       console.error("MetaMask not found. Please install it to interact with the blockchain.");
  //     }
  //   };
  //   initWeb3();
  // }, []);

  return (
    <div>
      <div>Your account: {account}</div>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
};

export default App;

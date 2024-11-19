// src/App.jsx
import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { cryptoZombiesABI } from "./cryptozombies-abi";
import {Web3,Contract} from "web3";

import "./App.css";

const App = () => {
  const [count, setCount] = useState(0);
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    let cryptoZombies: Contract<typeof cryptoZombiesABI>;
    let userAccount;

    function startApp() {
      const cryptoZombiesAddress = "YOUR_CONTRACT_ADDRESS";
      cryptoZombies = new Contract(cryptoZombiesABI, cryptoZombiesAddress);

      var accountInterval = setInterval(function() {
        // Check if account has changed
        if (web3.eth.accounts[0] !== userAccount) {
          userAccount = web3.eth.accounts[0];
          // Call a function to update the UI with the new account
          getZombiesByOwner(userAccount)
          .then(displayZombies);
        }
      }, 100);
    }

    function displayZombies(ids) {
      $("#zombies").empty();
      for (const id of ids) {
        // Look up zombie details from our contract. Returns a `zombie` object
        getZombieDetails(id)
        .then(function(zombie) {
          // Using ES6's "template literals" to inject variables into the HTML.
          // Append each one to our #zombies div
          $("#zombies").append(`<div class="zombie">
            <ul>
              <li>Name: ${zombie.name}</li>
              <li>DNA: ${zombie.dna}</li>
              <li>Level: ${zombie.level}</li>
              <li>Wins: ${zombie.winCount}</li>
              <li>Losses: ${zombie.lossCount}</li>
              <li>Ready Time: ${zombie.readyTime}</li>
            </ul>
          </div>`);
        });
      }
    }

    function createRandomZombie(name) {
      // This is going to take a while, so update the UI to let the user know
      // the transaction has been sent
      $("#txStatus").text("Creating new zombie on the blockchain. This may take a while...");
      // Send the tx to our contract:
      return cryptoZombies.methods.createRandomZombie(name)
      .send({ from: userAccount })
      .on("receipt", function(receipt) {
        $("#txStatus").text("Successfully created " + name + "!");
        // Transaction was accepted into the blockchain, let's redraw the UI
        getZombiesByOwner(userAccount).then(displayZombies);
      })
      .on("error", function(error) {
        // Do something to alert the user their transaction has failed
        $("#txStatus").text(error);
      });
    }

    function feedOnKitty(zombieId, kittyId) {
      $("#txStatus").text("Eating a kitty. This may take a while...");
      return cryptoZombies.methods.feedOnKitty(zombieId, kittyId)
      .send({ from: userAccount })
      .on("receipt", function(receipt) {
        $("#txStatus").text("Ate a kitty and spawned a new Zombie!");
        getZombiesByOwner(userAccount).then(displayZombies);
      })
      .on("error", function(error) {
        $("#txStatus").text(error);
      });
    }

    function getZombieDetails(id: number) {
      return cryptoZombies.methods.zombies(id).call()
    }

    function zombieToOwner(id: number) {
      return cryptoZombies.methods.zombieToOwner(id).call()
    }

    function getZombiesByOwner(owner: string) {
      return cryptoZombies.methods.getZombiesByOwner(owner).call()
    }

    const initWeb3 = async () => {

      startApp()

      // if (typeof web3 !== "undefined") {
      //   // Use Mist/MetaMask's provider
      //   web3js = new Web3(web3.currentProvider);
      // } else {
      //   // Handle the case where the user doesn't have web3. Probably
      //   // show them a message telling them to install Metamask in
      //   // order to use our app.
      // }

      // Check if MetaMask is installed
      // if (typeof window.ethereum !== "undefined") {
      //   const web3 = new Web3(window.ethereum);
      //   try {
      //     // Request account access
      //     await window.ethereum.request({ method: "eth_requestAccounts" });
      //     const accounts = await web3.eth.getAccounts();
      //     setAccount(accounts[0]);
      //   } catch (error) {
      //     console.error("User denied account access or error occurred", error);
      //   }
      // } else {
      //   console.error(
      //     "MetaMask not found. Please install it to interact with the blockchain."
      //   );
      // }
    };
    initWeb3();
  }, []);

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

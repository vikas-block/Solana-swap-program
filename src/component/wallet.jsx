import { useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";

const Wallet = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const connection = new Connection("https://api.mainnet-beta.solana.com");

  window.onload = async function () {
    try {
      if (window.solana) {
        const solana = window.solana;
        if (solana.isPhantom) {
          console.log("Phantom wallet found!");
          const res = await solana.connect({ onlyIfTrusted: true });
          console.log("Connected with public Key :", res.publicKey.toString());
          //  setWalletAddress(res.publicKey.toString());
        }
      } else {
        alert("Wallet not found! Get a phantom wallet");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;
    if (solana) {
      const response = await solana.connect();
      setWalletAddress(response.publicKey.toString());
    }
  };


  return (
    <>
      <div className="wallet">
        {!walletAddress ? (
          <button className="wallet-btn" onClick={connectWallet}>
            Connect Wallet
          </button>
        ) : (
          <button className="wallet-btn">connected</button>
        )}
      </div>
    </>
  );
};
export default Wallet;

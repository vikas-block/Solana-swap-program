import { useEffect, useState } from "react";
import Axios from "./axios";
import Wallet from "./wallet";

const Exchange = () => {
  const [fromCrypto, setFromCrypto] = useState(null);
  const [toCrypto, setToCrypto] = useState(null);
  const [amountIn, setAmountIn] = useState(0);
  const [amountOut, setAmountOut] = useState(0);
  const [cryptoPrice, setCryptoPrice] = useState(null);
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch(
          "https://tokens.jup.ag/tokens?tags=verified"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tokens");
        }
        const data = await response.json();
        setTokens(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTokens();
  }, []);

  //fetching price
  async function getPrice() {
    if (fromCrypto && toCrypto) {
      const response1 = await Axios(fromCrypto.address);
      const response2 = await Axios(toCrypto.address);

      console.log(
        `Response 1 (${fromCrypto.address}):`,
        response1.data?.data[fromCrypto.address]?.price
      );
      console.log(
        `Response 2 (${toCrypto.address}):`,
        response2.data?.data[toCrypto.address]?.price
      );

      // Extracting price of crypto
      const fromPrice = response1.data.data[fromCrypto.address]?.price;
      console.log(`CRYPTO 1 (${fromCrypto.address} Price):-`, fromPrice);

      const toPrice = response2.data.data[toCrypto.address]?.price;
      console.log(`CRYPTO 2 (${toCrypto.address} Price):-`, toPrice);

      setCryptoPrice(fromPrice / toPrice);
    }
  }

  //call getPrice function if token change
  useEffect(() => {
    getPrice();
  }, [fromCrypto, toCrypto]);

  //swap crypto price as per amountIN
  useEffect(() => {
    setAmountOut(amountIn * cryptoPrice);
  }, [amountIn, cryptoPrice]);

  const handleTokenSelect = (token) => {
    setFromCrypto(token);
  };

  const handleTokenSelect2 = (token) => {
    setToCrypto(token);
  };

  return (
    <>
      <div className="main">
        <div className="screen">
          <div className="box">
            <h1 className="heading">Solana Token Swap</h1>

            <div className="input-group">
              <label className="label">You pay</label>
              <div className="input-row">
                <div className="custom-select">
                  <div className="selected-option">
                    {fromCrypto ? (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={fromCrypto.logoURI}
                          alt={fromCrypto.symbol}
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            marginRight: "10px",
                          }}
                        />
                        <span>{fromCrypto.symbol}</span>
                      </div>
                    ) : (
                      <span>Select a token</span>
                    )}
                  </div>

                  <ul className="dropdown-options">
                    {tokens.map((token) => (
                      <li
                        key={token.id}
                        onClick={() => handleTokenSelect(token)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "5px",
                          cursor: "pointer",
                        }}
                      >
                        <img
                          src={token.logoURI}
                          alt={token.symbol}
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            marginRight: "10px",
                          }}
                        />
                        <span>{token.symbol}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <input
                  type="number"
                  className="input"
                  value={amountIn}
                  onChange={(e) => setAmountIn(e.target.value)}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="label">You recieve</label>
              <div className="input-row">
                <div className="custom-select">
                  <div className="selected-option">
                    {toCrypto ? (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={toCrypto.logoURI}
                          alt={toCrypto.symbol}
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            marginRight: "10px",
                          }}
                        />
                        <span>{toCrypto.symbol}</span>
                      </div>
                    ) : (
                      <span>Select a token</span>
                    )}
                  </div>

                  <ul className="dropdown-options">
                    {tokens.map((token) => (
                      <li
                        key={token.id}
                        onClick={() => handleTokenSelect2(token)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "5px",
                          cursor: "pointer",
                        }}
                      >
                        <img
                          src={token.logoURI}
                          alt={token.symbol}
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            marginRight: "10px",
                          }}
                        />
                        <span>{token.symbol}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <input
                  type="text"
                  className="input"
                  value={amountOut.toFixed(4)}
                  readOnly
                />
              </div>
            </div>

            <Wallet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Exchange;

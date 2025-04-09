import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { ClipboardCopy } from "lucide-react";

export function EthWallet({ mnemonic, showCopied }) {
  const [wallets, setWallets] = useState([]);

  const addWallet = async () => {
    const index = wallets.length;
    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/${index}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const wallet = new Wallet(child.privateKey);
    setWallets([...wallets, { index: index + 1, address: wallet.address }]);
  };

  return (
    <div className="wallet-section">
      <h2>Ethereum Wallets</h2>
      <button className="wallet-btn" onClick={addWallet}>Add Wallet</button>
      {wallets.map((wallet) => (
        <div key={wallet.index} className="wallet-item hover-glow">
          <div className="wallet-label">Wallet {wallet.index}</div>
          <div className="wallet-address">
            <span>{wallet.address} <span className="tag">(ETH)</span></span>
            <ClipboardCopy className="copy-icon" onClick={() => {
              navigator.clipboard.writeText(wallet.address);
              showCopied();
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}

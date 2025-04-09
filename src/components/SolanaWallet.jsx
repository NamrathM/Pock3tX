import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { ClipboardCopy } from "lucide-react";

export function SolanaWallet({ mnemonic, showCopied }) {
  const [wallets, setWallets] = useState([]);

  const addWallet = async () => {
    const index = wallets.length;
    const seed = await mnemonicToSeed(mnemonic);
    const path = `m/44'/501'/${index}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    setWallets([...wallets, { index: index + 1, publicKey: keypair.publicKey.toBase58() }]);
  };

  return (
    <div className="wallet-section">
      <h2>Solana Wallets</h2>
      <button className="wallet-btn" onClick={addWallet}>Add Wallet</button>
      {wallets.map((wallet) => (
        <div key={wallet.index} className="wallet-item hover-glow">
          <div className="wallet-label">Wallet {wallet.index}</div>
          <div className="wallet-address">
            <span>{wallet.publicKey} <span className="tag">(SOL)</span></span>
            <ClipboardCopy className="copy-icon" onClick={() => {
              navigator.clipboard.writeText(wallet.publicKey);
              showCopied();
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}

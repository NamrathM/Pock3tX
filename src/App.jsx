import { useState } from 'react';
import './App.css';
import { SolanaWallet } from './components/SolanaWallet';
import { EthWallet } from './components/EthWallet';
import Toast from './components/Toast';
import { ClipboardCopy } from 'lucide-react';
import Logo from './assets/logo.png';

function App() {
  const [mnemonic, setMnemonic] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const showCopied = (msg = 'Copied!') => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1000);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-title-wrapper">
          <img src={Logo} alt="Pock3tX logo" className="logo enlarged-logo" />
          <h1 className="title enlarged-title">
            <span className="white">Pock3t</span><span className="gold">X</span>
          </h1>
        </div>
      </header>

      <section className="tagline-section">
        <p className="tagline centered-tagline">
          The gateway to your decentralized world — right in your pocket.
        </p>
      </section>

      {!mnemonic && (
        <button className="generate-btn" onClick={async () => {
          const { generateMnemonic } = await import('bip39');
          const mn = await generateMnemonic();
          setMnemonic(mn);
        }}>
          Generate Seed Phrase
        </button>
      )}

      {mnemonic && (
        <>
          <div className="mnemonic-section">
            <h2 className="section-title">Your Seed Phrase</h2>
            <div className="caution-text-wrapper">
              <p className="caution-text">⚠️ Store it in a safe place or copy it securely.</p>
              <ClipboardCopy
                className="copy-icon"
                onClick={() => {
                  navigator.clipboard.writeText(mnemonic);
                  showCopied("Seed phrase copied!");
                }}
              />
            </div>

            <div className="mnemonic-grid">
              {mnemonic.split(' ').map((word, index) => (
                <div key={index} className="mnemonic-card hover-pop">
                  <span className="index">{index + 1}.</span> {word}
                </div>
              ))}
            </div>
          </div>

          <SolanaWallet mnemonic={mnemonic} showCopied={showCopied} />
          <EthWallet mnemonic={mnemonic} showCopied={showCopied} />
        </>
      )}

      <Toast message={toastMessage} show={showToast} />
    </div>
  );
}

export default App;

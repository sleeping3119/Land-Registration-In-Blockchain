# 🏡 Blockchain Land Registry

A decentralized land registration dApp ensuring secure, transparent, and tamper-proof property transactions using Ethereum, Solidity, and React.

---

## 🚀 Features

- 🔐 **MetaMask Login** – Secure login for Buyers, Sellers & Management
- 📜 **Smart Contract Ledger** – Lands & balances stored on Ethereum
- 🛒 **Buy/Sell Land** – Instantly transfer ownership with balance deduction
- 👥 **Management Panel** – Admin can add balance, delete users/lands
- 💰 **On-Chain Balance System** – All payments handled on blockchain

---

## ⚙️ Tech Stack

- **Frontend:** React.js + MetaMask
- **Smart Contract:** Solidity (Ethereum)
- **Backend (User Data):** JSON / Node.js
- **Tools:** Hardhat, Web3.js

---

## 🔧 Core Smart Contract Functions

- `addUser(address, balance)`
- `addLand(...)`
- `buyLand(landId)`
- `deleteUser(address)`
- `deleteLand(landId)`
- `addBalance(address, amount)`
- `fetchLandsForSale()` / `fetchLandsByOwner()`

---

## 📦 Project Setup

```bash
git clone https://github.com/sleeping3119/land-registry-blockchain.git
cd client && npm install
npx hardhat compile && npx hardhat run scripts/deploy.js
npm start

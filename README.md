![Avalanche](https://img.shields.io/badge/Built%20on-Avalanche-red)
![Solidity](https://img.shields.io/badge/Solidity-Smart%20Contracts-blue)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

# Ping2Pay

Chat-native crypto payments built on Avalanche.

Ping2Pay enables users to send and receive crypto directly through messaging platforms like **WhatsApp and Telegram**.

Instead of asking users to download wallets, manage seed phrases, or learn complex interfaces, Ping2Pay allows users to send crypto as easily as sending a message.

---

## Problem

Crypto payments remain difficult for everyday users.

Traditional wallets require:

* Seed phrase management
* Complex UI flows
* Gas fee understanding
* Technical knowledge

These barriers prevent mainstream crypto adoption.

---

## Solution

Ping2Pay abstracts blockchain complexity behind messaging interfaces.

Users simply send messages like:

```
send 10 USDT to Rahul
```

Ping2Pay processes the request and executes the transaction on-chain.

The blockchain handles the settlement.
The user experiences simple messaging.

---

## Key Features

* Chat-based crypto payments
* Phone-number linked wallets
* Avalanche blockchain settlement
* Conversational payment commands
* No wallet installation required
* Automatic wallet creation

---

## Architecture

Ping2Pay consists of five core components:

1. Messaging Interface
2. Chat Processing Engine
3. Wallet Management System
4. Blockchain Interaction Layer
5. Notification System

Architecture Diagram:

![Architecture](docs/architecture.png)

Payment Flow:

![Payment Flow](docs/flow.png)

---

## How It Works

1. User opens **WhatsApp or Telegram**
2. User starts a chat with the Ping2Pay bot
3. A wallet is automatically generated for the user
4. User sends a command:

```
send 5 AVAX to Rahul
```

5. Backend parses the request
6. Transaction is signed and broadcast to Avalanche
7. Confirmation is returned in chat

---

## Example Commands

```
help
wallet
balance
deposit 0.01
send 0.001 to +919XXXXXXXXX
```

---

## Tech Stack

### Blockchain

* Avalanche C-Chain
* Solidity Smart Contracts
* Hardhat

### Backend

* Node.js
* Express
* Ethers.js

### Messaging

* whatsapp-web.js
* Telegram Bot API

### Infrastructure

* RPC Providers
* Cloud Deployment

---

## Smart Contract

Network: **Avalanche Fuji Testnet**

Contract Address

```
0x6C37935C4e791a996a93e0Daa8126CA8174057b0
```

Snowtrace Explorer

https://testnet.snowtrace.io/address/0x6C37935C4e791a996a93e0Daa8126CA8174057b0

---

## Demo

Bot Screenshot

![Demo](docs/demo.png)

---

## Demo Video

Watch Ping2Pay in action:

[![Ping2Pay Demo](https://img.youtube.com/vi/u8gf4m2qPBc/0.jpg)](https://youtu.be/u8gf4m2qPBc)

This demo shows Ping2Pay executing crypto payments directly through WhatsApp commands.

---

## Setup Instructions

Clone the repository

```
git clone https://github.com/saurabhnage/ping2pay-avalanche.git
```

Install dependencies

```
npm install
```

Run backend

```
node backend/index.js
```

Deploy smart contracts

```
npx hardhat run scripts/deploy.js --network avalancheFuji
```

---

## Future Roadmap

* WhatsApp Business API integration
* Stablecoin support (USDT / USDC)
* Escrow smart contracts
* Merchant payment system
* Multi-chain compatibility
* Gasless transactions

---

## Why Ping2Pay Matters

Crypto infrastructure has matured significantly over the last decade.
However, **usability remains the biggest barrier to mass adoption**.

Today, most users must:

* Install wallet applications
* Manage seed phrases
* Understand gas fees
* Navigate complex interfaces

For billions of people, these steps create friction that prevents them from ever using crypto.

At the same time, messaging platforms like **WhatsApp, Telegram, and WeChat already serve billions of users globally** and are deeply embedded in everyday communication.

Ping2Pay flips the traditional approach.

Instead of asking users to learn new tools, **Ping2Pay brings crypto directly into platforms people already use**.

Sending crypto becomes as simple as sending a message:

```
send 10 USDT to Rahul
```

Behind the scenes, Ping2Pay handles:

* Wallet creation
* Transaction signing
* Blockchain settlement
* Confirmation delivery

This model has the potential to unlock **the next billion crypto users**, transforming messaging platforms into global financial rails.

Ping2Pay is not just a payment tool — it is a step toward **chat-native financial infrastructure**.

---

## Vision

Mass adoption of crypto will not happen through new apps.

It will happen when crypto integrates into platforms people already use.

Ping2Pay brings crypto payments directly into everyday conversations.

---

## License

MIT License

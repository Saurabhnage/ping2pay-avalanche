# Ping2Pay

Ping2Pay is a chat-native crypto payment system built on Avalanche that enables users to send and receive tokens directly through messaging platforms like WhatsApp and Telegram.

Instead of asking users to download wallet apps or manage seed phrases, Ping2Pay integrates crypto payments into chat interfaces where billions of users already communicate daily.

---

## Problem

Crypto payments remain difficult for everyday users.

Traditional wallets require:
- seed phrase management
- complex UI flows
- gas fee understanding
- technical knowledge

This creates friction that prevents mainstream adoption.

---

## Solution

Ping2Pay abstracts blockchain complexity behind messaging interfaces.

Users simply send messages like:


Send 10 USDT to Rahul


Ping2Pay processes the request and executes the transaction on-chain.

---

## Key Features

- Chat-based crypto payments
- Phone-number linked wallets
- Avalanche blockchain settlement
- Simple conversational commands
- No wallet installation required

---

## Tech Stack

Blockchain
- Avalanche C-Chain
- Solidity Smart Contracts
- Hardhat

Backend
- Node.js
- Express
- Ethers.js

Messaging
- Telegram Bot API
- WhatsApp Business API (planned)

Infrastructure
- RPC Providers
- Cloud deployment

---

## Architecture

Ping2Pay has five core components:

1. Messaging Interface
2. Chat Processing Engine
3. Wallet Management System
4. Blockchain Interaction Layer
5. Notification System

Full architecture is documented in `/docs/architecture.md`.

---

## How It Works

1. User opens WhatsApp or Telegram.
2. User starts chat with Ping2Pay bot.
3. Wallet is automatically generated.
4. User sends command:


Send 5 USDT to Rahul


5. Backend parses the request.
6. Transaction is signed and broadcast to Avalanche.
7. Confirmation is sent in chat.

---

## Smart Contracts

Smart contracts handle:

- escrow payments
- transaction recording
- future programmable payments

---

## Setup Instructions

Clone the repository


git clone https://github.com/saurabhnage/ping2pay-avalanche.git


Install dependencies


npm install


Run backend


node backend/index.js


Deploy smart contracts


npx hardhat run scripts/deploy.js --network avalancheFuji


---

## Future Roadmap

- WhatsApp Business API integration
- Stablecoin support (USDT)
- Escrow payments
- Merchant payment support
- Multi-chain compatibility

---

## Vision

Mass adoption of crypto will not happen through new apps.

It will happen when crypto integrates into platforms people already use.

Ping2Pay brings crypto payments into everyday conversations.

---

## License

MIT License

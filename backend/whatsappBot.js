import { getOrCreateWallet } from "./walletManager.js"
import pkg from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { ethers } from "ethers";
import dotenv from "dotenv";
import { sendPayment } from "./sendPayment.js";

dotenv.config();

const { Client, LocalAuth } = pkg;

/* ---------------- WHATSAPP CLIENT ---------------- */

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "ping2pay"
    }),
    puppeteer: {
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    }
});

/* ---------------- BLOCKCHAIN SETUP ---------------- */

const provider = new ethers.JsonRpcProvider(process.env.AVALANCHE_RPC);

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress =
"0x6C37935C4e791a996a93e0Daa8126CA8174057b0";

const abi = [
    "function deposit() payable",
    "function withdraw(uint256 amount)",
    "function balances(address) view returns(uint256)"
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

/* ---------------- WHATSAPP EVENTS ---------------- */

client.on("qr", qr => {
    console.log("Scan this QR with WhatsApp:");
    qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
    console.log("Ping2Pay WhatsApp Bot Ready 🚀");
});

/* ---------------- MESSAGE HANDLER ---------------- */

client.on("message_create", async msg => {

    // ignore bot messages
    if (msg.fromMe) return;

    // ignore WhatsApp status
    if (msg.from === "status@broadcast") return;

    // ignore groups
    if (msg.from.endsWith("@g.us")) return;

    const phone = msg.from;

    console.log("Raw message:", msg.body);

    const commands = msg.body
        .toLowerCase()
        .split("\n")
        .map(c => c.trim())
        .filter(Boolean);

    for (const text of commands) {

        console.log("Processing command:", text);

        const allowedCommands = [
            "ping",
            "help",
            "wallet",
            "balance",
            "deposit",
            "send"
        ];

        if (!allowedCommands.some(cmd => text.startsWith(cmd))) continue;

        /* -------- ping -------- */

        if (text === "ping") {
            await msg.reply("Ping2Pay running 🚀");
            continue;
        }

        /* -------- help -------- */

        if (text === "help") {

            await msg.reply(
`Ping2Pay Commands 💬

wallet — view your wallet
balance — check balance
deposit <amount> — deposit AVAX
send <amount> to <phone> — send AVAX

Example:
deposit 0.01`
            );

            continue;
        }

        /* -------- wallet -------- */

        if (text === "wallet") {

            const user = await getOrCreateWallet(phone);

            await msg.reply(
`Your Ping2Pay Wallet 💰

Address:
${user.address}`
            );

            continue;
        }

        /* -------- balance -------- */

        if (text === "balance") {

            try {

                const user = await getOrCreateWallet(phone);

                const contractBalance = await contract.balances(user.address);
                const walletBalance = await provider.getBalance(user.address);

                const contractFormatted = ethers.formatEther(contractBalance);
                const walletFormatted = ethers.formatEther(walletBalance);

                await msg.reply(
`Your Ping2Pay Balance 💰

Wallet Balance:
${walletFormatted} AVAX

Contract Balance:
${contractFormatted} AVAX`
                );

            } catch (err) {

                console.error(err);
                await msg.reply("Unable to fetch balance ❌");

            }

            continue;
        }

        /* -------- deposit -------- */

        if (text.startsWith("deposit")) {

            try {

                const user = await getOrCreateWallet(phone);

                const parts = text.split(" ");
                const amount = parts[1];

                if (!amount) {
                    await msg.reply("Usage: deposit <amount>");
                    continue;
                }

                const tx = await contract.deposit({
                    value: ethers.parseEther(amount)
                });

                await tx.wait();

                await msg.reply(
`Deposit successful ✅

Tx:
https://testnet.snowtrace.io/tx/${tx.hash}`
                );

            } catch (err) {

                console.error(err);
                await msg.reply("Transaction failed ❌");

            }

            continue;
        }

       /* -------- send -------- */

        if (text.startsWith("send")) {

            try {

                const parts = text.split(" ");
                const amount = parts[1];

                if (!amount) {
                    await msg.reply("Usage: send <amount> or reply 'send <amount>'");
                    continue;
                }

                let recipientWhatsApp;

                /* reply-to-pay */

                if (msg.hasQuotedMsg) {

                    const quoted = await msg.getQuotedMessage();
                    recipientWhatsApp = quoted.from;

                } else {

                    /* phone-number pay */

                    let recipientPhone = parts[3] || parts[2];

                    if (!recipientPhone) {
                        await msg.reply("Usage: send <amount> to <phone> or reply to a message");
                        continue;
                    }

                    recipientPhone = recipientPhone
                        .replace("+","")
                        .replace(" ","");

                    recipientWhatsApp = recipientPhone + "@c.us";
                }

                const recipientUser = await getOrCreateWallet(recipientWhatsApp);

                const txHash = await sendPayment(
                    process.env.PRIVATE_KEY,
                    recipientUser.address,
                    amount
                );

                await msg.reply(
        `Payment sent ✅

        Amount: ${amount} AVAX

        Tx:
        https://testnet.snowtrace.io/tx/${txHash}`
                );

                /* notify receiver */

                await client.sendMessage(
                    recipientWhatsApp,
        `You received ${amount} AVAX 💰

        Tx:
        https://testnet.snowtrace.io/tx/${txHash}`
                );

            } catch (err) {

                console.error(err);
                await msg.reply("Payment failed ❌");

            }

            continue;
        }

    }

});

/* ---------------- START BOT ---------------- */

client.initialize();
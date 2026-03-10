import { Low } from "lowdb"
import { JSONFile } from "lowdb/node"
import { ethers } from "ethers"

const adapter = new JSONFile("backend/database/users.json")

// default database structure
const db = new Low(adapter, {
    users: []
})

await db.read()

export async function getOrCreateWallet(phone) {

    let user = db.data.users.find(u => u.phone === phone)

    if (!user) {

        const wallet = ethers.Wallet.createRandom()

        user = {
            phone,
            address: wallet.address,
            privateKey: wallet.privateKey
        }

        db.data.users.push(user)

        await db.write()

        console.log("New wallet created:", wallet.address)
    }

    return user
}
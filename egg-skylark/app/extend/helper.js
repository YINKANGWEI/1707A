
const crypto = require("crypto")

const help = (pwd) => {
    return md5 = crypto.createHash("md5")
    .update(pwd)
    .digest("hex")
}

module.exports = {
    help
}
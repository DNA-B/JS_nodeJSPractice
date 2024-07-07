import crypto, { Cipher } from "crypto";
import { CLIENT_RENEG_LIMIT } from "tls";

// createHash() --> print b9c950640e1b3740e98acb93e669c65766f6670dd1609ba91ff41052ba48c6f3
const hash = crypto.createHash("sha256");
hash.update("password1234");
console.log(hash.digest("hex"));

// randomBytes() --> print random string c28ee63bbef70e8ab7cab46115c99e6c
crypto.randomBytes(16, (err, buf) => {
    if (err) throw err;
    console.log(buf.toString("hex"));
});

// createCipheriv & createDecipheriv
const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
// print encrypte bc33012dc108d3fe870d5bc0f9977b3f
const cipher = crypto.createCipheriv(algorithm, key, iv);
let encrypted = cipher.update("Hello, this is a secret message", "utf8", "hex");
encrypted += cipher.final("hex");
console.log(encrypted);
// print decrypte
const decipher = crypto.createDecipheriv(algorithm, key, iv);
let decrypted = decipher.update(encrypted, "hex", "utf8");
decrypted += decipher.final("utf-8");
console.log(decrypted);

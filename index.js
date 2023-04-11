const {encrypt,decrypt} = require('./bcrypt');
const {encryptRSA,decryptRSA,keyPair}=require('./rsaAlgorithm');
const {AESencrypt,AESdecrypt,Aeskey} = require('./AES');



const encrypting = (text,key) => {

    let hashingTextSycrpt = encrypt(text,key);
    
    let hashingTextRsa = encryptRSA(keyPair.publicKey,hashingTextSycrpt);
// 
    let hashingTextAes = AESencrypt(hashingTextRsa,Aeskey);

    return hashingTextAes;
}



const decrypting = (text,key,plaintext) => {

    let decryptingTextAes = AESdecrypt(text,Aeskey);
    let decryptingTextRsa = decryptRSA(keyPair.privateKey,decryptingTextAes);
    let decryptingTextSycrpt = decrypt(decryptingTextRsa,key);
    console.log(`This is final decrypting text: ${decryptingTextSycrpt}`);

    if(decryptingTextSycrpt === plaintext) return true;
    return false
    
    
}

let msg = 'Aa$123456';

let testone = encrypting(msg,12);
console.log(testone);

let testtow = decrypting(testone,12,msg);
console.log(testtow);


module.exports= {encrypting,decrypting}

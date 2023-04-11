const {encrypt,decrypt} = require('./bcrypt');

function generateRSAKeyPair() {
    // Generate two random prime numbers
    const p = generateRandomPrimeNumber();
    const q = generateRandomPrimeNumber();
  
    // Calculate n and phi(n)
    const n = p * q;
    const phi = (p - 1) * (q - 1);
  
    // Choose a random integer e that is coprime to phi(n)
    let e;
    do {
      e = Math.floor(Math.random() * phi) + 1;
    } while (gcd(e, phi) !== 1);
  
    // Calculate the private key d
    const d = modInverse(e, phi);
  
    // Return the public and private keys
    return {
      publicKey: { e, n },
      privateKey: { d, n }
    };
  }
  
  // Encrypt a message using the public key
  function encryptRSA(publicKey, message) {
    const { e, n } = publicKey;
    const encrypted = message.split('').map(char => {
      const charCode = char.charCodeAt();
      return modPow(charCode, e, n);
    });
    return encrypted.join(',');
  }
  
  // Decrypt a message using the private key
  function decryptRSA(privateKey, message) {
    const { d, n } = privateKey;
    const encrypted = message.split(',').map(num => parseInt(num));
    const decrypted = encrypted.map(num => modPow(num, d, n));
    const messageChars = decrypted.map(num => String.fromCharCode(num));
    return messageChars.join('');
  }
  
  // Helper functions
  
  function generateRandomPrimeNumber() {
    const min = 100;
    const max = 1000;
    let num;
    do {
      num = Math.floor(Math.random() * (max - min)) + min;
    } while (!isPrime(num));
    return num;
  }
  
  function isPrime(num) {
    if (num < 2) {
      return false;
    }
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }
  
  function gcd(a, b) {
    if (b === 0) {
      return a;
    }
    return gcd(b, a % b);
  }
  
  function modInverse(a, m) {
    for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) {
        return x;
      }
    }
    return 1;
  }
  
  function modPow(base, exponent, modulus) {
    let result = 1;
    while (exponent > 0) {
      if (exponent % 2 === 1) {
        result = (result * base) % modulus;
      }
      base = (base * base) % modulus;
      exponent = Math.floor(exponent / 2);
    }
    return result;
  }
  
  
  
  // Generate a key pair
  const keyPair = generateRSAKeyPair();
 


  module.exports = {encryptRSA,decryptRSA,keyPair,generateRSAKeyPair};
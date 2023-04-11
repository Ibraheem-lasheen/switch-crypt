function encrypt(text, key) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
      let char = text.charCodeAt(i);
      if (char >= 65 && char <= 90) {
        result += String.fromCharCode(((char - 65 + key) % 26) + 65);
      } 
      else if (char >= 97 && char <= 122) {
        result += String.fromCharCode(((char - 97 + key) % 26) + 97);
      }
      else if(char >= 33 && char <= 64 ) {
        result+= String.fromCharCode(((char - 33 +  key)% 26) + 33);
      }
    
       else {
        result += text.charAt(i);
      }
    }
    return result;
  }
  
  function decrypt(text, key) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
      let char = text.charCodeAt(i);
      if (char >= 65 && char <= 90) {
        result += String.fromCharCode(((char - 65 - key + 26) % 26) + 65);
      } else if (char >= 97 && char <= 122) {
        result += String.fromCharCode(((char - 97 - key + 26) % 26) + 97);
      }  else if(char >= 33 && char <= 64 ) {
        result+= String.fromCharCode(((char - 33 - key + 26)% 26) + 33);
      }
       else {
        result += text.charAt(i);
      }
    }
    return result;
  }


module.exports = {encrypt,decrypt};


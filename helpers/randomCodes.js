function generateSixDigitCode() {
  let code = 111111;
  while(code == 111111 || code == 000000){
    code = 100000 + Math.floor(Math.random() * 900000);
  }

  return code;
}

module.exports = { generateSixDigitCode };

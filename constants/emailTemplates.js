function rentDisbursementAlert(previousBalance, netRentAmount, newBalance) {
  return `A new rent disbursement was created and your wallet on Smart Crowd has been topped up with USDC ${previousBalance} over the rent generated of USDC ${netRentAmount}.\n\nYour new balance now is USDC ${newBalance}.`;
}

function rentDisbursementSubject(name) {
  return `Rent Disbursement for ${name}`;
}

module.exports = { rentDisbursementSubject, rentDisbursementAlert };

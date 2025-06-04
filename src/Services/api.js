import axios from 'axios';

const API_URL = 'https://rules-master-backend-fgekhthad7ajeuda.southeastasia-01.azurewebsites.net/evaluate';

export const evaluateRules = async (transaction, rules) => {
  const response = await axios.post(API_URL, {
    transaction,
    rules
  });
  return response.data;
};

export const sampleTransaction = {
  "transactionId": "txn123",
  "userId": "user456",
  "amount": 1000,
  "currency": "USD",
  "merchant": "Amazon",
  "location": "Online",
  "additionalData": {
    "ipAddress": "192.168.1.1",
    "device": "Mobile"
  }
};

export const sampleVerb = `function greaterThanEqualTo(attribute: any, valueToCompare: any): boolean {
    if(exists(attribut, valueToCompare) && isNaN(attribute) && isNaN(valueToCompare)){
        return attribute >= valueToCompare;
    }
    log(id, "gretaerThanEqualTo()","Rule execution failed, One or more input parameters are null or undefined or invalid and parameters are"+ attribute +"and" + valueToCompare);
    return false;
}

function isInBlackList(blackListName: String, value: String){
    //this should refer the blackList dataset
    return true//boolean response
}
`

export const featureNames =  {
    card:{
        lastATMWithdrawalDate: "",
        lastATMWithdrawlAmount: 0
    },
    customer:{
        fullPostCode: "",
        outwardPostCode:"",
        deviceType:""
    }
}

export const sampleRules = [
  `// Rule 1: Amount check
if (amount > 5000) {
  result.approved = false;
  result.reason = 'Amount exceeds limit of 5000';
}`,
  `// Rule 2: Merchant check
if (merchant.toLowerCase().includes('casino') ||
    merchant.toLowerCase().includes('gambling')) {
  result.approved = false;
  result.reason = 'Suspicious merchant category';
}`,
  `// Rule 3: Location check
if (location === 'HIGH_RISK_COUNTRY') {
  result.approved = false;
  result.reason = 'High risk location';
}`
];
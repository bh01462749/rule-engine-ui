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
  "TransactionId": "txn123",
  "CustomerId":"12345678",
  "CustomerActNum":"1234567890",
  "CustomerDOB":"01-02-1998",
  "CustGender":"male",
  "CustLocation":"India",
  "CustAccountBalance":1000,
  "TransactionDate":"05-06-2025",
  "TransactionTime":"10:00:00+00",
  "TransactionAmount":50,
  "Currency":"Pound",
  "TransactionType":"RTGS",
  "TerminalId":1342,
  "FrdScore":100,
  "CustomerType":"normal",
  "TransactionCountry":"UK",
  "MerchantName":"Barclays"
};

export const sampleVerb = `function greaterThanEqualTo(attribute: any, valueToCompare: any): boolean {
    if(exists(attribut, valueToCompare) && isNaN(attribute) && isNaN(valueToCompare)){
        return attribute >= valueToCompare;
    }
    log(id, "gretaerThanEqualTo()","Rule execution failed, One or more input parameters are null or undefined or invalid and parameters are"+ attribute +"and" + valueToCompare);
    return false;
}

//* @@Mock **/
function isInBlackList(blackListName: String, value: String){
    return false;
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
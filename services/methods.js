const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const util = require('util');
const crypto = require("crypto")

const hostDb = process.env.DB_HOST;
const userDb = process.env.DB_USER;
const passwordDb = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;
const secret = process.env.JWT_KEY;

export const health = (req, res, next) => {
  res.send('OK');
  next();
}
/* This database data is here just for you to test, please, remember to define your own DB
# You can test with username = admin, password = secret
# This DB has already a best practice: a salt value to store the passwords*/
export const loginFunction = async (username, input_password) => {
  const db = mysql.createConnection({
    host: hostDb,
    user: userDb,
    password: passwordDb,
    database: database,
  });
  db.query = util.promisify(db.query);
  try {
    const results = await db.query(
      "SELECT username, salt, role, password FROM users WHERE username = ?",
      [username]
    );
    if (results.length !== 1) return null;

    const userObj = results[0];
    const hashedPassword = crypto.createHash('sha512').update(input_password + userObj.salt).digest('hex');
    if (!hashedPassword.localeCompare(userObj.password)) {
      return jwt.sign(
        {
          role: userObj.role,
        },
        secret,
        {
          expiresIn: "1 day",
        });
    }
  } catch (err) {
    console.error(err)
  }

  return null
}

export const protectFunction = (authorization) => {
  try {
    const user = jwt.verify(authorization, secret);
    if (user) {
      //console.log(user)
      return 'You are under protected data';
    }
    return null;
  } catch (err) {
    //console.error("Invalid JWT Token!");
    return null;
  }
}

export const cidrToMaskFunction = (cidr) => {
  if (cidr === null) return null;

  cidr = parseInt(cidr);
  if (cidr < 0 || cidr > 32) return null;

  const binaryMask = cidrToBinaryMask(cidr);

  return binaryMaskToDecimalMask(binaryMask);
}

const binaryMaskToDecimalMask = (binaryMask) => {
  const parts = binaryMask.split('.');
  const a = binaryToDecimal(parts[0]);
  const b = binaryToDecimal(parts[1]);
  const c = binaryToDecimal(parts[2]);
  const d = binaryToDecimal(parts[3]);

  return String(a + '.' + b + '.' + c + '.' + d);
}

export const cidrToBinaryMask = (cidr) => {
  let mask = '';
  for (let i = 1; i <= cidr; i++) {
    mask += "1";
    if (i === 8 || i === 16 || i === 24) mask += '.'
  }
  for(let i = cidr + 1; i <= 32; i++) {
    mask += "0";
    if (i === 8 || i === 16 || i === 24) mask += '.'
  }

  return mask;
}

export const maskToCidrFunction = (value) => {
  if (value === null) return null;

  const maskParts = value.split('.');
  if (maskParts.length !== 4) return null;

  const a = getQuantityOfOnesInBinaryNumber(decimalToBinary(maskParts[0]));
  const b = getQuantityOfOnesInBinaryNumber(decimalToBinary(maskParts[1]));
  const c = getQuantityOfOnesInBinaryNumber(decimalToBinary(maskParts[2]));
  const d = getQuantityOfOnesInBinaryNumber(decimalToBinary(maskParts[3]));

  return String(a + b + c + d);
}

export const getQuantityOfOnesInBinaryNumber = (binary) => {
  return binary.split('').filter(c => c === '1').length;
}

export const decimalToBinary = (number, value = '') => {
  number = parseInt(number)
  if (number === 1) return 1 + value;
  if (number === 0) return value;

  const remainder = number % 2;

  return decimalToBinary(parseInt(number / 2), remainder + value);
}

export const binaryToDecimal = (number, nextValue = 0) => {
  if (number.length === 0) return String(nextValue);

  nextValue = nextValue * 2 + parseInt(number[0]);

  return binaryToDecimal(number.substring(1), nextValue);
}

import chai from 'chai';
import * as methods from '../services/methods'

const expect = chai.expect;

describe('loginFunction()', function () {
  it('Test login', async function () {

    expect(await methods.loginFunction("admin", "secret")).to.not.be.null;
  });

  it('Test login wrong credentials', async function () {

    expect(
      await methods.loginFunction("admin", "nocorrectpassword")
    ).to.be.equal(null);
  });
});

describe('protectFunction()', function () {
  it('Test protected', function () {

    expect("You are under protected data").to.be.equal(
      methods.protectFunction("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4ifQ.StuYX978pQGnCeeaj2E1yBYwQvZIodyDTCJWXdsxBGI")
    );
  });

  it('Test protected Endpoint with no valid jwt token', function () {

    expect(null).to.be.equal(
      methods.protectFunction("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4ifQ.StuYX978pQGnCeeaj2E1yBYwQvZIodyDTCJWXdsxBGI_dataextra")
    );
  });
});

describe('maskToCidrFunction()', function () {
  it('Test the cidr of mask: 255.255.255.0 is 24', () => {
    expect('24').to.be.equal(methods.maskToCidrFunction('255.255.255.0'))
  })

  it('Test the cidr of mask: 255.255.255.254 is 31', () => {
    expect('31').to.be.equal(methods.maskToCidrFunction('255.255.255.254'))
  })

  it('Test the cidr of mask: 255.255.0.0 is 16', () => {
    expect('16').to.be.equal(methods.maskToCidrFunction('255.255.0.0'))
  })

  it('Mask is null', () => {
    expect(methods.maskToCidrFunction(null)).to.be.equal(null)
  })

  it('Test 255.255.255 is a invalid mask', () => {
    expect(methods.maskToCidrFunction('255.255.255')).to.be.equal(null)
  })
});

describe('cidrToMaskFunction()', function () {
  it('Test the mask of cidr: 24 is 255.255.255.0', () => {
    expect('255.255.255.0').to.be.equal(methods.cidrToMaskFunction('24'))
  })

  it('Test the mask of cidr: 31 is 255.255.255.254', () => {
    expect('255.255.255.254').to.be.equal(methods.cidrToMaskFunction('31'))
  })

  it('Test the mask of cidr: 16 is 255.255.0.0', () => {
    expect('255.255.0.0').to.be.equal(methods.cidrToMaskFunction('16'))
  })

  it('Test the mask of cidr: 8 is 255.0.0.0', () => {
    expect('255.0.0.0').to.be.equal(methods.cidrToMaskFunction('8'))
  })

  it('Test the mask of cidr: 8 is 254.0.0.0', () => {
    expect('254.0.0.0').to.be.equal(methods.cidrToMaskFunction('7'))
  })

  it('Mask is null', () => {
    expect(methods.cidrToMaskFunction(null)).to.be.equal(null)
  })

  it('Test 35 is a invalid cidr', () => {
    expect(methods.cidrToMaskFunction('35')).to.be.equal(null)
  })
});

describe('cidrToBinaryMask()', function () {
  it('Test cidr: 24 is equal to mask: 11111111.11111111.11111111.00000000', () => {
    expect('11111111.11111111.11111111.00000000').to.be.equal(methods.cidrToBinaryMask(24))
  })

  it('Test cidr: 31 is equal to mask: 11111111.11111111.11111111.11111110', () => {
    expect('11111111.11111111.11111111.11111110').to.be.equal(methods.cidrToBinaryMask(31))
  })

  it('Test cidr: 16 is equal to mask: 11111111.11111111.00000000.00000000', () => {
    expect('11111111.11111111.00000000.00000000').to.be.equal(methods.cidrToBinaryMask(16))
  })

  it('Test cidr: 8 is qual to mask: 11111111.00000000.00000000.00000000', () => {
    expect('11111111.00000000.00000000.00000000').to.be.equal(methods.cidrToBinaryMask(8))
  })

  it('Test cidr: 7 is equal to mask: 11111110.00000000.00000000.00000000', () => {
    expect('11111110.00000000.00000000.00000000').to.be.equal(methods.cidrToBinaryMask(7))
  })
});

describe('decimalToBinary()', function () {
  it('Test binary 101100101 is equal to 357', () => {
    expect('101100101').to.be.equal(methods.decimalToBinary('357'))
  })

  it('Test binary 11111110 is equal to 254', () => {
    expect('11111110').to.be.equal(methods.decimalToBinary('254'))
  })
});

describe('binaryToDecimal()', function () {
  it('Test 357 is equal to binary 101100101', () => {
    expect('357').to.be.equal(methods.binaryToDecimal('101100101'))
  })

  it('Test 254 is equal to binary 11111110', () => {
    expect('254').to.be.equal(methods.binaryToDecimal('11111110'))
  })
});

describe('getQuantityOfOnesInBinaryNumber()', function () {
  it('Test binary 00000011 has just two 1 digits', () => {
    expect(2).to.be.equal(methods.getQuantityOfOnesInBinaryNumber('00000011'))
  })
});
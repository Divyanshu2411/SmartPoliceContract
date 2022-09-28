const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const compile  = require("../compile");

const interface= compile.interface;
const bytecode= compile.bytecode;

let accounts;
let FIR;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  FIR = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Rahim","Abdul","Karim","Boriwali","Mobile Snatching","387","3234"],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("FIR", () => {    
  it("deploys a contract", () => {
    // console.log(FIR);
    assert.ok(FIR.options.address);
  });

  it("Recording officer", async()=>{
    const officer= await FIR.methods.recordingOfficer().call();
    assert("Rahim",officer);
    // console.log(await FIR.methods.recordingOfficer().call()); //this is how you access the asynced data
  });
  it("Recording Person", async()=>{
    const recPerson= await FIR.methods.recordingPerson().call();
    assert("Abdul",recPerson);
  });

  it("complainant", async()=>{
    const complainer= await FIR.methods.complainant().call();
    assert("Karim",complainer);
  });

  it("Police Station", async()=>{
    const PS= await FIR.methods.policeStation().call();
    assert("Boriwali",PS);
  });
  
  it("Offence", async()=>{
    const crime= await FIR.methods.offence().call();
    assert("Mobile Snatching",crime);
  });

  it("IPC section", async()=>{
    const sec= await FIR.methods.section().call();
    assert("387",sec);
  });

  it("Police Station Code", async()=>{
    const PSC= await FIR.methods.policeStationCode().call();
    assert("3234",PSC);
  });

});

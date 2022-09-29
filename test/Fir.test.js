const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const compile  = require("../compile");
const axios = require('axios').default;

const interface= compile.interface;
const bytecode= compile.bytecode;

let accounts;
let FIR1;
let FIR2;
let logs;
//function to get the whole IPFS log
async function getLog(){
  try{
    data= await axios.get("https://api.github.com/repos/Divyanshu2411/FIRdata/commits")
    console.log(data.data[0]);
    stringLog= JSON.stringify(data.data[0].commit.author);
    console.log(stringLog);
    logs= stringLog;
  }
  catch(error){
    console.log(error.message)
};
}

//function to get the details of the latest commit
async function getLatestCommit(){
  try{
    data= await axios.get("https://api.github.com/repos/Divyanshu2411/FIRdata/commits")
    // console.log(data.data[0].commit.url);
    let indiCommit= data.data[0].commit.url.split('/').at(-1);
    console.log("Individual commit ID of last commit", indiCommit);
    try{
      let indiData=await axios.get("https://api.github.com/repos/Divyanshu2411/FIRdata/commits/"+indiCommit);
      console.log(indiData.data.files)
    }
    catch(error){
      console.log(error);
    }
    
  }
  catch(error){
    console.log(error.message)
};
}


beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  FIR1 = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["IP#154","Rahim","Abdul","Karim","Boriwali","Mobile Snatching","387","3234","logFile"],
    })
    .send({ from: accounts[2], gas: "1000000" });

  FIR2 = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["IP#159","Ram","Shiva","Karim","Boriwali","Mobile Snatching","45","3234","logFile"],
    })
    .send({ from: accounts[2], gas: "1000000" });
  
});

describe("FIR1", () => {    
  it("deploys a contract", async() => {
    // console.log(FIR1);
    assert.ok(FIR1.options.address);
    getLog();
    
    
  });

  it("Recording officer", async()=>{
    const officer= await FIR1.methods.recordingOfficer().call();
    assert.equal("Rahim",officer);
    // console.log(await FIR1.methods.recordingOfficer().call()); //this is how you access the asynced data
  });
  it("Recording Person", async()=>{
    const recPerson= await FIR1.methods.recordingPerson().call();
    assert.equal("Abdul",recPerson);
  });

  it("complainant", async()=>{
    const complainer= await FIR1.methods.complainant().call();
    assert.equal("Karim",complainer);
  });

  it("Police Station", async()=>{
    const PS= await FIR1.methods.policeStation().call();
    assert.equal("Boriwali",PS);
  });
  
  it("Offence", async()=>{
    const crime= await FIR1.methods.offence().call();
    assert.equal("Mobile Snatching",crime);
  });

  it("IPC section", async()=>{
    const sec= await FIR1.methods.section().call();
    assert.equal("387",sec);
  });

  it("Police Station Code", async()=>{
    const PSC= await FIR1.methods.policeStationCode().call();
    assert.equal("3234",PSC);
  });

  it("Last Commit", async()=>{
    assert(getLatestCommit());
  });

});

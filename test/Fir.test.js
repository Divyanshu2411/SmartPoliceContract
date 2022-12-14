const assert = require("assert");
const ganache = require("ganache-cli");
const { off } = require("process");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const compile  = require("../compile");
const axios = require('axios').default;

const fs = require('fs');

const interface= compile.interface;
const bytecode= compile.bytecode;

let accounts;
let FIR1;
let FIR2;
let editor;
let edit;


//read wala code
let absolutePath = __dirname+"/complaint.txt";
//   let absolutePath = path.resolve(relativePath);
  let fileContent = fs.readFileSync(absolutePath, "utf-8");
console.log("file.txt console ",JSON.parse(fileContent));
//function to get the whole IPFS log
async function getLog(){
  
    try{
      data= await axios.get("https://api.github.com/repos/Divyanshu2411/FIRdata/commits")
      // console.log(data.data[0]);
      stringLog= JSON.stringify(data.data[0].commit.author);
      // console.log(stringLog);
      editor= stringLog;
      return editor;
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
    // console.log("Individual commit ID of last commit", indiCommit);
    return indiCommit;
  }
  catch(error){
    console.log(error.message)
};
}

async function dataFromCommitID(indiCommit){
  try{
    let indiData=await axios.get("https://api.github.com/repos/Divyanshu2411/FIRdata/commits/"+indiCommit);
    console.log(indiData.data.files[0])
  }
  catch(error){
    console.log(error);
  }
}


before(async () => {
  
  // last editor stores the last commitor from github
  let lastEditor= await getLog();
  // it stores the commit id of last edit.
  let lastEdit= await getLatestCommit();

  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  console.log(accounts);
  
  FIR1 = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["IP#154","Rahim","Karim","Mobile Snatching","387","3234",lastEditor,lastEdit],
    })
    .send({ from: accounts[0], gas: "1000000" });

    console.log(await web3.eth.getBlock("latest"));
  
});

describe("FIR1", () => {    
  it("deploys a contract", async() => {
    // console.log(FIR1);
    assert.ok(FIR1.options.address);    
  });

   it("Recording Person", async()=>{
    const recPerson= await FIR1.methods.recordingPerson().call();
    assert.equal("Rahim",recPerson);
  });

  it("complainant", async()=>{
    const complainer= await FIR1.methods.complainant().call();
    assert.equal("Karim",complainer);
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
    const le= await FIR1.methods.lastEditor().call()
    console.log("Last Editor: "+ le);
    const latestCommitID= await FIR1.methods.lastEdit().call()
    console.log("latest commit: "+latestCommitID);
    dataFromCommitID(latestCommitID);
    assert("Ok");

  });

  it("Updating IPC section", async()=>{
    console.log("Original IPC SECTION:" + await FIR1.methods.section().call());
    await FIR1.methods.updateSection("302").send({from: accounts[0]});
    console.log("Updated IPC SECTION:" + await FIR1.methods.section().call());
    console.log(await web3.eth.getBlock("latest"));
    assert("Ok");
  })

  it("Update from different account fails", async()=>{
    try{
      await FIR1.methods.updateSection("302").send({from: accounts[1]});
      assert(false);
    }
    catch(err){
      assert(true);
    }
  })

});

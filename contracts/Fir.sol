pragma solidity ^0.4.17;
// linter warnings (red underline) about pragma version can igonored!

// contract code will go here

contract complaint{
    //log to be added
    string public FIRID; //to uniquely identify each complaint
    string public recordingPerson; //the police personnel recording the complaint
    string public complainant; //the one who files the complaint
    string public offence; //in the words of complainant
    string public section; //IPC sections applicable in the offence
    string public policeStationCode; //to identify the unique policestations
    string public lastEditor;// to store the identity of who edited it's FIR last on IPFS.
    string public lastEdit; // to store what was last edited FIR on IPFS.
    address public admin;

    //constructor
    function complaint( string Id, string recPerson, string complainer, string crime, string sec, string PSC, string editor, string edit) public {
        Id= FIRID;
        recordingPerson=recPerson;
        complainant=complainer;
        offence=crime;
        section=sec;
        policeStationCode=PSC;
        lastEditor=editor;
        lastEdit= edit;
        admin= msg.sender;
    }

   
    // function updateFIRID(string newFIRID) public restricted{
    //     FIRID= newFIRID;
    // }

    // function updateSection(string newSection) public restricted{
    //     section= newSection;
    // }

    // function updateSection(string newSection) public restricted{
    //     section= newSection;
    // }

    function updateSection(string newSection) restricted public {
        section= newSection;
    }
    

    modifier restricted(){
        require(msg.sender == admin);
        _;
    }
    
}

/**
For returning a string and using modern solidity compiler in https://remix.ethereum.org/
pragma solidity ^0.8.2;
// linter warnings (red underline) about pragma version can igonored!

// contract code will go here

contract complaint{
    string public recordingOfficer; //officer incharge of the station
    string public recordingPerson; //the police personnel recording the complaint
    string public complainant; //the one who files the complaint
    string public policeStation; //which police station it is
    string public offence; //in the words of complainant
    string public section; //IPC sections applicable in the offence
    string public policeStationCode; //to identify the unique policestations
    string[] completeFIR; //complete complaint in one variable

    constructor (string memory recOffice, string memory recPerson, string memory complainer, string memory PS, string memory crime, string memory sec, string memory PSC) public {
        recordingOfficer= recOffice;
        recordingPerson=recPerson;
        complainant=complainer;
        policeStation=PS;
        offence=crime;
        section=sec;
        policeStationCode=PSC;

        completeFIR.push(recordingOfficer);
        completeFIR.push(recordingPerson);
        completeFIR.push(complainant);
        completeFIR.push(policeStation);
        completeFIR.push(offence);
        completeFIR.push(section);
        completeFIR.push(policeStationCode);

    }

    function getFIR() public view returns (string[] memory){
        return completeFIR;
    }
    
}

 */
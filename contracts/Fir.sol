pragma solidity ^0.4.17;
// linter warnings (red underline) about pragma version can igonored!

// contract code will go here

contract FIR{
    //log to be added
    string public FIRID; //to uniquely identify each FIR
    string public recordingOfficer; //officer incharge of the station
    string public recordingPerson; //the police personnel recording the FIR
    string public complainant; //the one who files the complaint
    string public policeStation; //which police station it is
    string public offence; //in the words of complainant
    string public section; //IPC sections applicable in the offence
    string public policeStationCode; //to identify the unique policestations
    string public logs;// to store the log of each transaction.


    function FIR( string Id,string recOffice, string recPerson, string complainer, string PS, string crime, string sec, string PSC, string log) public {
        Id= FIRID;
        recordingOfficer= recOffice;
        recordingPerson=recPerson;
        complainant=complainer;
        policeStation=PS;
        offence=crime;
        section=sec;
        policeStationCode=PSC;
        logs=log;
    }
    
}

/**
For returning a string and using modern solidity compiler in https://remix.ethereum.org/
pragma solidity ^0.8.2;
// linter warnings (red underline) about pragma version can igonored!

// contract code will go here

contract FIR{
    string public recordingOfficer; //officer incharge of the station
    string public recordingPerson; //the police personnel recording the FIR
    string public complainant; //the one who files the complaint
    string public policeStation; //which police station it is
    string public offence; //in the words of complainant
    string public section; //IPC sections applicable in the offence
    string public policeStationCode; //to identify the unique policestations
    string[] completeFIR; //complete FIR in one variable

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
# signum-pir8-grabber

<img src="./img/signum_logo" height="64" />

A small tool that grabs Signum transactions from a specific account by certain criteria and logs it into a file.

# Usage

> Prerequisite: NodeJS 14+ installed

Install using 

```bash 
npm i signum-pir8-grabber -g
pir8grabber -h
```

```bash
Usage: pir8grabber [options]

Options:
  -V, --version              output the version number
  -a, --address <address>    Address to be monitored, can be Reed-Solomon or Id
  -p, --phrase <yoursecret>  Your senders Signum account passphrase (to read encrypted messages) (default: "")
  -s, --signa <amount>       Target amount in SIGNA
  -m, --message <message>    Target message
  -f, --file <filename>      Filename where the data is being collected (default: "./pir8grabber.json")
  -l, --lines <number>       Amount of lines inside the file (default: 10)
  -n, --node <url>           Your custom node. Otherwise the node is selected automatically
  -h, --help                 display help for command

```

Usage Examples:

Log last ten transactions sent to account `S-9K9L-4CB5-88Y5-F5G4Z` that contains the string "NDS-A" in their message 

`pir8grabber -a S-9K9L-4CB5-88Y5-F5G4Z -m "NDS-A"`


# Development

```bash
# If you are on MacOS or Linux you can use nvm to choose the correct NodeJS version
nvm use 
npm i
npm start -- -a S-9K9L-4CB5-88Y5-F5G4Z -m "NDS-A"
```

Build:

const mongoose = require('mongoose');
require('dotenv').config();
const dns = require("dns");
const mongodbUrl = process.env.MONGODB_URL;

if (process.env.NODE_ENV === "development") {
  // dns.setServers(["8.8.8.8", "8.8.4.4"]);
  const dnsServers = (process.env.DNS_SERVERS || "8.8.8.8,8.8.4.4")
  .split(",")
  .map((server) => server.trim())
  .filter(Boolean);

if (dnsServers.length > 0) {
  dns.setServers(dnsServers);
}

}

const connectionToMongDB = async()=>{
    try{
        await mongoose.connect(mongodbUrl)
        console.log("Connected to MongoDB") 
    }
    catch(err){
        console.log("error connecting to DB", err)
    }
}

module.exports = {connectionToMongDB}
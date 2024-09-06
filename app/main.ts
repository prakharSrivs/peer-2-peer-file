import { decodeBencode } from "./decode";
import { parseTorrentInfo } from "./info";
import Dictionary from "./interfaces/dictionaryInterface";

const args = process.argv;
const bencodedValue = args[3];

if (args[2] === "decode") {
    try {
        const decoded = decodeBencode(bencodedValue);
        console.log(JSON.stringify(decoded));
    } catch (error: any) {
        console.error(error.message);
    }
}else if(args[2] == "info"){
    try{
        const torrentObj: Dictionary = parseTorrentInfo(bencodedValue);
        console.log("Tracker URL: ",torrentObj["announce"]);
        console.log("Length: ",torrentObj["info"]["length"]);
    }catch(error: any){
        console.error(error);
    }
}

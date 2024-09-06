import { decodeBencode } from "./decode";
import { parseTorrentInfo } from "./info";

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
        const info = await parseTorrentInfo(bencodedValue);
    }catch(error: any){
        console.error(error);
    }
}

// Examples:
// - decodeBencode("5:hello") -> "hello"
// - decodeBencode("10:hello12345") -> "hello12345"
function decodeBencode(bencodedValue: string): string | number | any[] {
    /* This function is used to decode a bencoded string
    The bencoded string is a string that is prefixed by the length of the string
    **/

    // Check if the first character is a digit
    if (!isNaN(parseInt(bencodedValue[0]))) {
        const firstColonIndex = bencodedValue.indexOf(":");
        if (firstColonIndex === -1) {
            throw new Error("Invalid encoded value");
        }
        return bencodedValue.substring(firstColonIndex + 1);
    }if( bencodedValue[0]==='i' && bencodedValue[bencodedValue.length-1]=='e' ){
        return parseInt(bencodedValue.substring(1, bencodedValue.length-1));
    } if( bencodedValue[0]=='l' && bencodedValue[bencodedValue.length-1]=='e' ){
        const result : any[] = [];
        const resultStrings: string[] = [];
        let isString: boolean = false, isNumber : boolean = false;
        for(let i=1; i<bencodedValue.length-1; i++){
            if(!isNaN(parseInt(bencodedValue[i]))){
                let str: string = bencodedValue.substring(i, i+parseInt(bencodedValue[i])+2);
                i = i+parseInt(bencodedValue[i])+2;
                result.push(decodeBencode(str));
            }else if(bencodedValue[i]==='i'){
                let str: string = "";
                while(bencodedValue[++i]!='e') str += bencodedValue[i];
                result.push(decodeBencode(str));
            }
        }
        return result;
    } else {
        throw new Error("Only strings are supported at the moment");
    }
}

const args = process.argv;
const bencodedValue = args[3];

if (args[2] === "decode") {
    // You can use print statements as follows for debugging, they'll be visible when running tests.
    // console.log("Logs from your program will appear here!");
    // console.log(args);
    // Uncomment this block to pass the first stage
    try {
        const decoded = decodeBencode(bencodedValue);
        console.log(JSON.stringify(decoded));
    } catch (error: any) {
        console.error(error.message);
    }
}

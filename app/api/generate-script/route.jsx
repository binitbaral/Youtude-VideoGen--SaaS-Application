import { genrateScript } from "@/configs/AiModel";
import { NextResponse } from "next/server";

const SCRIPT_PROMPT=`write two different script for 30 seconds video on Topic:{topic},

donot add scene description
donot add anything in braces,just return plain story in text
-give me response in json format and follow the schema
-{
scripts:[
{
content:''
},
],
}`
export async function POST(req){
    const {topic}=await req.json();

    const PROMPT=SCRIPT_PROMPT.replace('{topic}',topic);
    const result=await genrateScript.sendMessage(PROMPT);
    const resp=result?.response?.text();

    return NextResponse.json(JSON.parse(resp));
}
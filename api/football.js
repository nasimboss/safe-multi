const TOKEN = process.env.SPORTMONKS_TOKEN || "z7bHdbOhPxWdVSUnJpmMbpnnwZ0lzEGVFmaeqhN2suCXn9NUgZlHcJUuoMqw";
const BASE = "https://api.sportmonks.com/v3/football";

export default async function handler(req,res){
  try{
    const type=String(req.query.type||"");
    let path="", include="";
    if(type==="live"){
      path="/livescores/inplay";
      include="participants;league;state;scores;events;predictions.type";
    }else if(type==="fixtures"){
      const date=String(req.query.date||"");
      if(!/^\d{4}-\d{2}-\d{2}$/.test(date)) return res.status(400).json({error:"Valid date is required"});
      path="/fixtures/date/"+date;
      include="participants;league;country;state;scores;predictions.type;odds";
    }else return res.status(400).json({error:"Unknown API type"});
    const url=new URL(BASE+path);
    url.searchParams.set("include",include);
    const upstream=await fetch(url,{headers:{Authorization:`Bearer ${TOKEN}`}});
    const text=await upstream.text();
    let body; try{body=JSON.parse(text)}catch{body={error:text||"Invalid upstream response"}}
    res.setHeader("Cache-Control","s-maxage=20, stale-while-revalidate=40");
    return res.status(upstream.status).json(body);
  }catch(e){
    return res.status(502).json({error:"Sportmonks upstream error: "+e.message});
  }
}

"use client"
import { useState } from "react"

export default function Home() {
const [msg,setMsg] = useState("")
const [chat,setChat] = useState<string[]>([])

async function send(){
const res = await fetch("/api/chat",{method:"POST",body:msg})
const text = await res.text()

setChat([...chat,"You: "+msg,"NERIS: "+text])
setMsg("")
}

return (
<div style={{padding:40,fontFamily:"sans-serif"}}>
<h1>NERIS</h1>

<div style={{marginBottom:20}}>
{chat.map((c,i)=>(<div key={i}>{c}</div>))}
</div>

<input
value={msg}
onChange={e=>setMsg(e.target.value)}
/>

<button onClick={send}>送信</button>
</div>
)
}

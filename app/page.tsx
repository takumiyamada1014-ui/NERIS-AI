"use client"
import { useState } from "react"

export default function Home() {
const [msg,setMsg] = useState("")
const [chat, setChat] = useState<
{ role: "user" | "assistant"; content: string }[]
>([])

async function send(){
const trimmed = msg.trim()
if(!trimmed) return

const newChat: { role: "user" | "assistant"; content: string }[] = [
...chat,
{ role:"user", content: trimmed }
]
setChat(newChat)
setMsg("")

const res = await fetch("/api/chat",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(newChat)
})

const text = await res.text()

setChat([
...newChat,
{ role:"assistant", content: text }
])

setMsg("")
}

return (
<div style={{padding:40,fontFamily:"sans-serif"}}>
<h1>NERIS</h1>

<div style={{marginBottom:20}}>
{chat.map((c, i) => (
<div key={i}>{c.content}</div>
))}
</div>

<input
value={msg}
onChange={e=>setMsg(e.target.value)}
/>

<button onClick={send}>送信</button>
</div>
)
}

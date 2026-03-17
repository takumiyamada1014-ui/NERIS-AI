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
<div style={{display:"flex", height:"100vh"}}>

{/* 左：履歴 */}
<div style={{
width:"250px",
background:"#202123",
color:"white",
padding:"10px"
}}>
<h3>NERIS</h3>
</div>

{/* 右：チャット */}
<div style={{
flex:1,
display:"flex",
flexDirection:"column",
background:"#343541",
color:"white"
}}>

{/* メッセージ */}
<div style={{
flex:1,
padding:"20px",
overflowY:"auto"
}}>
{chat.map((c,i)=>(
<div key={i} style={{
marginBottom:"15px",
background: c.role==="user" ? "#444654" : "#3e3f4b",
padding:"10px",
borderRadius:"5px"
}}>
<b>{c.role==="user"?"You":"NERIS"}:</b><br/>
{c.content}
</div>
))}
</div>

{/* 入力欄 */}
<div style={{
padding:"10px",
borderTop:"1px solid #555",
display:"flex"
}}>
<input
value={msg}
onChange={(e)=>setMsg(e.target.value)}
style={{
flex:1,
padding:"10px",
background:"#40414f",
color:"white",
border:"none"
}}
/>
<button onClick={send} style={{marginLeft:"10px"}}>
送信
</button>
</div>

</div>
</div>
)

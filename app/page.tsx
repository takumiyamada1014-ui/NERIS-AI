"use client"

import { useState } from "react"

export default function Page(){

const [msg,setMsg]=useState("")
const [res,setRes]=useState("")

async function send(){

const r=await fetch("/api/chat",{
method:"POST",
body:msg
})

const t=await r.text()
setRes(t)

}

return(

<div style={{padding:40}}>

<h1>NERIS</h1>

<input
value={msg}
onChange={e=>setMsg(e.target.value)}
/>

<button onClick={send}>送信</button>

<pre>{res}</pre>

</div>

)

}

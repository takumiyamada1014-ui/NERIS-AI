import OpenAI from "openai"

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {

const msg = await req.text()

const completion = await openai.chat.completions.create({

model: "gpt-4o-mini",

messages: [
{
role: "system",
content: "You are NERIS, a calm and intelligent strategic assistant."
},
{
role: "user",
content: msg
}
]

})

return new Response(
completion.choices[0].message.content
)

}

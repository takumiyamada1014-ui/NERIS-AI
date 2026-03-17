import OpenAI from "openai"

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {

const messages = await req.json()

const completion = await openai.chat.completions.create({
model:"gpt-4o-mini",
messages:[
{
role:"system",
content:"NERIS人格"
},
...messages
]
})

return new Response(
completion.choices[0].message.content
)

}

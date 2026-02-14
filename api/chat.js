export default async function handler(req, res) {
  try {
    const { message } = req.body;

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "API key missing" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are Jessy, a friendly AI assistant." },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: data });
    }

    res.status(200).json({
      reply: data.choices[0].message.content,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

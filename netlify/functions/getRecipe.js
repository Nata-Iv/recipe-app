import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`;

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Only POST requests are allowed" };
  }

  try {
    const data = JSON.parse(event.body);
    const ingredientsString = data.ingredients.join(", ");

    const response = await hf.chatCompletion({
      model: "Qwen/Qwen2.5-Coder-32B-Instruct",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `I have ${ingredientsString}. Recipe?` },
      ],
      max_tokens: 1024,
    });

    const recipe = response.choices[0].message.content;

    return {
      statusCode: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
      body: recipe,
    };
  } catch (err) {
    console.error("Server error:", err.message);
    return {
      statusCode: 500,
      body: "Server error: " + err.message,
    };
  }
};

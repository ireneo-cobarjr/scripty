import OpenAI from "openai";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig(event);

  const userCode = body.code;
  const description = body.description;

  if (!userCode || !description || userCode === "" || description === "") {
    return {
      result: {
        correctness: "Nothing to evaluate.",
        performance: null,
      },
    };
  }

  const openai = new OpenAI({
    apiKey: config.groqApiKey,
    baseURL: config.groqEndPoint,
  });

  async function getEvaluation(code: string, description: string) {
    const completion = await openai.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        {
          role: "system",
          content: `You are a senior JavaScript developer. A developer provided this description of their code: "${description}".

        Evaluate the correctness of the code *strictly* based on this description only. Do **not** rely on your own interpretation of what the code does.
        Read the description **very carefully** to ensure that you dont misunderstand it.

        If the description is:
        - irrelevant,
        - incomplete,
        - gibberish,
        - or does not clearly match the code,

        then consider the code **incorrect based on the provided description**.

        Only if the code clearly matches the description, evaluate its performance (time and space complexity).
        Only if the code clearly matches the description, give the code a rating from 0 as the lowest to 5 the highest based on performance.

        Read the code line by line. Check if there are unused variables, or unnecessary code, if the code can be made more simplier. Add this to your evaluation.

        Your output must be a valid JSON object using one of these two formats:

        **If the code matches the description:**
        {
          "correctness": "description confirms that the code does X, and the code does X",
          "performance": {
            "time": "Big-O time complexity. Always check the code that the time complexity is correct. Meaning go line by line to ensure but put the explanation on the eval part. Just give the Big-O notation here.",
            "space": "Big-O space complexity".  Always check the code that the space complexity is correct. Meaning go line by line to ensure but put the explanation on the eval part. Just give the Big-O notation here.",
            "eval": "explanation of complexity and if it needs improvements. Dont mention your rating here. Be detailed on how you come up with the Big-O complexity.",
            "rating": "0 to 5. This should always be a number not a string."
          }
        }

        **Make sure you always return the RIGHT JSON STRUCTURE**
        **Always return the RIGHT JSON STRUCTURE that have performance property and timme, space, eval and rating nested inside**
        **Never return WRONG JSON STRUCTURE as stated on top** 

        **If the code does NOT match the description:**
        {
          "correctness": "Give brief explanation why the code and the description is not related",
          "performance": null
        }
 

        Do not include any introduction or explanation outside of the JSON.
        Do not wrap the response in code blocks.
        Output only valid JSON — no extra characters.
        Make sure the JSON output is correctly valid and can be parsed properly.
        `,
        },
        { role: "user", content: `\`\`\`js\n${code}\n\`\`\`` },
      ],
      temperature: 0.1,
    });

    try {
      return JSON.parse(completion.choices[0].message.content as string);
    } catch (e) {
      /**
       * Either we hit our limit or the AI failed to create a proper JSON as we requested
       * since we are using a not so powerful model.
       */
      throw createError({
        statusCode: 500,
        message: "Please try again",
      });
    }
  }

  const result = await getEvaluation(userCode, description);

  return {
    result,
  };
});

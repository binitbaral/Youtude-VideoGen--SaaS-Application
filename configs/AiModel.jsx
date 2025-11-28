// To run this, install dependencies:
// npm install @google/generative-ai

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


  export const genrateScript = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: `write two different script for 30 seconds video on topic:kids story,

-give me response in json format and follow the schema
-{
  scripts:[
  {
  content:"
  },
  ],
}`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: `\`\`\`json
{
  "scripts": [
    {
      "content": "(SCENE START)\\n\\n**(VISUAL: A colorful garden under a bright sun, with playful music.)**\\n\\n**(VOICEOVER, cheerful tone):** In a magical garden, lived a tiny seed named Sunny.\\n\\n**(VISUAL: Close-up of a smiling seed wiggling in the soil.)**\\n\\n**(VOICEOVER):** Sunny dreamed of becoming the tallest flower in the land!\\n\\n**(VISUAL: Sunny pushing through the dirt, growing slowly.)**\\n\\n**(VOICEOVER):** Day by day, with sunlight and a sprinkle of rain, Sunny grew...\\n\\n**(VISUAL: Time-lapse of Sunny growing into a bright sunflower.)**\\n\\n**(VOICEOVER):** Until one day... he stood tall and proud, reaching the sky!\\n\\n**(VISUAL: Sunny smiling with bees buzzing around.)**\\n\\n**(VOICEOVER):** No dream is too small. Just keep growing!\\n\\n(SCENE END)"
    },
    {
      "content": "(SCENE START)\\n\\n**(VISUAL: A quiet forest glowing under moonlight. Soft, magical music.)**\\n\\n**(VOICEOVER, gentle and curious):** Luna was a little owl who couldn't fly yet.\\n\\n**(VISUAL: Luna flapping her wings, wobbling on a tree branch.)**\\n\\n**(VOICEOVER):** She watched the stars and dreamed of soaring among them.\\n\\n**(VISUAL: Her owl friends fly above while she tries again and again.)**\\n\\n**(VOICEOVER):** Every night, Luna practiced... never giving up.\\n\\n**(VISUAL: Finally, Luna spreads her wings and lifts into the air!)**\\n\\n**(VOICEOVER):** One magical night, she flew!\\n\\n**(VISUAL: Luna gliding joyfully under the stars.)**\\n\\n**(VOICEOVER):** Believe in yourself. You'll shine in your own time.\\n\\n(SCENE END)"
    }
  ]
}
\`\`\``,
          },
        ],
      },
    ],
  });

  export const GenerateImageScript = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Generate Image prompt cinematic style with all details for each scene for 30 second video: script: rosa parks refused to give up her seat on a bus in 1955. her quiet act of defiance sparked the montgomery bus boycott, a pivotal moment in the civil rights movement. one person's bravery can inspire lasting change for everyone - Just give specifying image prompt depends on the story line - do not give camera angle image prompt - follow the following schema and return JSON data (Only 1 image): [{ imagePrompt:'', sceneContent: '<Script Content>' }]"
          }
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: `\`\`\`json
  [
    {
      "imagePrompt": "1955 Montgomery city bus with Rosa Parks seated calmly in the middle, wearing a modest wool coat and glasses, surrounded by white passengers showing surprise or disapproval, atmospheric lighting, cinematic tone",
      "sceneContent": "Rosa Parks refused to give up her seat on a bus in 1955."
    }
  ]
  \`\`\``
          }
        ],
      }
    ]
  });
  

  //const result = await chatSession.sendMessage("Continue with another variation.");
  //console.log(result.response.text());


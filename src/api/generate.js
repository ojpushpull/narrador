import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
    console.log(req.body);
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const name = req.body.name || '';
  if (name.length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid name",
      }
    });
    return;
  }

  const prodserv = req.body.prodserv || '';
  if (prodserv.length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid prodserv",
      }
    });
    return;
  }
  const mission = req.body.mission || '';
  if (mission.length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid mission",
      }
    });
    return;
  }

  const vision = req.body.vision || '';
  if (vision.length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid vision",
      }
    });
    return;
  }
  const problem = req.body.problem || '';
  if (problem.length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid problem",
      }
    });
    return;
  }
  const solution = req.body.solution || '';
  if (solution.length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid solution",
      }
    });
    return;
  }
  const future = req.body.future || '';
  if (future.length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid future",
      }
    });
    return;
  }
  const descrip = req.body.descrip || '';
  if (descrip.length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid descrip",
      }
    });
    return;
  }
  const colors = req.body.colors || '';
  if (colors.length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid colors",
      }
    });
    return;
  }
  const villian = req.body.villian || '';
  if (villian.length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid villian",
      }
    });
    return;
  }
  const hero = req.body.hero || '';
  if (hero.length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid hero",
      }
    });
    return;
  }


  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(name, prodserv, mission, problem, descrip, hero, colors, villian, vision, future, solution ),
      temperature: 1,
      max_tokens: 100,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(name, prodserv, mission, vision, hero, villian, problem, solution, descrip, colors, future) {
  
    return `You are a brand strategist write a creative narrative based on the data provided



Business: The organization is called ${name} they offer ${prodserv} their goal is ${mission} and they beleive in ${vision}. The organization believes ${problem} is an issue and can be solved with ${solution}. They fight for ${future} changes in the world. ${descrip} are the words and ${colors} are the colors that best describe this organization. The organization beleives ${villian} is the enemy they are against and ${hero} is a hero on their side.
Response:`;
}
const express = require('express')
require('dotenv').config();
const connectDB = require('./db');


const TravelLog = require('./models/travelLog');


const app = express()
const port = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors());



// connecting DB
connectDB();


// middleware
app.use(express.json())


// generate text request
app.post('/generate-travel-log', async (req, res) => {
  try {
    const { location, food, vibes, activities } = req.body;

    const prompt = `
Create a fictional travel log and a short title in the following JSON format:
{
  "travelLog": "...",
  "title": "..."
}

Details:
- The person visited ${location}, ate ${food}, and did ${activities}.
- The overall vibe of the trip was ${vibes}.
- The travel log should be creative, no more than 150 words.
- The title should be a SINGLE short creative title (max 8 words) for the log.
- Some inputs may be realistic, others may be absurd or fictional — treat all seriously.
- Do NOT include anything outside the JSON.
`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-small-3.1-24b-instruct:free",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();

    console.log("LLM Raw Response:", JSON.stringify(data, null, 2));

    const rawContent = data.choices?.[0]?.message?.content;

    if (!rawContent) {
      return res.status(500).json({ error: 'No response from LLM' });
    }

    let parsed;
    try {
      parsed = JSON.parse(rawContent);
    } catch (err) {
      console.error("Failed to parse JSON from LLM:", err);
      return res.status(500).json({ error: 'Invalid JSON format from LLM' });
    }

    const { travelLog, title } = parsed;

    if (!travelLog || !title) {
      return res.status(500).json({ error: 'Missing travelLog or title in LLM response' });
    }

    res.json({ travelLog, title });

  } catch (error) {
    console.error("Failed to generate travel log:", error);
    res.status(500).json({ error: 'Failed to generate travel log' });
  }
});


// save 
app.post('/save-log', async (req, res) => {

    try {
        
        const {title, user_responses, text } = req.body;

        const travelLog = new TravelLog({title, user_responses, text});

        // save it
        await travelLog.save();

        res.status(200).json({message: 'Log saved', log: travelLog});


    } catch (error) {
        console.log('Error saving the log::', error);
        res.status(500).json({error: 'Failed to save the log'});
    }

})

// delete
app.delete('/delete-log/:id', async (req, res) => {
    try {
        const {id} = req.params;

        const deletedLog = await TravelLog.findByIdAndDelete(id);

        if(!deletedLog) {
            return res.status(404).json({error: 'Travel log not found'})
        }

        res.status(200).json({message: "Log deleted successfully", log: deletedLog});

    } catch (error) {
        console.log("Error deleting the log:::", error);
        res.status(500).json({message: "Error deleting the log"});
    }
})



// edit
app.put('/edit-log/:id', async (req, res) => {
    try {
        
        const {id} = req.params;

        const updatedData = req.body;

        const updatedLog = await TravelLog.findByIdAndUpdate(id, updatedData, {new: true});
        // {new: true} returns the updated document

        if(!updatedLog) {
            return res.status(404).json({error: 'Travel log not found to update'})
        }
        res.status(200).json({message: "Log updated successfully", log: updatedLog});

    } catch (error) {
        console.log("Error updating the log:::", error);
        res.status(500).json({message: "Error updating the log"});
    }
})

// get all logs
app.get('/', async (req, res)=> {
    try {
        const logs = await TravelLog.find();
        if(!logs || logs.length === 0) {
            return res.status(404).json({error: "No logs found"});
        }

        res.status(200).json({message: "Logs fetched succesfully", logs: logs});

    } catch (error) {
        console.log("Error fetching logs::", error);
        res.status(500).json({message: "Error fetching logs"});

    }
})

// get a log
app.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;

        const travelLog = await TravelLog.findById(id);

        if(!travelLog) {
            return res.status(404).json({error: "No log found"});
        }
        res.status(200).json({message: "Log fetched succesfully", log: travelLog});

    } catch (error) {
        console.log("Error fetching log::", error);
        res.status(500).json({message: "Error fetching log"});
    }
})










app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


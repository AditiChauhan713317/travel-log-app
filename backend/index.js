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
app.post('/generate-travel-log', async(req, res) => {
    
    try {
        
        const {location, food, vibes, activities} = req.body;

    
        const prompt = `
Create a fictional travel log in no more than 150 words for a person who visited ${location}, ate ${food}, and did ${activities}.
The overall vibe of the trip was ${vibes}.

Important:
- Some inputs may be realistic, some may be absurd or fictional.
- Treat all inputs seriously without correcting or denying them.
- Blend everything naturally into the story, embracing both the realistic and the absurd as real events.
`;
        // fetching log
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
    })

    const data = await response.json();

    // log the entire AI response'
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
    console.log("AI Response:", JSON.stringify(data, null, 2));

    

    const travelLog = data.choices?.[0]?.message?.content;

    // console.log(travelLog.type);

    if(!travelLog) {
        console.log("NO travel log generated");
        return res.status(500).json({ error: 'AI failed to generate travel log' });
    }

    // fetching title
    const titlePrompt = `Give a SINGLE short creative title (max 8 words) for a travel log based on this:\n"${travelLog}"`;

    const response_title = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "mistralai/mistral-small-3.1-24b-instruct:free",
          messages: [{ role: "user", content: titlePrompt }]
        })
})

    const title_data = await response_title.json();

    console.log("TITLEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
    console.log(title_data);
    const title = title_data.choices?.[0]?.message?.content?.trim() || "Untitled";

    // sending back the travel log
    res.json({travelLog, title});

    } catch (error) {
        console.log("Failed to generate travel log ERROR::", error);
        res.status(500).json({error: 'Failed to generate travel-log'});
    }
    

})


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


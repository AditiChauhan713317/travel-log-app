import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from '../config';
import { useCreateContext } from "../CreateContext";
import { useLogsContext } from "../LogsContext";

function Create() {

    const navigate = useNavigate();
    const {setShowCreate, edit_log} = useCreateContext();
    const {logs, setLogs, loading, setLoading} = useLogsContext();


    const questions = [ "Where did you go?",
        "What food did you have?",
        "What vibes did you get?",
        "What activities did you do?"
    ];

    const [answers, setAnswers] = useState([]);
    const [curr_idx, setCurr_idx] = useState(0);
    const [input, setInput] = useState(''); 

    //EDIT
    useEffect(()=> {
        if(edit_log) {
            // console.log("WE EDITINGGGGGGGGGGGGGGGGGGGGGGGGGG");
            // console.log(edit_log);
            // convert the user_responses OBJECT to ARRAY
            const responsesArray = Object.keys(edit_log.user_responses)
            .map(key => edit_log.user_responses[key]);
      
            setAnswers(responsesArray);
            
            // console.log("FUCKKKKKKKKKKKK" ,answers);
            // console.log(responsesArray);

            setInput(responsesArray[0] || ''); // start with the first respsonse (location)
        }
    }, [edit_log])
   
    // updating the pre-filled response if there 
    useEffect(() => {
        if(edit_log) {
            setInput(answers[curr_idx] || '');
        }
    }, [answers, curr_idx])
    //   Now React updates curr_idx first, and then runs this useEffect, which means you're reading the correct, updated index

    const handleSubmit = async (e) => {
        e.preventDefault();


        // return if nothing entered
        if (!input.trim()) return;

        // console.log('form submitted!!!!!')
        // const updatedAnswers = answers; ---->Here, updatedAnswers is still referencing the same array as answers, so you're mutating the original state directly.
        const updatedAnswers = [...answers];
        // console.log("Curr_idx::::", curr_idx);
        updatedAnswers[curr_idx] = input;
        // console.log("YOOOOOOOOOOOO" ,updatedAnswers);
        setInput('');
        setAnswers(updatedAnswers);
        if(curr_idx < questions.length-1) {
            setCurr_idx(prev => prev+1);
            // if(edit_log) {
            //     setInput(answers[curr_idx] || '');
            // }
            // WRONG!!!! cause ----> react state is async so if you use curr_idx just after updating it , it'll use the prev value
            // check the useEffect ---> to update the prefilled repsonses
        
        }
        
        else {
            // show loading
            setLoading(true);
            // generate the log
            // console.log("Here are the answers:::",answers);
            const log = await config.get_travel_log({
                location: updatedAnswers[0], // not answers[0] cause setAnswers() is async so its not updated yet
                food: updatedAnswers[1],
                vibes: updatedAnswers[2],
                activities: updatedAnswers[3]
            });
            if(log) {
                if(edit_log) {                 
                    const edited = await config.edit_log(edit_log._id, {
                        title: log.title,
                        user_responses: {...answers},
                        text: log.travelLog
                    });
                    console.log(edited);
                    if(edited) {
                        setShowCreate(false);
                        setLoading(false);
                        navigate(`/view/${edited.log._id}`, { state: { data:  edited.log} });                      
                    }
                }
                else {
                    const saved = await config.save_log({
                        title: log.title,
                        user_responses: {...updatedAnswers}, // dont use answers --> not updated yet as setAnswers() is async
                        text: log.travelLog
                    })
                    if(saved) {
                        setShowCreate(false);
                        setLoading(false);
                        navigate(`/view/${saved._id}`, { state: { data:  saved} });
                    }
                    const updated_logs = [...logs];
                    updated_logs.push(saved);
                    setLogs(updated_logs);
                    
                }
            }
            else {
                console.log("No LOG generated");
            }
            
        }
    }
 
    return (
        <div className=' fixed top-0 left-0 w-full h-full flex justify-center items-center z-50'>
            <form onSubmit={handleSubmit} className='bg-white w-2xl min-h-[100px] relative mx-auto flex flex-col gap-2 justify-center items-center border rounded-2xl p-4 custom-shadow-view-box '>
                <i onClick={() => setShowCreate(false)} className="fa-solid fa-xmark text-black absolute top-2 right-2 rounded border px-2 py-1 custom-shadow bg-[#ff6a6a]"></i>
                <p>{questions[curr_idx]}</p>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className='focus:outline-none  border custom-shadow-2  rounded-lg px-4 py-1 text-sm m-1'/>
                <button type='submit' disabled={!input.trim()} className='custom-shadow border border-black outline-none  rounded-lg py-1 px-5 text-sm bg-[#1b85ff]  '>{curr_idx === questions.length-1 ? "Submit" : "Next"}</button>
            </form>
        </div>

    )


}
export default Create;
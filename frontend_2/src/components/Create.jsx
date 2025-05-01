import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from '../config';

function Create({onClose}) {

    const navigate = useNavigate();

    const questions = [ "Where did you go?",
        "What food did you have?",
        "What vibes did you get?",
        "What activities did you do?"
    ];

    const [answers, setAnswers] = useState([]);
    const [curr_idx, setCurr_idx] = useState(0);
    const [input, setInput] = useState(''); 


    const handleSubmit = async (e) => {
        e.preventDefault();
        // return if nothing entered
        if (!input.trim()) return;

        // console.log('form submitted!!!!!')
        // const updatedAnswers = answers; Here, updatedAnswers is still referencing the same array as answers, so you're mutating the original state directly.
        const updatedAnswers = [...answers];
        updatedAnswers[curr_idx] = input;
        setInput('');
        setAnswers(updatedAnswers);
        if(curr_idx < questions.length-1) {
            setCurr_idx(prev => prev+1);
        }
        else {
            // console.log("All answers:", answers);
            // generate the log
            const log = await config.get_travel_log({
                location: answers[0],
                food: answers[1],
                vibes: answers[2],
                activities: answers[3]
            });
            // console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBb')
            // console.log(log.title);
            // console.log(log.travelLog);
            // console.log('EDNDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
            if(log) {
                const saved = await config.save_log({
                    title: log.title,
                    user_responses: {...answers},
                    text: log.travelLog
                })
                if(saved) {
                    onClose();
                    // console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBb");
                    // console.log(saved._id);
                    navigate(`/view/${saved._id}`, { state: { data:  saved} });
                }
            }
            else {
                console.log("No LOG generated");
            }
            
        }
        console.log(updatedAnswers);
    }
 
    return (
        <div className=' fixed top-0 left-0 w-full h-full flex justify-center items-center z-50'>
            <form onSubmit={handleSubmit} className='bg-amber-300 w-2xl min-h-[100px] relative mx-auto flex flex-col gap-2 justify-center items-center border rounded p-2 '>
                <i onClick={onClose} className="fa-solid fa-xmark text-black absolute top-2 right-2 "></i>
                <p>{questions[curr_idx]}</p>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className='outline rounded px-2 py-1 text-sm hover:bg-amber-200'/>
                <button type='submit' disabled={!input.trim()} className='border rounded p-1 text-sm bg-orange-200'>{curr_idx === questions.length-1 ? "Submit" : "Next"}</button>
            </form>
        </div>

    )


}
export default Create;
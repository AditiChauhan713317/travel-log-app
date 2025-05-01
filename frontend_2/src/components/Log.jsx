import removeMarkdown from 'remove-markdown';
import { useNavigate } from 'react-router-dom';

function Log({log, setLogs}) {
    
    const navigate = useNavigate();
    const handleClick = () => {
        // console.log(log);
        
        navigate(`/view/${log._id}`, { state: { data:  log} });
    }
    // console.log(log);
    // log.title = '### **"Petals, Noodles, and Serenity\'s Call"**'
    const clean_title = removeMarkdown(log.title); // "Petals, Noodles, and Serenity's Call"
    const cleaner_title = clean_title.slice(1, clean_title.length-1); // get rid of the ""
    const clean_text = removeMarkdown(log.text);

    return (
        
        <div onClick={handleClick} className="flex flex-col gap-3 min-h-32 h-auto max-w-[50rem] m-3 items-center  p-3  bg-[hsl(0,0%,99%)] border rounded-2xl custom-shadow cursor-pointer transition-transform duration-300 ease-out hover:-translate-y-1">
            <h1 className="border p-1 rounded-2xl w-[100%] text-center font-extrabold bg-yellow-300">{cleaner_title}</h1>
            <p className="text-justify line-clamp-5 w-full h-full overflow-ellipsis">{clean_text}</p>
        </div>
    )
}
export default Log;

// max-w-[20rem]


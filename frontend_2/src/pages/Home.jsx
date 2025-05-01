import Log from '../components/Log';
import Create from '../components/Create2';
import { useLogsContext } from '../LogsContext';
import { useCreateContext } from '../CreateContext';
import About from '../components/About';



function Home() {

     // check if EDITING
    const {showCreate, edit_log} = useCreateContext();
    
    // all logs
    const {logs, loading, error} = useLogsContext();



    if(loading) {
        return (
            <div className='spinner-container pb-20'>
                <div className="spinner m-auto text-black text-lg flex justify-center items-center">
                    <div className='spinner-content'>
                    <p>A hot log coming right up!</p>
                    </div>
                </div>
            </div>
        )
    }

    if(error) {
        return (
            <div className="text-center p-10 text-gray-500">
                {error}
            </div>
        )
    }

    if(logs.length === 0) {
        return (
            <div className="text-center p-10 text-gray-500">
                No travel logs yet
            </div>
        )
    }

    return (
       
        <>
          <About />
            {showCreate &&  <Create /> }

            
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5 justify-items-center ${showCreate ? "blur-sm pointer-events-none" : ""}`}>
            
            {/* create a shallow copy then reverse it ---> to show logs in latest first manner */}
            {[...logs].reverse().map(log => (
                
                <Log key={log._id} log={log}/>
            ))}

            </div> 
        </>
       
    )

}

export default Home;
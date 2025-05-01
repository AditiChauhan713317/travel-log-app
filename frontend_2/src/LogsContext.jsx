import { createContext, useContext, useState, useEffect } from "react";
import config from './config';


const LogsContext = createContext();

export const LogsProvider = ({children}) => {

    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // fetch all the logs
    
    useEffect(() => {
        
        const fetchLogs = async () => {
             
         try {
             const logs = await config.get_all_logs();
             // console.log(logs);
             // console.log(typeof logs);
             if(logs) {
                 setLogs(logs);
                 
             }
             else {
                 setError('Failed to load logs');
             }
 
         } catch (error) {
             setError('Something went wrong while fetching logs');
         } finally {
             setLoading(false);
         }
         }
 
         fetchLogs();
 
     }, []);

    

    return (
        <LogsContext.Provider value={{logs, setLogs, loading, setLoading, error, setError}}>
            {children}
        </LogsContext.Provider>
    )

}

export const useLogsContext = () => useContext(LogsContext);

 

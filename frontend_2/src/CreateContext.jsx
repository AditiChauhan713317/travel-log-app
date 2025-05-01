import { createContext, useContext, useState, useEffect } from "react";

const CreateContext = createContext();

export const CreateContextProvider = ({children}) => {

    const [showCreate, setShowCreate] = useState(false);
    const [edit_log, setEdit_log] = useState(null);

    return (
        <CreateContext.Provider value={{showCreate, setShowCreate, edit_log, setEdit_log}}>
            {children}
        </CreateContext.Provider>
    )


}

export const useCreateContext = () => useContext(CreateContext);


 

import React, { createContext } from 'react'

const DataContext = createContext(null)

export default DataContext



export function DataContextProvider({ children }) {



    return (
        <DataContext.Provider>
            {children}
        </DataContext.Provider>
    )
}

export default DataContextProvider
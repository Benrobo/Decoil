import React, { createContext, useEffect } from 'react'
import CronJob from '../helpers/CronJob'

const DataContext = createContext(null)

export default DataContext



export function DataContextProvider({ children }) {

    useEffect(() => {
        setInterval(() => {
            CronJob()
            // console.log("LOGING")
        }, 15000);
    }, [])

    return (
        <DataContext.Provider>
            {children}
        </DataContext.Provider>
    )
}

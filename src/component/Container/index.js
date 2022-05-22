import React from 'react'

function Container({ children }) {
    return (
        <div className="w-full h-screen mx-auto  md:w-[90vmin] ">{children}</div>
    )
}

export default Container
import React from 'react'

function Layout({ children }) {
    return (
        <div className="w-screen h-screen">
            {children}
        </div>
    )
}

export default Layout
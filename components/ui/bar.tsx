import React, { ReactNode } from 'react'

const BarLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='bg-muted/50 w-full border-2 border-muted/20 p-3 rounded-lg'>
            {children}
        </div>
    )
}

export default BarLayout

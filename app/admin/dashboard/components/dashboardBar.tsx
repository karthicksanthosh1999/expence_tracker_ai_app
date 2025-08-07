import React, { FC } from 'react'


type TDashboardBarProps = {
    name: string
}

const DashboardBar: FC<TDashboardBarProps> = ({ name }) => {
    return (
        <div className='bg-muted/50 w-full border-2 border-muted/20 p-3 rounded-lg'>
            <div>
                <h1>Welcome {name}</h1>
            </div>
        </div>
    )
}

export default DashboardBar

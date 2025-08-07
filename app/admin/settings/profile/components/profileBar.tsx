import BarLayout from '@/components/ui/bar'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import React from 'react'

const ProfileBar = () => {
    return (
        <BarLayout>
            <div className='flex items-center justify-between'>
                <h1 className='text-lg font-semibold'>Profile</h1>
                <Button type='button' size='sm' className='cursor-pointer'><Edit /> Edit</Button>
            </div>
        </BarLayout>
    )
}

export default ProfileBar

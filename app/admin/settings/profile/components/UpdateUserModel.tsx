import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import React from 'react'

const UpdateUserModel = () => {
    return (
        <Dialog>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                    <DialogDescription>Update Your Profile here.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type='submit' variant='destructive' className='cursor-pointer' >Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateUserModel

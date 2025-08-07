import { FC, memo } from 'react'
import { Dialog, DialogFooter, DialogHeader, DialogContent, DialogTitle } from './dialog'
import { Button } from './button'

type TDeleteModelProps = {
    deleteModelOpen: boolean,
    deleteModelClose: () => void,
    confirmDelete: (id: string) => void,
    selectedId?: string,
    isLoading?: boolean,
}

const DeleteModel: FC<TDeleteModelProps> = ({ deleteModelClose, deleteModelOpen, confirmDelete, selectedId, isLoading }) => {
    return (
        <>
            <Dialog open={deleteModelOpen} onOpenChange={deleteModelClose}>
                <DialogContent className=''>
                    <DialogHeader>
                        <DialogTitle>Delete</DialogTitle>
                    </DialogHeader>
                    <div>
                        <h1>Are you sure use want to delete the data?</h1>
                    </div>
                    <DialogFooter>
                        <Button className='cursor-pointer' type='button' variant="outline" onClick={deleteModelClose} >Close</Button>
                        <Button className='cursor-pointer' type='button' variant="destructive" onClick={() => confirmDelete(selectedId as string)}>
                            {
                                isLoading ? (
                                    <>
                                        <div className="dot bg-gray-100"></div>
                                        <div className="dot bg-gray-100"></div>
                                        <div className="dot bg-gray-100"></div>
                                    </>
                                ) : (
                                    <p>Delete</p>
                                )
                            }
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog >
        </>
    )
}

export default memo(DeleteModel);

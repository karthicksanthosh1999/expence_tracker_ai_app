'use client'
import { useCallback, useState } from "react"
import { useDeleteJobhook, useGetJobsHook } from "../hooks/jobsHook"
import { columns as createColumns } from "./Components/Columns"
import JobHeader from "./Components/jobHeader"
import { DataTable } from "./Components/JobsTable"
import JobsForm from "./Components/CreateJobform"
import DeleteModel from "@/components/ui/delete-model"
import { TJob } from "@/@types/jobTypes"
import Dashboard from "@/app/admin/dashboard/page"

const page = () => {
    const { data: jobsData, isLoading } = useGetJobsHook();
    const { mutate: deleteMutation, isPending: deleteIsLoading } = useDeleteJobhook()

    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [createJobModel, setCrateJobModel] = useState<boolean>(false)
    const [deleteJobModel, setDeleteJobModel] = useState<boolean>(false)


    const handleModel = useCallback(() => {
        setCrateJobModel(!createJobModel)
    }, [createJobModel])

    const handleCloseDeleteModel = useCallback(() => {
        setDeleteJobModel(!deleteJobModel)
    }, [deleteJobModel])

    const handleDelete = useCallback((job: TJob) => {
        if (job?.id) setSelectedId(job?.id)
        setDeleteJobModel(true)
    }, [deleteJobModel])

    const handleEdit = useCallback(() => {
        console.log("Edit clicked...")
    }, [])


    const confirmDelete = (id: string) => {
        if (id) {
            deleteMutation(id)
            setDeleteJobModel(false)
        }
    }

    return (
        <>
            <Dashboard>
                <div>
                    <JobHeader setCrateJobModel={handleModel} />
                    {
                        jobsData && jobsData?.response ? (
                            <DataTable columns={createColumns(handleEdit, handleDelete)} data={jobsData?.response} onEdit={handleEdit}
                                onDelete={handleDelete} />
                        ) : (
                            isLoading ? (
                                <p>Loading...</p>
                            ) : (
                                <p className="text-4xl text-black">No data found</p>
                            )
                        )
                    }
                </div>
                <div className="w-7xl">
                    <JobsForm createJobModel={createJobModel} setCreateJobModel={handleModel} />
                </div>
                <div>
                    {
                        selectedId && deleteJobModel && (
                            <DeleteModel deleteModelOpen={deleteJobModel} deleteModelClose={handleCloseDeleteModel} confirmDelete={confirmDelete} selectedId={selectedId} isLoading={deleteIsLoading} />
                        )
                    }
                </div>
            </Dashboard>
        </>
    )
}

export default page;

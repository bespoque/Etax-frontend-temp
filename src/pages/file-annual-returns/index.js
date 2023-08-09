import { useRouter } from 'next/router';
import React, { useState } from 'react'
import SectionTitle from '../../components/section-title/index'

export default function Index() {
    const [selectedYear, setSelectedYear] = useState("")
    const router = useRouter()

    const goToUploadcsv = () => {
        if (selectedYear === "") {
            alert("Please Select Year!")
        }
        else {
            router.push(`/uploads/annual/csv/${selectedYear}`)
        }
    }
    const goToUploaddoc = () => {
        if (selectedYear === "") {
            alert("Please Select Year!")
        }
        else {
            router.push(`/uploads/annual/supporting-doc/${selectedYear}`)
        }
    }

    return (
        <>
            <div>
                <div className="overflow-x-auto my-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4">
                    <div className="flex justify-center">
                        <div>
                            <SectionTitle
                                subtitle="File Annual Returns"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div>
                            <select required className="form-control mb-3 rounded" onChange={(e) => setSelectedYear(e.target.value)}>
                                <option value={""}>Please select Year</option>
                                <option value={"2019"}>2019</option>
                                <option value={"2020"}>2020</option>
                                <option value={"2021"}>2021</option>
                                <option value={"2022"}>2022</option>
                            </select>
                        </div>

                    </div>
                    <div className="flex justify-center">
                        <ul>
                            <li className="my-4"><button onClick={() => goToUploadcsv()} className="underline">Upload CSV Schedule</button></li>
                            <li><button onClick={() => goToUploaddoc()} className="underline">Upload Supporting Documents</button></li>
                        </ul>
                    </div>
                </div>
            </div>

        </>
    )
}

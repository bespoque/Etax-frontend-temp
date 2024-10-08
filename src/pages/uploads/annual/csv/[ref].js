import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useSelector, shallowEqual } from 'react-redux';
import { useRouter } from 'next/router';
import SectionTitle from '../../../../components/section-title';
import Widget from '../../../../components/widget';
import { SubmitButton } from '../CustomButton/../../../../components/CustomButton/CustomButton';
import axios from 'axios';
import url from '../../../../config/url'
import { FiX, FiCheck } from 'react-icons/fi';
import { FiArrowDown } from 'react-icons/fi';

import { SampleCsv } from '../../../../components/Images/Images';
import setAuthToken from '../../../../functions/setAuthToken';
import { ProcessorSpinner } from '../../../../components/spiner';

const AnnualUploadcsv = () => {
    //handle file
    const [file, setFile] = useState(null);
    const [uploadErrors, setUploadErrors] = useState(() => []);
    const [submitting, setSubmitting] = useState(() => false);
    const [disabled, setDisabled] = useState(true);
    const modalRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [uploadSuccessful, setUploadSuccessful] = useState(() => false);
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [year, setYear] = useState("");
    const { register, handleSubmit } = useForm();
    const router = useRouter();
    useEffect(() => {
        if (router && router.query) {
            let selecteYear = router.query.ref;
            setYear(selecteYear);
        }

    }, [router]);

    

    const { palettes } = useSelector(
        (state) => ({
            palettes: state.palettes,
        }),
        shallowEqual
    );
    let { background } = {
        ...palettes,
    };

    const show = () => {
        setOpen(true);
    };
    const hide = () => {
        setOpen(false);
        setUploadErrors([]);
        setUploadSuccessful(false);
        if (uploadSuccessful) {
            router.push(`/uploads/annual/supporting-doc/${year}`);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!modalRef || !modalRef.current) return false;
            if (!open || modalRef.current.contains(event.target)) {
                return false;
            }
            setOpen(!open);
            setUploadErrors(() => []);
            if (uploadSuccessful) {
                router.push(`/uploads/annual/supporting-doc/${year}`);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open, modalRef]);

    const fileInputRef = useRef();
    const fileHandler = (event) => {
        const file = event.target.files[0];
        const filetype = ['application/vnd.ms-excel', 'text/csv'];

        if (!file) {
            setFile(null);
            setDisabled(true);
            return;
        }

        if (!filetype.includes(file.type)) {
            alert('file type not allowed. only csv(delimited comma) are allowed.');
            setFile(null);
            setDisabled(true);
            return;
        } else {
            setFile(file);
            setDisabled(false);
            return;
        }
    };

    //handle submit
    setAuthToken();
    const handleUpload = async () => {
        let payPeriod = `${year}-01-01`;
        const formData = new FormData();
        formData.append('payPeriod', payPeriod);
        formData.append('csv', file);
        setSubmitting(() => true);
        try {
            await axios.post(`${url.BASE_URL}annual/upload-annual`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (ProgressEvent) => {
                    setUploadPercentage(
                        parseInt(
                            Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
                        )
                    );
                },
            });
            setUploadPercentage(0);
            setFile(null);
            setDisabled(true);
            setSubmitting(() => false);
            setUploadSuccessful(() => true);
            show();
            // const timer = setTimeout(() => router.push("/uploads/annualdocs"), 3000);
            // return () => clearTimeout(timer);

        } catch (error) {
            setUploadPercentage(0);
            setFile(null);
            setDisabled(true);
            setSubmitting(false);
            if (error.response) {
                console.log(error.response.data);
                setUploadErrors(() => error.response.data.body);
                show();
            }
        }
    };

    return (
        <>
            {submitting && (
                <ProcessorSpinner
                    visible={true}
                    text={`${uploadPercentage === 0
                        ? 'Uploading...'
                        : uploadPercentage === 100
                            ? 'Processing...'
                            : null
                        }`}
                />
            )}

            <SectionTitle title="Schedule Uploads" subtitle="Annual PAYE Returns" />
            <Widget>
                <form onSubmit={handleSubmit(handleUpload)}>
                    <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4">

                        <div className="w-full lg:w-1/12">
                            <p className="font-bold"><span>Year</span> {year}</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <input
                                required
                                type="file"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={fileHandler}
                                onClick={(e) => (e.target.value = null)}
                            />
                            <small className="text-red-600">Document to upload does not accept comma</small>
                            <div className="flex items-center">
                                <button
                                    className="btn btn-default btn-outlined bg-transparent mr-4"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        fileInputRef.current.click();
                                    }}
                                >
                                    select file
                                </button>
                                <p>{file ? file.name : "no file chosen yet"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <SubmitButton type="submit" disabled={disabled}>
                            Submit
                        </SubmitButton>
                    </div>
                </form>

                {open && (
                    <>
                        <div className="modal-backdrop fade-in"></div>
                        <div
                            className={`modal show ${background === 'dark' ? 'dark' : ''}`}
                            data-background={background}
                        >
                            <div
                                className="relative w-auto lg:my-4 mx-auto lg:max-w-lg max-w-sm"
                                ref={modalRef}
                            >
                                <div className="bg-white  text-gray-900 border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none">
                                    <div className="relative p-4 flex-auto">
                                        <div className="flex items-start justify-start p-2 space-x-4">
                                            <div className="flex-shrink-0 w-12">
                                                {uploadErrors.length > 0 ? (
                                                    <span className="h-10 w-10 bg-red-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                                                        <FiX
                                                            size={18}
                                                            className="stroke-current text-red-500"
                                                        />
                                                    </span>
                                                ) : uploadSuccessful ? (
                                                    <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                                                        <FiCheck
                                                            size={18}
                                                            className="stroke-current text-green-500"
                                                        />
                                                    </span>
                                                ) : null}
                                            </div>
                                            <div className="w-full">
                                                <div className="text-lg mb-2 font-bold">
                                                    {uploadErrors.length > 0 ? (
                                                        <span>Failed to Upload</span>
                                                    ) : uploadSuccessful ? (
                                                        <span>Upload Successful</span>
                                                    ) : null}
                                                </div>
                                                <div className="overflow-auto max-h-64">
                                                    {uploadErrors.length > 0 &&
                                                        uploadErrors.map((err, i) => (
                                                            <li className="text-red-500" key={i}>
                                                                {err}
                                                            </li>
                                                        ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end p-4 border-t border-gray-200 dark:border-gray-700 border-solid rounded-b space-x-2">
                                        <button
                                            className="btn btn-default btn-rounded bg-white hover:bg-gray-100 text-gray-900"
                                            type="button"
                                            onClick={hide}
                                        >
                                            Ok
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                <div className="flex justify-end">
                    <div>

                        <p className="text-center text-xl">Sample Csv</p>
                        <SampleCsv />
                        <div className="flex justify-center">
                            <div className="">
                                <Link legacyBehavior href="/csv/annual_returns_csv.csv">
                                    <a className="flex overflow-hidden btn btn-default btn-outlined  mr-4 bg-transparent text-green-500 hover:text-green-700 border-green-500 hover:border-green-700">
                                        <FiArrowDown size="16" className="animate-bounce" />
                                        Download sample CSV
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Widget>

        </>
    );
};

export default AnnualUploadcsv;

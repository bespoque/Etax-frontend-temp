import React, { useEffect, useState } from 'react'
import Widget from "../widget";
import axios from 'axios';
import url from "../../config/url";
import Link from "next/link";
import setAuthToken from '../../functions/setAuthToken';
import Loader from 'react-loader-spinner';
import { FiTrash, FiTrash2 } from 'react-icons/fi';

export const ViewDocs = () => {
  const [uploadedDocs, setDocuments] = useState([])
  const [isFetching, setIsFetching] = useState(() => true);
  const [deleted, setDeleted] = useState(() => true);
  setAuthToken();
  useEffect(() => {
    const fetchDocs = async () => {
      const year = {
        "year": 2022
      }
      try {
        const result = await axios.post(`${url.BASE_URL}annual/view-annual-uploads`, year);
        let docs = result.data.body.uploads;
        console.log("docs", docs);
        setDocuments(docs)
        setIsFetching(false);
      }

      catch (error) {
        console.log('Error', error);
        setIsFetching(false);
      }
    };
    fetchDocs();
  }, [deleted]);


  const coverLetter = uploadedDocs.filter(c => c.doc_title === "cover_letter")

  const coverL = coverLetter.map((doc) => {
    return doc.doc_name
  })

  const indReturnLetter = uploadedDocs.filter(c => c.doc_title === "indv_return_letter")

  const indReturnL = indReturnLetter.map((doc) => {
    return doc.doc_name
  })

  const expertriateLetter = uploadedDocs.filter(c => c.doc_title === "exp_order_letter")

  const expertriateL = expertriateLetter.map((doc) => {
    return doc.doc_name
  })

  const monthlyPayrollSchedule = uploadedDocs.filter(c => c.doc_title === "mnthly_pay_sched")

  // const monthlyPayrollS = monthlyPayrollSchedule.filter(item => item !== null && item !== "")

  const payeRemittance = uploadedDocs.filter(c => c.doc_title === "paye_remittance")

  const evidenceOfPayeR = payeRemittance.map((doc) => {
    return doc.doc_name
  })

  const existStaffList = uploadedDocs.filter(c => c.doc_title === "exit_staff_list")

  const exitStaffL = existStaffList.map((doc) => {
    return doc.doc_name
  })

  const TrialBal = uploadedDocs.filter(c => c.doc_title === "endyr_trial_bal")
  const TrialBalance = TrialBal.map((doc) => {
    return doc.doc_name
  })

  const withHoldingTaxDeduct = uploadedDocs.filter(c => c.doc_title === "wht_tax_deduct")
  const withTaxD = withHoldingTaxDeduct.map((doc) => {
    return doc.doc_name
  })

  const withHoldingTaxReceipt = uploadedDocs.filter(c => c.doc_title === "wht_tax_receipts")
  const withTaxR = withHoldingTaxReceipt.map((doc) => {
    return doc.doc_name
  })

  const monthlyImmigrationReturn = uploadedDocs.filter(c => c.doc_title === "mnthly_immi_returns")
  const monthlyImmR = monthlyImmigrationReturn.map((doc) => {
    return doc.doc_name
  })

  const devLevyReceipts = uploadedDocs.filter(c => c.doc_title === "dev_levy_receipts")
  const devLevyR = devLevyReceipts.map((doc) => {
    return doc.doc_name
  })

  const busPremReceipts = uploadedDocs.filter(c => c.doc_title === "bus_premises_receipt")
  const busPremisesR = busPremReceipts.map((doc) => {
    return doc.doc_name
  })

  const groundRentReceipts = uploadedDocs.filter(c => c.doc_title === "grnd_rent_receipts")
  const groundRentR = groundRentReceipts.map((doc) => {
    return doc.doc_name
  })

  const sscl = uploadedDocs.filter(c => c.doc_title === "sscl")
 
  const SSCLevy = sscl.map((doc) => {
    return doc.doc_name
  })
  // const pensionRemittance = uploadedDocs.map(function (doc) {
  //   let pensionRem = doc.pension_remittance
  //   return pensionRem
  // })
  // const pensionR = pensionRemittance.filter(item => item !== null && item !== "")

  // const nhfRemittance = uploadedDocs.map(function (doc) {
  //   let nhfRem = doc.nhf_remittance
  //   return nhfRem
  // })
  // const nhfR = nhfRemittance.filter(item => item !== null && item !== "")

  // const nhisRemittance = uploadedDocs.map(function (doc) {
  //   let nhisRem = doc.nhis_remittance
  //   return nhisRem
  // })
  // const nhisR = nhisRemittance.filter(item => item !== null && item !== "")

  // const lapRemittance = uploadedDocs.map(function (doc) {
  //   let lapRem = doc.lap_remittance
  //   return lapRem
  // })
  // const lapR = lapRemittance.filter(item => item !== null && item !== "")

  console.log("coverL", coverL);
  const DeleteSubmissionLetterY1 = (i) => {
    setIsFetching(true)
    const list = [...coverL];
    let fileName = list[i];
    console.log("fileName", fileName);
    let uploadFile = {
      doc_name: fileName
    }
    axios.delete(`${url.BASE_URL}annual/delete-annual-doc`, { data: uploadFile })
      .then(function (response) {
        setIsFetching(false)
        setDeleted(!deleted)
        window.reload()
      })
      .catch(function (error) {
        setIsFetching(false)
      })

  }

  const DeleteIndReLetterY1 = (i) => {
    setIsFetching(true)
    const list = [...indReturnL];
    let fileName = list[i];
    let uploadFile = {
      doc_name: fileName
    }
    axios.delete(`${url.BASE_URL}annual/delete-annual-doc`, { data: uploadFile })
      .then(function (response) {
        setIsFetching(false)
        setDeleted(!deleted)
        window.reload()
      })
      .catch(function (error) {
        setIsFetching(false)
      })

  }

  const DeleteExpLetterY1 = (i) => {
    setIsFetching(true)
    const list = [...expertriateL];
    let fileName = list[i];
    let uploadFile = {
      doc_name: fileName
    }
    axios.delete(`${url.BASE_URL}annual/delete-annual-doc`, { data: uploadFile })
      .then(function (response) {
        setIsFetching(false)
        setDeleted(!deleted)
        window.reload()
      })
      .catch(function (error) {
        setIsFetching(false)
      })

  }

  const DeletePayeRemY1 = (i) => {
    setIsFetching(true)
    const list = [...evidenceOfPayeR];
    let fileName = list[i];
    let uploadFile = {
      doc_name: fileName
    }
    axios.delete(`${url.BASE_URL}annual/delete-annual-doc`, { data: uploadFile })
      .then(function (response) {
        setIsFetching(false)
        setDeleted(!deleted)
        window.reload()
      })
      .catch(function (error) {
        setIsFetching(false)
      })

  }

  const DeleteExitStaffListY1 = (i) => {
    setIsFetching(true)
    const list = [...exitStaffL];
    let fileName = list[i];
    let uploadFile = {
      doc_name: fileName
    }
    axios.delete(`${url.BASE_URL}annual/delete-annual-doc`, { data: uploadFile })
      .then(function (response) {
        setIsFetching(false)
        setDeleted(!deleted)
        window.reload()
      })
      .catch(function (error) {
        setIsFetching(false)
      })

  }

  const DeleteTrialBalY1 = (i) => {
    setIsFetching(true)
    const list = [...TrialBalance];
    let fileName = list[i];
    let uploadFile = {
      doc_name: fileName
    }
    axios.delete(`${url.BASE_URL}annual/delete-annual-doc`, { data: uploadFile })
      .then(function (response) {
        setIsFetching(false)
        setDeleted(!deleted)
        window.reload()
      })
      .catch(function (error) {
        setIsFetching(false)
      })

  }

  const DeleteWthTaxDedY1 = (i) => {
    setIsFetching(true)
    const list = [...withTaxD];
    let fileName = list[i];
    let uploadFile = {
      doc_name: fileName
    }
    axios.delete(`${url.BASE_URL}annual/delete-annual-doc`, { data: uploadFile })
      .then(function (response) {
        setIsFetching(false)
        setDeleted(!deleted)
        window.reload()
      })
      .catch(function (error) {
        setIsFetching(false)
      })

  }

  const DeleteWthTaxReY1 = (i) => {
    setIsFetching(true)
    const list = [...withTaxR];
    let fileName = list[i];
    let uploadFile = {
      doc_name: fileName
    }
    axios.delete(`${url.BASE_URL}annual/delete-annual-doc`, { data: uploadFile })
      .then(function (response) {
        setIsFetching(false)
        setDeleted(!deleted)
        window.reload()
      })
      .catch(function (error) {
        setIsFetching(false)
      })

  }

  const DeleteMnthImReY1 = (i) => {
    setIsFetching(true)
    const list = [...monthlyImmR];
    let fileName = list[i];
    let uploadFile = {
      doc_name: fileName
    }
    axios.delete(`${url.BASE_URL}annual/delete-annual-doc`, { data: uploadFile })
      .then(function (response) {
        setIsFetching(false)
        setDeleted(!deleted)
        window.reload()
      })
      .catch(function (error) {
        setIsFetching(false)
      })

  }

  const DeleteDevLeReY1 = (i) => {
    setIsFetching(true)
    const list = [...devLevyR];
    let fileName = list[i];
    let uploadFile = {
      doc_name: fileName
    }
    axios.delete(`${url.BASE_URL}annual/delete-annual-doc`, { data: uploadFile })
      .then(function (response) {
        setIsFetching(false)
        setDeleted(!deleted)
        window.reload()
      })
      .catch(function (error) {
        setIsFetching(false)
      })

  }

  const DeleteBusPremY1 = (i) => {
    setIsFetching(true)
    const list = [...busPremisesR];
    let fileName = list[i];
    let uploadFile = {
      doc_name: fileName
    }
    axios.delete(`${url.BASE_URL}annual/delete-annual-doc`, { data: uploadFile })
      .then(function (response) {
        setIsFetching(false)
        setDeleted(!deleted)
        window.reload()
      })
      .catch(function (error) {
        setIsFetching(false)
      })

  }

  const DeleteGrndRent = (i) => {
    setIsFetching(true)
    const list = [...groundRentR];
    let fileName = list[i];
    let uploadFile = {
      doc_name: fileName
    }
    axios.delete(`${url.BASE_URL}annual/delete-annual-doc`, { data: uploadFile })
      .then(function (response) {
        setIsFetching(false)
        setDeleted(!deleted)
        window.reload()
      })
      .catch(function (error) {
        setIsFetching(false)
      })

  }

  const DeleteSocialServ = (i) => {
    setIsFetching(true)
    const list = [...SSCLevy];
    let fileName = list[i];
    let uploadFile = {
      doc_name: fileName
    }
    axios.delete(`${url.BASE_URL}annual/delete-annual-doc`, { data: uploadFile })
      .then(function (response) {
        setIsFetching(false)
        setDeleted(!deleted)
        window.reload()
      })
      .catch(function (error) {
        setIsFetching(false)
      })

  }


  return (
    <>
      {isFetching && (
        <div className="flex justify-center item mb-2">
          <Loader
            visible={isFetching}
            type="BallTriangle"
            color="#00FA9A"
            height={19}
            width={19}
            timeout={0}
            className="ml-2"
          />
          <p>Fetching data...</p>
        </div>
      )}

      <div className="grid justify-items-start">

        <div className="font-semibold">
          Submission letter
        </div>

        <div className="flex">
          {coverL.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/cover_letter/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              <p><button onClick={() => DeleteSubmissionLetterY1(i)}><FiTrash2 color="red" /></button></p>
            </div>
          ))}
        </div>

      </div>

      <hr />

      <div className="grid justify-items-start">
        <div>
          <div className="font-semibold">
            Individual tax returns letter
          </div>
        </div>
        <div className="flex">
          {indReturnL.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/indv_return_letter/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              <p><button onClick={() => DeleteIndReLetterY1(i)}><FiTrash2 color="red" /></button></p>
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Letter of expatriate order
        </div>

        <div className="flex">
          {expertriateL.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/exp_order_letter/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              <p><button onClick={() => DeleteExpLetterY1(i)}><FiTrash2 color="red" /></button></p>
            </div>
          ))}
        </div>

      </div>

      <hr />
      {/* 
      <div className="grid justify-items-start">
        <div className="font-semibold">
          Monthly payroll schedule
        </div>

        <div className="flex">
          {monthlyPayrollS.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.devportal-live/uploads/annual-returns/mnthly_pay_sched/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p>
            </div>
          ))}
        </div>

      </div> */}

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Evidence of PAYE remittance
        </div>

        <div className="flex">
          {evidenceOfPayeR.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/paye_remittance/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              <p><button onClick={() => DeletePayeRemY1(i)}><FiTrash2 color="red" /></button></p>
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Exit staff list
        </div>
        <div className="flex">
          {exitStaffL.map((element, i) => (
            <div key={i} className="p-2">
              <a target="_blank" href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/exit_staff_list/${element}`} className="underline underline-offset-4 text-blue-600">Download</a>
              <p><button onClick={() => DeleteExitStaffListY1(i)}><FiTrash2 color="red" /></button></p>
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Trial balance for Year ending
        </div>
        <div className="flex">
          {TrialBalance.map((element, i) => (
            <div key={i} className="p-2">
              <a target="_blank" href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/endyr_trial_bal/${element}`} className="underline underline-offset-4 text-blue-600">Download</a>
              <p><button onClick={() => DeleteTrialBalY1(i)}><FiTrash2 color="red" /></button></p>
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Schedule of withholding tax deductions
        </div>
        <div className="flex">
          {withTaxD.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/wht_tax_deduct/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              <p><button onClick={() => DeleteWthTaxDedY1(i)}><FiTrash2 color="red" /></button></p>
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Withholding tax receipts
        </div>
        <div className="flex">
          {withTaxR.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/wht_tax_receipts/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              <p><button onClick={() => DeleteWthTaxReY1(i)}><FiTrash2 color="red" /></button></p>
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Monthly Immigration returns
        </div>
        <div className="flex">
          {monthlyImmR.map((element, i) => (
            <div key={i} className="p-2">
              <a target="_blank" href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/mnthly_immi_returns/${element}`} className="underline underline-offset-4 text-blue-600">Download</a>
              <p><button onClick={() => DeleteMnthImReY1(i)}><FiTrash2 color="red" /></button></p>
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Development levy receipts
        </div>
        <div className="flex">
          {devLevyR.map((element, i) => (
            <div key={i} className="p-2">
              <a target="_blank" href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/dev_levy_receipts/${element}`} className="underline underline-offset-4 text-blue-600">Download</a>
              <p><button onClick={() => DeleteDevLeReY1(i)}><FiTrash2 color="red" /></button></p>
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Business premises receipts
        </div>
        <div className="flex">
          {busPremisesR.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/bus_premises_receipt/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              <p><button onClick={()=>DeleteBusPremY1(i)}><FiTrash2 color="red" /></button></p>
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Ground rent receipts
        </div>
        <div className="flex">
          {groundRentR.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/grnd_rent_receipts/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              <p><button onClick={()=> DeleteGrndRent(i)}><FiTrash2 color="red" /></button></p>
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Social service contributions levy
        </div>
        <div className="flex">
          {SSCLevy.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/sscl/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              <p><button onClick={()=> DeleteSocialServ(i)}><FiTrash2 color="red" /></button></p>
            </div>
          ))}
        </div>
      </div>

      <hr />

      {/* <div className="grid justify-items-start">
        <div className="font-semibold">
          Evidence of remittance of pension
        </div>
        <div className="flex">
          {pensionR.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/pension_remittance/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p>
            </div>
          ))}
        </div>
      </div> */}

      <hr />

      {/* <div className="grid justify-items-start">
        <div className="font-semibold">
          Evidence of remittance of NHF
        </div>
        <div className="flex">
          {nhfR.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/nhf_remittance/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p>
            </div>
          ))}
        </div>
      </div> */}

      <hr />

      {/* <div className="grid justify-items-start">
        <div className="font-semibold">
          Evidence of remittance of NHIS
        </div>
        <div className="flex">
          {nhisR.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/nhis_remittance/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p>
            </div>
          ))}
        </div>
      </div> */}

      <hr />

      {/* <div className="grid justify-items-start">
        <div className="font-semibold">
          Evidence of remittance of LAP
        </div>
        <div className="flex">
          {lapR.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/lap_remittance/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p>
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
};

export const ViewDocsYr2 = () => {
  const [uploadedDocs, setDocuments] = useState([])
  const [isFetching, setIsFetching] = useState(() => true);
  setAuthToken();
  useEffect(() => {
    const fetchDocs = async () => {
      const year = {
        "year": 2021
      }
      try {
        const result = await axios.post(`${url.BASE_URL}annual/view-annual-uploads`, year);
        let docs = result.data.body.uploads;
        setDocuments(docs)
        setIsFetching(false);
      }

      catch (error) {
        console.log('Error', error);
        setIsFetching(false);
      }
    };
    fetchDocs();
  }, []);

  const coverLetter = uploadedDocs.map(function (doc) {
    let cover = doc.cover_letter
    return cover
  })
  const coverL = coverLetter.filter(item => item !== null && item !== "")

  const indReturnLetter = uploadedDocs.map(function (doc) {
    let indLet = doc.indv_return_letter
    return indLet
  })
  const indReturnL = indReturnLetter.filter(item => item !== null && item !== "")

  const expertriateLetter = uploadedDocs.map(function (doc) {
    let expLet = doc.exp_order_letter
    return expLet
  })
  const expertriateL = expertriateLetter.filter(item => item !== null && item !== "")

  const monthlyPayrollSchedule = uploadedDocs.map(function (doc) {
    let mthlyPaySched = doc.mnthly_pay_sched
    return mthlyPaySched
  })
  const monthlyPayrollS = monthlyPayrollSchedule.filter(item => item !== null && item !== "")

  const payeRemittance = uploadedDocs.map(function (doc) {
    let payeR = doc.paye_remittance
    return payeR
  })
  const evidenceOfPayeR = payeRemittance.filter(item => item !== null && item !== "")

  const existStaffList = uploadedDocs.map(function (doc) {
    let exitStaf = doc.exit_staff_list
    return exitStaf
  })
  const exitStaffL = existStaffList.filter(item => item !== null && item !== "")

  const TrialBal = uploadedDocs.map(function (doc) {
    let trialB = doc.endyr_trial_bal
    return trialB
  })
  const TrialBal21 = TrialBal.filter(item => item !== null && item !== "")

  const withHoldingTaxDeduct = uploadedDocs.map(function (doc) {
    let withTax = doc.wht_tax_deduct
    return withTax
  })
  const withTaxD = withHoldingTaxDeduct.filter(item => item !== null && item !== "")

  const withHoldingTaxReceipt = uploadedDocs.map(function (doc) {
    let withTaxRec = doc.wht_tax_receipts
    return withTaxRec
  })
  const withTaxR = withHoldingTaxReceipt.filter(item => item !== null && item !== "")

  const monthlyImmigrationReturn = uploadedDocs.map(function (doc) {
    let monthlyImm = doc.mnthly_immi_returns
    return monthlyImm
  })
  const monthlyImmR = monthlyImmigrationReturn.filter(item => item !== null && item !== "")

  const devLevyReceipts = uploadedDocs.map(function (doc) {
    let devLevy = doc.dev_levy_receipts
    return devLevy
  })
  const devLevyR = devLevyReceipts.filter(item => item !== null && item !== "")

  const busPremReceipts = uploadedDocs.map(function (doc) {
    let busPrem = doc.bus_premises_receipt
    return busPrem
  })
  const busPremisesR = busPremReceipts.filter(item => item !== null && item !== "")

  const groundRentReceipts = uploadedDocs.map(function (doc) {
    let groundRen = doc.grnd_rent_receipts
    return groundRen
  })
  const groundRentR = groundRentReceipts.filter(item => item !== null && item !== "")

  const sscl = uploadedDocs.map(function (doc) {
    let ssclR = doc.sscl
    return ssclR
  })
  const SSCLevy = sscl.filter(item => item !== null && item !== "")

  const pensionRemittance = uploadedDocs.map(function (doc) {
    let pensionRem = doc.pension_remittance
    return pensionRem
  })
  const pensionR = pensionRemittance.filter(item => item !== null && item !== "")

  const nhfRemittance = uploadedDocs.map(function (doc) {
    let nhfRem = doc.nhf_remittance
    return nhfRem
  })
  const nhfR = nhfRemittance.filter(item => item !== null && item !== "")

  const nhisRemittance = uploadedDocs.map(function (doc) {
    let nhisRem = doc.nhis_remittance
    return nhisRem
  })
  const nhisR = nhisRemittance.filter(item => item !== null && item !== "")

  const lapRemittance = uploadedDocs.map(function (doc) {
    let lapRem = doc.lap_remittance
    return lapRem
  })
  const lapR = lapRemittance.filter(item => item !== null && item !== "")

  const DeleteSubmissionLetter = () => {

  }


  return (
    <>
      {isFetching && (
        <div className="flex justify-center item mb-2">
          <Loader
            visible={isFetching}
            type="BallTriangle"
            color="#00FA9A"
            height={19}
            width={19}
            timeout={0}
            className="ml-2"
          />
          <p>Fetching data...</p>
        </div>
      )}

      <div className="grid justify-items-start">

        <div className="font-semibold">
          Submission letter
        </div>

        <div className="flex">
          {coverL.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/cover_letter/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>

      </div>

      <hr />

      <div className="grid justify-items-start">

        <div>
          <div className="font-semibold">
            Individual tax returns letter
          </div>
        </div>


        <div className="flex">
          {indReturnL.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/indv_return_letter/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Letter of expatriate order
        </div>

        <div className="flex">
          {expertriateL.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/exp_order_letter/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>

      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Monthly payroll schedule
        </div>

        <div className="flex">
          {monthlyPayrollS.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.devportal-live/uploads/annual-returns/mnthly_pay_sched/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>

      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Evidence of PAYE remittance
        </div>

        <div className="flex">
          {evidenceOfPayeR.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/paye_remittance/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Exit staff list
        </div>
        <div className="flex">
          {exitStaffL.map((element, i) => (
            <div key={i} className="p-2">
              <a target="_blank" href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/exit_staff_list/${element}`} className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Trial balance for the year ended 31st Dec. 2021
        </div>
        <div className="flex">
          {TrialBal21.map((element, i) => (
            <div key={i} className="p-2">
              <a target="_blank" href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/endyr_trial_bal/${element}`} className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Schedule of withholding tax deductions
        </div>
        <div className="flex">
          {withTaxD.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/wht_tax_deduct/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Withholding tax receipts
        </div>
        <div className="flex">
          {withTaxR.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/wht_tax_receipts/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Monthly Immigration returns
        </div>
        <div className="flex">
          {monthlyImmR.map((element, i) => (
            <div key={i} className="p-2">
              <a target="_blank" href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/mnthly_immi_returns/${element}`} className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Development levy receipts
        </div>
        <div className="flex">
          {devLevyR.map((element, i) => (
            <div key={i} className="p-2">
              <a target="_blank" href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/dev_levy_receipts/${element}`} className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Business premises receipts
        </div>
        <div className="flex">
          {busPremisesR.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/bus_premises_receipt/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Ground rent receipts
        </div>
        <div className="flex">
          {groundRentR.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/grnd_rent_receipts/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Social service contributions levy
        </div>
        <div className="flex">
          {SSCLevy.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/sscl/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Evidence of remittance of pension
        </div>
        <div className="flex">
          {pensionR.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/pension_remittance/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Evidence of remittance of NHF
        </div>
        <div className="flex">
          {nhfR.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/nhf_remittance/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Evidence of remittance of NHIS
        </div>
        <div className="flex">
          {nhisR.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/nhis_remittance/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Evidence of remittance of LAP
        </div>
        <div className="flex">
          {lapR.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/lap_remittance/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export const ViewDocsYr3 = () => {
  const [uploadedDocs, setDocuments] = useState([])
  const [isFetching, setIsFetching] = useState(() => true);
  setAuthToken();
  useEffect(() => {
    const fetchDocs = async () => {
      const year = {
        "year": 2020
      }
      try {
        const result = await axios.post(`${url.BASE_URL}annual/view-annual-uploads`, year);
        let docs = result.data.body.uploads;
        setDocuments(docs)
        setIsFetching(false);
      }

      catch (error) {
        console.log('Error', error);
        setIsFetching(false);
      }
    };
    fetchDocs();
  }, []);

  const coverLetter = uploadedDocs.map(function (doc) {
    let cover = doc.cover_letter
    return cover
  })
  const coverL = coverLetter.filter(item => item !== null && item !== "")

  const indReturnLetter = uploadedDocs.map(function (doc) {
    let indLet = doc.indv_return_letter
    return indLet
  })
  const indReturnL = indReturnLetter.filter(item => item !== null && item !== "")

  const expertriateLetter = uploadedDocs.map(function (doc) {
    let expLet = doc.exp_order_letter
    return expLet
  })
  const expertriateL = expertriateLetter.filter(item => item !== null && item !== "")

  const monthlyPayrollSchedule = uploadedDocs.map(function (doc) {
    let mthlyPaySched = doc.mnthly_pay_sched
    return mthlyPaySched
  })
  const monthlyPayrollS = monthlyPayrollSchedule.filter(item => item !== null && item !== "")

  const payeRemittance = uploadedDocs.map(function (doc) {
    let payeR = doc.paye_remittance
    return payeR
  })
  const evidenceOfPayeR = payeRemittance.filter(item => item !== null && item !== "")

  const existStaffList = uploadedDocs.map(function (doc) {
    let exitStaf = doc.exit_staff_list
    return exitStaf
  })
  const exitStaffL = existStaffList.filter(item => item !== null && item !== "")

  const TrialBal = uploadedDocs.map(function (doc) {
    let trialB = doc.endyr_trial_bal
    return trialB
  })
  const TrialBal21 = TrialBal.filter(item => item !== null && item !== "")

  const withHoldingTaxDeduct = uploadedDocs.map(function (doc) {
    let withTax = doc.wht_tax_deduct
    return withTax
  })
  const withTaxD = withHoldingTaxDeduct.filter(item => item !== null && item !== "")

  const withHoldingTaxReceipt = uploadedDocs.map(function (doc) {
    let withTaxRec = doc.wht_tax_receipts
    return withTaxRec
  })
  const withTaxR = withHoldingTaxReceipt.filter(item => item !== null && item !== "")

  const monthlyImmigrationReturn = uploadedDocs.map(function (doc) {
    let monthlyImm = doc.mnthly_immi_returns
    return monthlyImm
  })
  const monthlyImmR = monthlyImmigrationReturn.filter(item => item !== null && item !== "")

  const devLevyReceipts = uploadedDocs.map(function (doc) {
    let devLevy = doc.dev_levy_receipts
    return devLevy
  })
  const devLevyR = devLevyReceipts.filter(item => item !== null && item !== "")

  const busPremReceipts = uploadedDocs.map(function (doc) {
    let busPrem = doc.bus_premises_receipt
    return busPrem
  })
  const busPremisesR = busPremReceipts.filter(item => item !== null && item !== "")

  const groundRentReceipts = uploadedDocs.map(function (doc) {
    let groundRen = doc.grnd_rent_receipts
    return groundRen
  })
  const groundRentR = groundRentReceipts.filter(item => item !== null && item !== "")

  const sscl = uploadedDocs.map(function (doc) {
    let ssclR = doc.sscl
    return ssclR
  })
  const SSCLevy = sscl.filter(item => item !== null && item !== "")

  const pensionRemittance = uploadedDocs.map(function (doc) {
    let pensionRem = doc.pension_remittance
    return pensionRem
  })
  const pensionR = pensionRemittance.filter(item => item !== null && item !== "")

  const nhfRemittance = uploadedDocs.map(function (doc) {
    let nhfRem = doc.nhf_remittance
    return nhfRem
  })
  const nhfR = nhfRemittance.filter(item => item !== null && item !== "")

  const nhisRemittance = uploadedDocs.map(function (doc) {
    let nhisRem = doc.nhis_remittance
    return nhisRem
  })
  const nhisR = nhisRemittance.filter(item => item !== null && item !== "")

  const lapRemittance = uploadedDocs.map(function (doc) {
    let lapRem = doc.lap_remittance
    return lapRem
  })
  const lapR = lapRemittance.filter(item => item !== null && item !== "")

  const DeleteSubmissionLetter = () => {

  }


  return (
    <>
      {isFetching && (
        <div className="flex justify-center item mb-2">
          <Loader
            visible={isFetching}
            type="BallTriangle"
            color="#00FA9A"
            height={19}
            width={19}
            timeout={0}
            className="ml-2"
          />
          <p>Fetching data...</p>
        </div>
      )}

      <div className="grid justify-items-start">

        <div className="font-semibold">
          Submission letter
        </div>

        <div className="flex">
          {coverL.map((element, index) => (
            <div key={index} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/cover_letter/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={()=> console.log(element)}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>

      </div>

      <hr />

      <div className="grid justify-items-start">

        <div>
          <div className="font-semibold">
            Individual tax returns letter
          </div>
        </div>


        <div className="flex">
          {indReturnL.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/indv_return_letter/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Letter of expatriate order
        </div>

        <div className="flex">
          {expertriateL.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/exp_order_letter/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>

      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Monthly payroll schedule
        </div>

        <div className="flex">
          {monthlyPayrollS.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.devportal-live/uploads/annual-returns/mnthly_pay_sched/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>

      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Evidence of PAYE remittance
        </div>

        <div className="flex">
          {evidenceOfPayeR.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/paye_remittance/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Exit staff list
        </div>
        <div className="flex">
          {exitStaffL.map((element, i) => (
            <div key={i} className="p-2">
              <a target="_blank" href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/exit_staff_list/${element}`} className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Trial balance for the year ended 31st Dec. 2021
        </div>
        <div className="flex">
          {TrialBal21.map((element, i) => (
            <div key={i} className="p-2">
              <a target="_blank" href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/endyr_trial_bal/${element}`} className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Schedule of withholding tax deductions
        </div>
        <div className="flex">
          {withTaxD.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/wht_tax_deduct/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Withholding tax receipts
        </div>
        <div className="flex">
          {withTaxR.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/wht_tax_receipts/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Monthly Immigration returns
        </div>
        <div className="flex">
          {monthlyImmR.map((element, i) => (
            <div key={i} className="p-2">
              <a target="_blank" href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/mnthly_immi_returns/${element}`} className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Development levy receipts
        </div>
        <div className="flex">
          {devLevyR.map((element, i) => (
            <div key={i} className="p-2">
              <a target="_blank" href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/dev_levy_receipts/${element}`} className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Business premises receipts
        </div>
        <div className="flex">
          {busPremisesR.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/bus_premises_receipt/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Ground rent receipts
        </div>
        <div className="flex">
          {groundRentR.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/grnd_rent_receipts/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Social service contributions levy
        </div>
        <div className="flex">
          {SSCLevy.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/sscl/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Evidence of remittance of pension
        </div>
        <div className="flex">
          {pensionR.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/pension_remittance/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Evidence of remittance of NHF
        </div>
        <div className="flex">
          {nhfR.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/nhf_remittance/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Evidence of remittance of NHIS
        </div>
        <div className="flex">
          {nhisR.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/nhis_remittance/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Evidence of remittance of LAP
        </div>
        <div className="flex">
          {lapR.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/lap_remittance/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export const ViewDocsYr4 = () => {
  const [uploadedDocs, setDocuments] = useState([])
  const [isFetching, setIsFetching] = useState(() => true);
  setAuthToken();
  useEffect(() => {
    const fetchDocs = async () => {
      const year = {
        "year": 2019
      }
      try {
        const result = await axios.post(`${url.BASE_URL}annual/view-annual-uploads`, year);
        let docs = result.data.body.uploads;
        setDocuments(docs)
        setIsFetching(false);
      }

      catch (error) {
        console.log('Error', error);
        setIsFetching(false);
      }
    };
    fetchDocs();
  }, []);

  const coverLetter = uploadedDocs.map(function (doc) {
    let cover = doc.cover_letter
    return cover
  })
  const coverL = coverLetter.filter(item => item !== null && item !== "")

  const indReturnLetter = uploadedDocs.map(function (doc) {
    let indLet = doc.indv_return_letter
    return indLet
  })
  const indReturnL = indReturnLetter.filter(item => item !== null && item !== "")

  const expertriateLetter = uploadedDocs.map(function (doc) {
    let expLet = doc.exp_order_letter
    return expLet
  })
  const expertriateL = expertriateLetter.filter(item => item !== null && item !== "")

  const monthlyPayrollSchedule = uploadedDocs.map(function (doc) {
    let mthlyPaySched = doc.mnthly_pay_sched
    return mthlyPaySched
  })
  const monthlyPayrollS = monthlyPayrollSchedule.filter(item => item !== null && item !== "")

  const payeRemittance = uploadedDocs.map(function (doc) {
    let payeR = doc.paye_remittance
    return payeR
  })
  const evidenceOfPayeR = payeRemittance.filter(item => item !== null && item !== "")

  const existStaffList = uploadedDocs.map(function (doc) {
    let exitStaf = doc.exit_staff_list
    return exitStaf
  })
  const exitStaffL = existStaffList.filter(item => item !== null && item !== "")

  const TrialBal = uploadedDocs.map(function (doc) {
    let trialB = doc.endyr_trial_bal
    return trialB
  })
  const TrialBal21 = TrialBal.filter(item => item !== null && item !== "")

  const withHoldingTaxDeduct = uploadedDocs.map(function (doc) {
    let withTax = doc.wht_tax_deduct
    return withTax
  })
  const withTaxD = withHoldingTaxDeduct.filter(item => item !== null && item !== "")

  const withHoldingTaxReceipt = uploadedDocs.map(function (doc) {
    let withTaxRec = doc.wht_tax_receipts
    return withTaxRec
  })
  const withTaxR = withHoldingTaxReceipt.filter(item => item !== null && item !== "")

  const monthlyImmigrationReturn = uploadedDocs.map(function (doc) {
    let monthlyImm = doc.mnthly_immi_returns
    return monthlyImm
  })
  const monthlyImmR = monthlyImmigrationReturn.filter(item => item !== null && item !== "")

  const devLevyReceipts = uploadedDocs.map(function (doc) {
    let devLevy = doc.dev_levy_receipts
    return devLevy
  })
  const devLevyR = devLevyReceipts.filter(item => item !== null && item !== "")

  const busPremReceipts = uploadedDocs.map(function (doc) {
    let busPrem = doc.bus_premises_receipt
    return busPrem
  })
  const busPremisesR = busPremReceipts.filter(item => item !== null && item !== "")

  const groundRentReceipts = uploadedDocs.map(function (doc) {
    let groundRen = doc.grnd_rent_receipts
    return groundRen
  })
  const groundRentR = groundRentReceipts.filter(item => item !== null && item !== "")

  const sscl = uploadedDocs.map(function (doc) {
    let ssclR = doc.sscl
    return ssclR
  })
  const SSCLevy = sscl.filter(item => item !== null && item !== "")

  const pensionRemittance = uploadedDocs.map(function (doc) {
    let pensionRem = doc.pension_remittance
    return pensionRem
  })
  const pensionR = pensionRemittance.filter(item => item !== null && item !== "")

  const nhfRemittance = uploadedDocs.map(function (doc) {
    let nhfRem = doc.nhf_remittance
    return nhfRem
  })
  const nhfR = nhfRemittance.filter(item => item !== null && item !== "")

  const nhisRemittance = uploadedDocs.map(function (doc) {
    let nhisRem = doc.nhis_remittance
    return nhisRem
  })
  const nhisR = nhisRemittance.filter(item => item !== null && item !== "")

  const lapRemittance = uploadedDocs.map(function (doc) {
    let lapRem = doc.lap_remittance
    return lapRem
  })
  const lapR = lapRemittance.filter(item => item !== null && item !== "")

  const DeleteSubmissionLetter = () => {

  }


  return (
    <>
      {isFetching && (
        <div className="flex justify-center item mb-2">
          <Loader
            visible={isFetching}
            type="BallTriangle"
            color="#00FA9A"
            height={19}
            width={19}
            timeout={0}
            className="ml-2"
          />
          <p>Fetching data...</p>
        </div>
      )}

      <div className="grid justify-items-start">

        <div className="font-semibold">
          Submission letter
        </div>

        <div className="flex">
          {coverL.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/cover_letter/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>

      </div>

      <hr />

      <div className="grid justify-items-start">

        <div>
          <div className="font-semibold">
            Individual tax returns letter
          </div>
        </div>


        <div className="flex">
          {indReturnL.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/indv_return_letter/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Letter of expatriate order
        </div>

        <div className="flex">
          {expertriateL.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/exp_order_letter/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>

      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Monthly payroll schedule
        </div>

        <div className="flex">
          {monthlyPayrollS.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.devportal-live/uploads/annual-returns/mnthly_pay_sched/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>

      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Evidence of PAYE remittance
        </div>

        <div className="flex">
          {evidenceOfPayeR.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/paye_remittance/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Exit staff list
        </div>
        <div className="flex">
          {exitStaffL.map((element, i) => (
            <div key={i} className="p-2">
              <a target="_blank" href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/exit_staff_list/${element}`} className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Trial balance for the year ended 31st Dec. 2021
        </div>
        <div className="flex">
          {TrialBal21.map((element, i) => (
            <div key={i} className="p-2">
              <a target="_blank" href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/endyr_trial_bal/${element}`} className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Schedule of withholding tax deductions
        </div>
        <div className="flex">
          {withTaxD.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/wht_tax_deduct/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Withholding tax receipts
        </div>
        <div className="flex">
          {withTaxR.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/wht_tax_receipts/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Monthly Immigration returns
        </div>
        <div className="flex">
          {monthlyImmR.map((element, i) => (
            <div key={i} className="p-2">
              <a target="_blank" href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/mnthly_immi_returns/${element}`} className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Development levy receipts
        </div>
        <div className="flex">
          {devLevyR.map((element, i) => (
            <div key={i} className="p-2">
              <a target="_blank" href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/dev_levy_receipts/${element}`} className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Business premises receipts
        </div>
        <div className="flex">
          {busPremisesR.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/bus_premises_receipt/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Ground rent receipts
        </div>
        <div className="flex">
          {groundRentR.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/grnd_rent_receipts/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Social service contributions levy
        </div>
        <div className="flex">
          {SSCLevy.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/sscl/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Evidence of remittance of pension
        </div>
        <div className="flex">
          {pensionR.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/pension_remittance/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Evidence of remittance of NHF
        </div>
        <div className="flex">
          {nhfR.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/nhf_remittance/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Evidence of remittance of NHIS
        </div>
        <div className="flex">
          {nhisR.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/nhis_remittance/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Evidence of remittance of LAP
        </div>
        <div className="flex">
          {lapR.map((element, i) => (
            <div key={i} className="p-2">
              <a href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/lap_remittance/${element}`} target="_blank" className="underline underline-offset-4 text-blue-600">Download</a>
              {/* <p><button onClick={DeleteSubmissionLetter}><FiTrash2 color="red" /></button></p> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

import Widget from "../widget";
import { formatNumber } from "../../functions/numbers";
import * as Icons from '../Icons/index';
import Widget1 from "../dashboard/widget-1";
import dateformat from "dateformat";
import Link from 'next/link';
import { useRef } from "react";
import setAuthToken from "../../functions/setAuthToken";
import { CoatOfArms, KgirsLogo2, KogiGov, Signature } from "../Images/Images";
import ReactToPrint from "react-to-print";
import QRCode from "react-qr-code";

const fields = [
  {
    name: "File Ref",
    key: "file_ref",
  },
  {
    name: "KGTIN",
    key: "tp_id",
  },
  {
    name: "Name",
    key: "taxpayer_name",
  },
  {
    name: "Year 1 tax",
    key: "amount1",
  },
  {
    name: "Year 2 tax",
    key: "amount2",
  },
  {
    name: "Year 3 tax",
    key: "amount3",
  },
  {
    name: "Station",
    key: "tax_office",
  },
  {
    name: "Create Time",
    key: "crt_time",
  },
  {
    name: "Status",
    key: "status",
  },

];

export const ViewTccTable = ({ tccData }) => {
  let items = tccData;

  return (
    <>
      <Widget>
        <table className="table divide-y">
          <thead>
            <tr className="">
              {fields.map((field, i) => (
                <th key={i} className="">
                  {field.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.map((tccData, i) => (
              <tr key={i} className="">
                {fields.map((field, j) => (
                  <td key={j} className="">
                    {/* {remittance[field.key]} */}
                    <Link href={`/view/tcc/${tccData.id}`}>
                      <a className="hover:text-blue-500">
                        {tccData[field.key]}
                      </a>
                    </Link>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-16"></div>
        <hr />
      </Widget>
    </>
  );
};

export const PrintSingleTcc = ({
  tccUploads,
  tccID,
  payerDetails,
  assessmentData,
  assessmentData2,
  assessmentData3,
  addAss1,
  addAss2,
  addAss3
}) => {

  const componentRef = useRef();
  let year2
  let year3

  let basdocurl = 'https://annualuploads.bespoque.dev/rhm-live/uploads/da/tcc/'
  let picUpload
  let signature
  let fileRef
  let printPrintTime

  let addAssessmentVal1 = 0
  let addAssessmentVal2 = 0
  let addAssessmentVal3 = 0

  addAss1.forEach((ind, i) => {
    addAssessmentVal1 = Number(ind.amount)
  })

  addAss2.forEach((ind, i) => {
    addAssessmentVal2 = Number(ind.amount)
  })
  addAss3.forEach((ind, i) => {
    addAssessmentVal3 = Number(ind.amount)
  })

  tccUploads.forEach((ind, i) => {
    picUpload = ind.passport
  })

  tccUploads.forEach((ind, i) => {
    signature = ind.sign
  })

  payerDetails.forEach((ind, i) => {
    fileRef = ind.file_ref
  })

  payerDetails.forEach((ind, i) => {
    printPrintTime = ind.aprvPrint_time
  })

  if (printPrintTime === undefined) {
    printPrintTime = new Date()
  } else {
    printPrintTime = printPrintTime
  }


  const year1 = assessmentData.map((ind, i) => {
    return ind.year
  })
  const firstYear = String(year1)

  if (assessmentData2 === "" || assessmentData2 === undefined) {
    year2 = ""
  } else {

    year2 = assessmentData2.map((ind, i) => {
      return ind.year
    })

  }

  const secondYear = String(year2)

  if (assessmentData3 === "" || assessmentData3 === undefined) {
    year3 = ""
  } else {

    year3 = assessmentData3.map((ind, i) => {
      return ind.year
    })
  }
  const thirdYear = String(year3)



  let date = printPrintTime
  let due_date = new Date(date)
  due_date.setDate(due_date.getDate() + 365);
  let expiry = dateformat(due_date, "dd mmm yyyy")

  let Issdate = new Date()
  let Issdue_date = new Date(Issdate)
  let dateIssue = dateformat(Issdue_date, "dd mmm yyyy")

  setAuthToken();
  let ChangePrint = (e) => {
    e.preventDefault()
    let statusObj = {
      id: tccID,
      status: "Printed"
    }
    try {
      let res = axios.post(`${url.BASE_URL}forma/tcc-status`, statusObj);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <div className="m-3 flex justify-end">
        <div onClick={ChangePrint}>
          <ReactToPrint
            // pageStyle='@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; padding: 40px !important; } }'
            pageStyle="@page { size: 7.5in 13in  }"
            trigger={() => <button className="btn w-32 bg-green-600 btn-default text-white
            btn-outlined bg-transparent rounded-md"
              type="submit"
            >
              Print
            </button>}
            content={() => componentRef.current}
          />
        </div>

      </div>

      <section>
        <div ref={componentRef}>
          <div className="flex justify-around">
            <div>



              <div className="flex mb-8">
                <KgirsLogo2 />
                <p className="self-center w-48 font-bold">KOGI STATE INTERNAL REVENUE SERVICE</p>
              </div>

              <div className="flex justify-end">
                <p className="border font-bold p-2 text-center w-64">{`REF - ${fileRef}`}</p>
              </div>

              {payerDetails.map((ind, i) => (
                <div>
                  <div className="flex justify-between my-3">
                    <div className="flex">
                      <div>
                        <img
                          src={`${basdocurl}${picUpload}`}
                          alt=""
                          className="rounded h-16 w-16"
                        />
                      </div>
                      <div className="self-end ml-2">
                        <img
                          src={`${basdocurl}${signature}`}
                          alt=""
                          className="rounded h-10 w-24"
                        />
                      </div>
                    </div>
                    <div className="flex">
                      <CoatOfArms />
                      <p className="border-r-2 ml-2 border-black h-8 self-center"></p>
                      <KogiGov />
                    </div>
                  </div>
                  <p> <span className="font-bold">1.</span> This is to Verify that <span className="font-bold">{ind.taxpayer_name}</span></p>
                  <div>
                    <p>fully paid his/her Personal Income Tax for the past years, that is: <span>
                      {`${secondYear !== "" ? `${firstYear},` : firstYear} ${thirdYear !== "" ? `${secondYear},` : secondYear} ${thirdYear}`}
                    </span>
                    </p>
                  </div>
                </div>
              ))}
              <div className="my-4">
                <p><span className="font-bold">2.</span> Details of his/her assessments are as follows:</p>
              </div>
              <div className="flex justify-center mb-5">
                {payerDetails.map((ind, i) => (
                  <div>
                    <div>
                      <small className="leading-none block">TCC ID </small>
                      <small className="font-bold">{ind.ref}</small>
                    </div>

                    <div className="mt-1">
                      <small className="leading-none block">TAX ID </small>
                      <small className="font-bold">{ind.tp_id}</small>
                    </div>

                    <div className="mt-1">
                      <small className="leading-none block">DATE OF ISSUE </small>
                      <small className="font-bold">{dateIssue}</small>
                    </div>

                    <div className="mt-1">
                      <small className="leading-none block">Tax OFFICE</small>
                      <small className="font-bold">{ind.tax_office}</small>
                    </div>
                  </div>
                ))}

                <div className="w-10"></div>
                <div>
                  <table className="table divide-y mb-4 striped">
                    <thead >
                      <tr style={{ backgroundColor: "#d3fbc6" }}>
                        <th>
                          Tax Year
                        </th>
                        <th className="">
                          Assessed Income
                        </th>
                        <th className="">
                          Tax Paid
                        </th>
                        <th className="">
                          Assessment Type
                        </th>
                      </tr>
                    </thead>

                    <tbody >
                      {assessmentData === "" || assessmentData === undefined ? "" :
                        <tr>
                          <td className="">
                            {assessmentData.map((ind, i) => (
                              <p className="font-bold">{ind.year}</p>

                            ))}
                          </td>
                          {assessmentData.map((ind, i) => (
                            <td className="">
                              <p className="font-bold"> {formatNumber(Number(ind.employed) + Number(ind.self_employed) + Number(ind.other_income))} </p>
                            </td>
                          ))}

                          <td className="">
                            {assessmentData.map((ind, i) => (
                              <p className="font-bold">{formatNumber(Number(ind.tax) + Number(addAssessmentVal1))}</p>
                            ))}
                          </td>
                          <td className="">
                            <p>Direct Assessment</p>
                          </td>
                        </tr>
                      }
                      {assessmentData2 === "" || assessmentData2 === undefined ? "" :
                        <tr>
                          <td className="">
                            {assessmentData2.map((ind, i) => (
                              <p className="font-bold">{ind.year}</p>

                            ))}
                          </td>
                          {assessmentData2.map((ind, i) => (
                            <td className="">
                              <p className="font-bold"> {formatNumber(Number(ind.employed) + Number(ind.self_employed) + Number(ind.other_income))} </p>
                            </td>
                          ))}

                          <td className="">
                            {assessmentData2.map((ind, i) => (
                              <p className="font-bold">{formatNumber(Number(ind.tax) + Number(addAssessmentVal2))}</p>
                            ))}
                          </td>
                          <td className="">
                            <p>Direct Assessment</p>
                          </td>

                        </tr>

                      }
                      {assessmentData3 === "" || assessmentData3 === undefined ? "" :
                        <tr>
                          <td className="">
                            {assessmentData3.map((ind, i) => (
                              <p className="font-bold">{ind.year}</p>

                            ))}
                          </td>
                          {assessmentData3.map((ind, i) => (
                            <td className="">
                              <p className="font-bold"> {formatNumber(Number(ind.employed) + Number(ind.self_employed) + Number(ind.other_income))} </p>
                            </td>
                          ))}

                          <td className="">
                            {assessmentData3.map((ind, i) => (
                              <p className="font-bold">{formatNumber(Number(ind.tax) + Number(addAssessmentVal3))}</p>
                            ))}
                          </td>
                          <td className="">
                            <p>Direct Assessment</p>
                          </td>

                        </tr>

                      }

                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <p className="mb-2"><span className="font-bold">3.</span> His/her known source(s) of income are: <span>Employment, Trade/Professional</span> </p>
                {/* <p><span className="font-bold">4.</span> This certificate expires on: <span>{expiry}</span> </p> */}
                <p><span className="font-bold">4.</span> This certificate expires on: <span>{expiry}</span> </p>
              </div>

              <div className="flex justify-between mt-2">
                <div>
                  <QRCode
                    value={`https://irs.kg.gov.ng/verify/fetch_tcc.php?ref=${fileRef}`}
                    size={120}
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <div className="flex flex-col">
                    <Signature />
                    <hr />
                    <p className="font-bold text-center">Sule Salihu Enehe</p>
                    <p className="font-bold text-center">Ag. Executive Chairman</p>
                  </div>
                </div>
              </div>

            </div>

          </div>


        </div>

      </section>

    </>
  );
};
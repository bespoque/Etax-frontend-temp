import Widget from "../widget";
import { formatNumber } from "../../functions/numbers";
import * as Icons from '../Icons/index';
import Widget1 from "../dashboard/widget-1";
import dateformat from "dateformat";
import Link from 'next/link';
import { FiCheck, FiMail } from "react-icons/fi";
import { OpenMailIcon } from '../Icons';
import { FaEnvelope, FaRegEnvelopeOpen } from 'react-icons/fa'
import { shallowEqual, useSelector } from "react-redux";
import { useRef, useState } from "react";


const fields = [
  {
    name: "kgtin",
    key: "subject",
  },
  {
    name: "name",
    key: "message",
  },
  {
    name: "Created time",
    key: "createtime",
  },
];

export const ViewMessageTable = ({ remittance }) => {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);

  let items = remittance;
  items?.map((message) => {
    if (message['read'] === "Y") {
      message['icon'] = <FaRegEnvelopeOpen />;
    } else if (message['read'] === "N") {
      message['icon'] = <FaEnvelope />;
    }
    return message;
  });

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
    // router.push('/dashboard');
  };

  return (
    <>
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

                      <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                        <FaRegEnvelopeOpen
                          size={18}
                          className="stroke-current text-green-500"
                        />
                      </span>

                    </div>
                    <div className="w-full">
                      <div className=" mb-2 font-bold">

                        <span className="mb-2">message!</span>
                      </div>
                      <ul>
                        <li>
                          <span className="font-bold">*</span> Acknowledgment evidence will be sent via email within 48 working hrs
                        </li>
                      </ul>

                      <div className="overflow-auto max-h-64">

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
      <Widget>
        <table className="table divide-y">
          <thead>
            {/* <tr className="">
              {fields.map((field, i) => (
                <th key={i} className="">
                  {field.name}
                </th>
              ))}
            </tr> */}
          </thead>
          <tbody className="divide-y">
            {items?.length === 0 && (
              <tr className="">
                <td className="font-semibold text-base"></td>
                <td className="font-semibold text-base"></td>
                <td className="font-semibold text-base"></td>
                <td className="font-semibold text-base"></td>
                <td className="font-semibold text-base">No messages</td>
              </tr>
            )}
            {items.map((remittance, i) => (
              <tr key={i} className="">
                {fields.map((field, j) => (
                  <td key={j}>

                    {remittance[field.key]}

                  </td>
                ))}
                {/* <Link href={`/view/annual/${remittance.year}_${remittance.status}`}> */}
                <a onClick={() => show()} className="inline-flex disabled:opacity-50  py-2 px-3 rounded-md   hover:border-green-500">

                  <span>{remittance['icon']}</span>

                </a>
                {/* </Link> */}
                {/* <Link href={`/view/annual/docs/${remittance.year}_${remittance.status}`}>
                  <a className="flex items-center">
                  </a>
                </Link> */}
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

const singleFields = [
  {
    name: 'Staff Name',
    key: 'staff_names',
  },
  {
    name: 'Number of months',
    key: 'no_months',
  },
  {
    name: 'Basic Salary',
    key: 'basic_salary',
  },
  {
    name: 'CONSOLIDATED RELIEF ALLOWANCE',
    key: 'con_rel_cal',
  },
  {
    name: 'Pension',
    key: 'pension',
  },
  {
    name: 'NHIS',
    key: 'nhis',
  },

  {
    name: 'LAP',
    key: 'lap',
  },

  {
    name: 'Net Tax Deducted',
    key: 'net_tax_ded',
  },
  {
    name: 'Expected Tax',
    key: 'tax_pay_cal',
  },
  {
    name: 'Variance',
    key: 'variance_cal',
  },

  {
    name: 'Year',
    key: 'year',
  },
];

export const ViewAnnualTableSingle = ({ remittance, total }) => {
  const items = remittance;

  return (
    <>

      <Widget>
        <div className="overflow-x-auto">
          <table className="table divide-y">
            <thead className="">
              <tr className="font-semibold text-blue-400">
                {singleFields.map((field, i) => (
                  <th key={i} className="">
                    {field.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {items.map((remittance, i) => (
                <tr key={i} className="">
                  {singleFields.map((field, j) => (
                    <td key={j} className="">
                      {remittance[field.key]}
                    </td>
                  ))}
                </tr>
              ))}
              {items.length > 0 && (
                <tr className="font-semibold">
                  <td></td>
                  <td></td>
                  <td>{formatNumber(total.totalSalary)}</td>
                  <td>{formatNumber(total.totalConRel)}</td>
                  <td>{formatNumber(total.totalPension)}</td>
                  <td>{formatNumber(total.totalNHIS)}</td>
                  <td>{formatNumber(total.totalLAP)}</td>
                  <td>{formatNumber(total.totalNetTax)}</td>
                  <td>{formatNumber(total.totalExpTax)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Widget>
    </>
  );
};
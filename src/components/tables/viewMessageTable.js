import Widget from "../widget";
import { formatNumber } from "../../functions/numbers";
import * as Icons from '../Icons/index';
import Widget1 from "../dashboard/widget-1";
import dateformat from "dateformat";
import Link from 'next/link';
import { FiMail } from "react-icons/fi";
import { OpenMailIcon } from '../Icons';


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
  let items = remittance;
  items?.map((message) => {
    if (message['read'] === "Y") {
      // message['status'] = 'success';
      message['icon'] = <OpenMailIcon />;
    } else if (message['read'] === "N") {
      // message['status'] = 'pending';
      message['icon'] = <FiMail size={20} />;
    }
    return message;
  });
  return (
    <>
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
                <Link href={`/view/annual/${remittance.year}_${remittance.status}`}>
                  <a>
                    <div className="flex items-center mr-2">
                      <span>{remittance['icon']}</span>
                    </div>
                  </a>
                </Link>
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
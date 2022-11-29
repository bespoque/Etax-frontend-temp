import Widget from "../widget";
import { formatNumber } from "../../functions/numbers";
import * as Icons from '../../components/Icons/index';
import Widget1 from "../dashboard/widget-1";
import dateformat from "dateformat";
import Link from 'next/link';

const fields = [
  {
    name: "Year",
    key: "year",
  },
  {
    name: "Basic Salary",
    key: "basicSalary",
  },
  {
    name: "Net Tax deducted",
    key: "netTaxDeduct",
  },
  {
    name: "Total Tax",
    key: "tax_pay_cal",
  },

];

export const ViewAnnualTable = ({ remittance, totalemployees, totaltax, grosssum }) => {
  let items = remittance;
  console.log(remittance)
  remittance.map((remittance) => {
    remittance["amount"] = formatNumber(remittance["amount"]);
    if (remittance["status"] === 1) {
      remittance["status"] = "success";
    } else if (remittance["status"] === 0) {
      remittance["status"] = "failed";
    }
    return remittance;
  });

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
            {items.map((remittance, i) => (
              <tr key={i} className="">
                {fields.map((field, j) => (
                  <td key={j} className="">
                    {/* {remittance[field.key]} */}
                    <Link href={`/view/annual/${remittance.year}`}>
                      <a className="hover:text-blue-500">
                        {remittance[field.key]}
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
        {/* <div className="flex justify-end">
          <p className="px-6 font-semibold">Total</p>

          <div className="flex flex-col">
            <p className="px-6 pb-1">employees</p>
            <p className="self-center font-semibold">{totalemployees}</p>
          </div>

          <div className="flex flex-col">
            <p className="px-6 pb-1">Gross Salary</p>
            <p className="self-center font-semibold">{formatNumber(grosssum)}</p>
          </div>

          <div className="flex flex-col">
            <p className="px-6 pb-1">Expected</p>
            <p className="self-center font-semibold">{formatNumber(totaltax)}</p>
          </div>

          <p className="px-6">Variance</p>
        </div> */}
        {/* <div>{total}</div> */}
      </Widget>
    </>
  );
};

const singleFields = [
  // { name: 'Status', key: 'status' },

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
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Widget>
    </>
  );
};
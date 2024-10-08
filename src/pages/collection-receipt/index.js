import React, { useEffect, useRef, useState } from 'react'
import { CoatOfArms, KgirsLogo2, KogiGov, SignatureCol } from '../../components/Images/Images'
import axios from 'axios';
import url from '../../config/url';
import { useRouter } from 'next/router';
import QRCode from 'react-qr-code';
import Loader from 'react-loader-spinner';
import { formatNumber } from '../../functions/numbers';
import ReactToPrint from 'react-to-print';

export default function Index() {
  const [colData, setColData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const router = useRouter();
  const componentRef = useRef();

  useEffect(() => {
    if (router && router.query) {
      let paymentID = router.query.id;
      // setAuthToken();
      const fetchPost = () => {
        setIsFetching(true)
        axios.get(`${url.BASE_URL}web/noauth/invoice/${paymentID}`,
          {
            headers: {
              'clientId': "10Q6Dc3MlISEM7MPXHY0"
            },
          })
          .then(function (response) {
            let res = response.data.body;
            setColData(res)
            setIsFetching(false)
          })
          .catch(function (error) {
            setIsFetching(false)
            console.log(error);
          })

      };
      fetchPost();
    }
  }, [router]);

  return (
    <>
      {isFetching ? (
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
      ) :

        <div class="my-4">
          <div className="flex justify-center">
            <div>
              <div className="flex justify-between my-3">
                <button className="btn  bg-green-600 btn-default text-white
                btn-outlined bg-transparent rounded-md"
                  type="submit"
                  onClick={() => router.back()}
                >
                  Back
                </button>
                <div >
                  <ReactToPrint
                    pageStyle='@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; padding: 40px !important; } }'
                    // pageStyle="@page { size: 7.5in 13in  }"
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
              <div className="border p-6" ref={componentRef}>
                <p>KOGI STATE GOVERNMENT</p>
                <section className="flex justify-between">
                  <p className="font-bold">REVENUE RECEIPT</p>
                  <p className="font-bold">{`Ref - ${colData.referenceNo}`}</p>
                </section>
                <section className="flex justify-end mt-8">
                  <CoatOfArms />
                  <KogiGov />
                  <KgirsLogo2 />
                </section>
                <div className="flex justify-between">
                  <div>
                    <div className="grid grid-cols-6 gap-2">
                      <p>PAID BY:</p>
                      <p className="font-bold col-span-2">{colData.taxpayerName}</p>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                      <p>PAYER ID:</p>
                      <p className="font-bold col-span-2">
                        {colData.taxpayerId}
                      </p>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                      <p>ADDRESS:</p>
                      <p className="font-bold col-span-2">{colData.taxpayerAddress}</p>
                    </div>
                    <div className="flex mt-10">
                      <div className='w-16 border-b-2'>
                      </div>
                      <p className='align-self-center'>Details</p>
                      <div className="border-b-2 w-3/4 ">
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 mr-6">
                    <QRCode
                      value={`https://irs.kg.gov.ng/verify/verify_receipt.php?ref=${colData.referenceNo}`}
                      size={120}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="grid grid-cols-6 gap-2">
                    <p>PAYMENT DATE:</p>
                    <p className="font-bold col-span-2">{colData.transactionDate}</p>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    <p>AMOUNT:</p>
                    <div className="col-span-4">
                      <p className="font-bold">NGN {formatNumber(colData.amount)}</p>

                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    <p>BEING:</p>
                    <div className="col-span-3">
                      <p className="font-bold"> {`Payment for ${colData.revenueCode}`} </p>
                      <small>
                        {colData.revenueItem}
                      </small>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    <p>DETAILS:</p>
                    <div className="col-span-3">
                      <p className="font-bold"> {colData.description} </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    <p>PAID AT:</p>
                    <p className="font-bold"> {colData?.bank || colData?.paymentMethod} </p>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    <p>AGENCY:</p>
                    <div className="col-span-3">
                      <p className="font-bold">INTERNAL REVENUE SERVICE </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    <p>TAX STATION:</p>
                    <p className="font-bold"> {colData.taxOffice} </p>
                  </div>
                  <div className="border-b-2 mt-3 w-4/4 ">
                  </div>
                </div>

                <div className="flex justify-between">
                  <div></div>
                  <div className="mt-2">
                    <SignatureCol />
                    <hr />
                    Authorized Signatory
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

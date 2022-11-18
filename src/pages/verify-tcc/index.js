import React, { useEffect, useState } from 'react'
import { CoatOfArms, KgirsLogo, KgirsLogo2, KogiGov, Signature } from '../../components/Images/Images'
import axios from 'axios';
import url from '../../config/url';
import { useRouter } from 'next/router';
import setAuthToken from '../../functions/setAuthToken';
import QRCode from 'react-qr-code';
import Widget from '../../components/widget';
import Loader from 'react-loader-spinner';
import { formatNumber } from '../../functions/numbers';

export default function index() {
  const [colData, setColData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const router = useRouter();
  const params = new URLSearchParams(window.location.search)


  useEffect(() => {
    if (router && router.query) {
      let paymentID = router.query.id;
      console.log("paymentID", paymentID);

      setAuthToken();
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
            console.log("res", res);
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
        <div class=" mt-4">
          <div className="flex justify-between my-3">
            <button className="btn  bg-green-600 btn-default text-white
            btn-outlined bg-transparent rounded-md"
              type="submit"
              onClick={() => router.back()}
            >
              Back
            </button>
            <button className="btn  bg-green-600 btn-default text-white
            btn-outlined bg-transparent rounded-md"
              type="submit"
            >
              Download
            </button>
          </div>
          <div class="border p-6">
            <p>KOGI STATE GOVERNMENT</p>
            <section class="flex justify-between">
              <p class="font-bold">REVENUE RECEIPT</p>
              <p class="font-bold">{`Ref - ${colData.referenceNo}`}</p>
            </section>
            <section class="flex justify-end mt-8">
              <CoatOfArms />
              <KogiGov />
              <KgirsLogo2 />
            </section>
            <div class="flex justify-between">
              <div>
                <div class="grid grid-cols-6 gap-2">
                  <p>PAID BY:</p>
                  <p class="font-bold col-span-2">{colData.taxpayerName}</p>
                </div>
                <div class="grid grid-cols-6 gap-2">
                  <p>PAYER ID:</p>
                  <p class="font-bold col-span-2">
                    {colData.taxpayerId}
                  </p>
                </div>
                <div class="grid grid-cols-6 gap-2">
                  <p>ADDRESS:</p>
                  <p class="font-bold col-span-2">{colData.taxpayerAddress}</p>
                </div>
                <div class="flex mt-10">
                  <div class='w-16 border-b-2'>
                  </div>
                  <p class='align-self-center'>Details</p>
                  <div class="border-b-2 w-3/4 ">
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
            <div class="mt-3">
              <div class="grid grid-cols-6 gap-2">
                <p>PAYMENT DATE:</p>
                <p class="font-bold col-span-2">{colData.transactionDate}</p>
              </div>
              <div class="grid grid-cols-6 gap-2">
                <p>AMOUNT:</p>
                <div class="col-span-4">
                  <p class="font-bold">NGN {formatNumber(colData.amount)}</p>

                </div>
              </div>
              <div class="grid grid-cols-6 gap-2">
                <p>BEING:</p>
                <div class="col-span-3">
                  <p class="font-bold"> {`Payment for ${colData.revenueCode}`} </p>
                  <small>
                    {colData.revenueItem}
                  </small>
                </div>
              </div>
              <div class="grid grid-cols-6 gap-2">
                <p>PAID AT:</p>
                <p class="font-bold"> {colData.bank} </p>
              </div>
              <div class="grid grid-cols-6 gap-2">
                <p>AGENCY:</p>
                <div class="col-span-3">
                  <p class="font-bold"> INTERNAL REVENUE SERVICE </p>
                </div>
              </div>
              <div class="grid grid-cols-6 gap-2">
                <p>TAX STATION:</p>
                <p class="font-bold"> {colData.taxOffice} </p>
              </div>
              <div class="border-b-2 mt-3 w-4/4 ">
              </div>
            </div>

            <div class="flex justify-between">
              <div></div>
              <div class="mt-2">
                <Signature />
                <hr />
                Authorized Signatory
              </div>
            </div>
          </div>
        </div>
      }

    </>
  )
}

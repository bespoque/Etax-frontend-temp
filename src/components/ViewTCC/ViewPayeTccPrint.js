import SectionTitle from "../section-title";
import Widget from "../widget";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import Loader from "react-loader-spinner";
import { PrintSinglePayeTcc } from "../tables/viewtccPayeTable";


const PrintSingleTccPaye = () => {
  const [PayeTccData, setPayeTccData] = useState(() => []);
  const [isFetching, setIsFetching] = useState(() => true); 
  const [tccID, setTccID] = useState(() => []);
  const router = useRouter();
  useEffect(() => {
    if (router && router.query) {
      let tCCId = router.query.ref;
      setTccID(tCCId)
      let id = {
        id: `${tCCId}`
      }
      setAuthToken();
      const fetchPost = async () => {
        try {
          let res = await axios.post(`${url.BASE_URL}user/paye/view-tp-tcc`, id);
          let fetctTcc = res.data.body.tcc;
          setPayeTccData(fetctTcc)
          setIsFetching(false);
        } catch (e) {
          setIsFetching(false);
        }
      };
      fetchPost();
    }
  }, [router]);



  return (
    <>
      <SectionTitle subtitle="Print PAYE TCC" />

      <Widget>

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
            <PrintSinglePayeTcc
              PayeTccData={PayeTccData}
              tccID={tccID}
               />
          }
        </>
      </Widget>
    </>
  );
};

export default PrintSingleTccPaye;

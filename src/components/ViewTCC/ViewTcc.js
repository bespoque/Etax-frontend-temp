import SectionTitle from "../section-title";
import Widget from "../widget";
import { SubmitButton } from "../CustomButton/CustomButton";
import { NewFormInput } from "../FormInput/formInputs";
import { ViewAnnualTable } from "../tables/viewAnnual";
import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import { useEffect, useState } from "react";
import axios from "axios";
import { CustomPagination } from "../pagination/customPagination";
import { formatNumber } from "../../functions/numbers";
import dateformat from "dateformat";
import Loader from "react-loader-spinner";
import Widget1 from "../dashboard/widget-1";
import * as Icons from '../Icons/index';
import jwt from "jsonwebtoken";
import { ViewTccTable } from "../tables/viewtccTable";
import { shallowEqual, useSelector } from "react-redux";

const ViewTcc = () => {
  const [post, setPost] = useState(() => []);
  const [sum, setSum] = useState(() => null);
  const [totalemp, setTotalemp] = useState('');
  const [isFetching, setIsFetching] = useState(() => true);
  const [currentPage, setCurrentPage] = useState(() => 1);
  const [postPerPage, setPostPerPage] = useState(() => 10);
  const [year, setYear] = useState('');
  const [query, setQuery] = useState(() => "");
  const [tcc, setTcc] = useState(() => []);

  const { auth } = useSelector(
    (state) => ({
      auth: state.authentication.auth,
    }),
    shallowEqual
  );

  
  const decoded = jwt.decode(auth);
  const kgtin = decoded.kgtin
  useEffect(() => {
    setAuthToken();
    const fetchPost = async () => {
      try {
        let res = await axios.get(`https://rhmlive.bespoque.dev/api/v1/forma/list-tp-tcc?kgtin=${kgtin}`);
        res = res.data.body.tccPrint;
        setTcc(res)
        let employeessTotal = res.length
        setTotalemp(employeessTotal)
        let records = [];
        let sum = [];
        for (let i = 0; i < res.length; i++) {
          let rec = res[i];
          // console.log(rec.tax_pay_cal);
          sum.push(rec.tax_pay_cal);
          rec.amount1 = formatNumber(rec.amount1);
          rec.amount2 = formatNumber(rec.amount2);
          rec.con_rel_cal = formatNumber(rec.con_rel_cal);
          rec.amount3 = formatNumber(rec.amount3);
          rec.crt_time = dateformat(rec.crt_time, "yyyy");
          records.push(rec);
        }
        let sumOfTax = sum.reduce((preVal, curVal) => preVal + curVal);
        setIsFetching(false);
        setSum(() => sumOfTax);
        setPost(() => records);
      } catch (e) {
        setIsFetching(false);
        // console.log(e.response);
      }
    };
    fetchPost();
  }, []);

  // Get current post
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = post.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const next = (currentPage) => setCurrentPage(() => currentPage + 1);
  const previous = (currentPage) => setCurrentPage(() => currentPage - 1);



  return (
    <>
      <SectionTitle title="View Tcc"  />

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
      <Widget>
       

        <div className="mt-4">
          {query !== "" ? (
            <>
              <ViewTccTable />
              <CustomPagination
                paginate={paginate}
                totalPosts={res[0].length}
                postPerPage={postPerPage}
                currentPage={currentPage}
                next={next}
                previous={previous}
              />
            </>
          ) : (
            <>
              <ViewTccTable tccData={tcc} />
              <CustomPagination
                paginate={paginate}
                totalPosts={post.length}
                postPerPage={postPerPage}
                currentPage={currentPage}
                next={next}
                previous={previous}
              />
            </>
          )}
        </div>
      </Widget>
    </>
  );
};

export default ViewTcc;

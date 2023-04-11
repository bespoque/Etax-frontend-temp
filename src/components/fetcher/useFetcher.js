import setAuthToken from '../../functions/setAuthToken';
import useSWR from 'swr';
import axios from 'axios';

const UseFetcher = (url) => {
  const { data, error } = useSWR(url, async (url) => {
    setAuthToken();
    const res = await axios(url);
    // console.log("res.data.body", res.data.body);
    return res.data.body;
  });
  
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
export default UseFetcher;

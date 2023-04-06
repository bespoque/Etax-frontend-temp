import setAuthToken from '../../functions/setAuthToken';
import useSWR from 'swr';
import axios from 'axios';

const UseFetcherNoAuth = (url) => {
  const { data, error } = useSWR(url, async (url) => {
    const res = await axios(url);
    console.log("res.data.body;", res.data.body);
    return res.data.body;
  });
  return {
    dataUser: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default UseFetcherNoAuth;

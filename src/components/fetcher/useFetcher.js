import setAuthToken from '../../functions/setAuthToken';
import useSWR from 'swr';
import axios from 'axios';

const UseFetcher = (url) => {
  const { data, error } = useSWR(url, async (url) => {
    setAuthToken();
    const res = await axios(url);
    return res.data.body;
  });
  
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
export default UseFetcher;

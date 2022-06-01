import { Table } from '@AEMuto/antoinemarseaud_14_hrnet_react_library_23032022';
import { categories } from '../mocks/categories';
import { useAppDispatch, useAppSelector } from '../hooks';
import Loader from '../components/Loader';
import { useEffect } from 'react';
import { getEmployees } from '../store/appThunks';
import Error from "../components/Error";

const Home = () => {
  const dispatch = useAppDispatch();
  const { employees, dbLoaded, isLoading, dbUpdated, dbError } =
    useAppSelector((state) => state.app);

  useEffect(() => {
    if (dbUpdated) dispatch(getEmployees({key:'employees'}))
  },[dbUpdated])

  if (dbError.status) {
    return (
      <>
        <h1>Current Employees</h1>
        <Error message={dbError.message}/>
      </>
    );
  }

  if (isLoading) {
    return <Loader size="sm" />;
  }

  if (dbLoaded) {
    return (
      <Table
        data={employees}
        options={{ categories, heading: 'Current Employees' }}
      />
    );
  }
  // If no case is reached return an empty element
  return <></>
};

export default Home;



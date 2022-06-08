import { Table } from 'antoinemarseaud_14_hrnet_react_library';
import { categories } from '../mocks/categories';
import { useAppDispatch, useAppSelector } from '../hooks';
import Loader from '../components/Loader';
import { useEffect } from 'react';
import { getEmployees } from '../store/appThunks';
import Error from "../components/Error";

/**
 * The home view displays the current employees present in
 * the indexed DB. If there is none (see <Error/> component),
 * a message invite the user to either create an employee or
 * to load mock data. This is where we make use of our external
 * component library by importing the <Table /> component.
 * See https://github.com/AEMuto/AntoineMarseaud_14_HRnet_React_Library_23032022
 * @constructor
 */
const Home = () => {
  const dispatch = useAppDispatch();
  const { employees, dbLoaded, isLoading, employeesNeedUpdate, dbError } =
    useAppSelector((state) => state.app);

  useEffect(() => {
    // In the case the indexed DB has been updated, load it from the redux store
    if (employeesNeedUpdate) dispatch(getEmployees({key:'employees'}))
  },[employeesNeedUpdate])

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



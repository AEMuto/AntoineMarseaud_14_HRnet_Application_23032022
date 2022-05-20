import { Table } from '@AEMuto/antoinemarseaud_14_hrnet_react_library_23032022';
import { categories } from '../mocks/categories';
import { useAppSelector } from '../hooks';

const Home = () => {
  const { employees } = useAppSelector((state) => state.app);
  return (
    <Table
      data={employees}
      options={{ categories, heading: 'Current Employees' }}
    />
  );
};

export default Home;

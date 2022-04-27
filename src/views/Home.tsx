import {Table} from "@AEMuto/antoinemarseaud_14_hrnet_react_library_23032022";
import {categories} from "../mocks/categories";
import {employees} from "../mocks/employees_50";

function Home() {

  return <Table data={employees} options={{categories, heading:'Current Employees'}}/>

}

export default Home

import {Table} from "@AEMuto/antoinemarseaud_14_hrnet_react_library_23032022";
import {categories} from "./mocks/categories";
import {employees} from "./mocks/employees_500";

function App() {

  return <Table data={employees} options={{categories}}/>

}

export default App

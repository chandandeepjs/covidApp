import React, { useEffect, useState } from "react";
import { API} from "aws-amplify";
// import { listPatients } from "../graphql/queries";

const Table = props => {
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    try {
      //const patientsData = await API.graphql(graphqlOperation(listPatients));
      const apiData = await API.get("covidapi","/items")
      console.log("[apiData]",apiData)
      const arry = apiData.success;
      setUsersList(arry);
    } catch (err) {
      console.log("error fetching data..", err);
    }
  }
  return (
    <table>
      <tbody>
        <tr>
          <th>Country</th>
          <th>Deaths</th>
          <th>Active Cases </th>
          <th>In-Active Cases </th>
        </tr>
        {usersList.map(user =>
          <tr key={user.id}>
            <td>
              {user.country}
            </td>
            <td>
              {user.Death}
            </td>
            <td>
              {user.active}
            </td>
            <td>
              {user.inactive}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
export default Table;

import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";

// import query
import { listPatients } from "../graphql/queries";
const Table = props => {
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    try {
      const patientsData = await API.graphql(graphqlOperation(listPatients));
      const arry = patientsData.data.listPatients.items;

      let InDeath = [];
      let InInactive = [];
      let Active = [];
      let UsDeath = [];
      let UsInactive = [];
      let UsActive = [];
      let UkDeath = [];
      let UkActive = [];
      let UkInactive = [];

      arry.forEach(element => {
        if (element.country === "India" && element.status === "death") {
          InDeath.push(element);
        }
        if (element.country === "India" && element.status === "inActive") {
          InInactive.push(element);
        }
        if (element.country === "India" && element.status === "active") {
          Active.push(element);
        }
        if (element.country === "US" && element.status === "death") {
          UsDeath.push(element);
        }
        if (element.country === "US" && element.status === "active") {
          UsActive.push(element);
        }
        if (element.country === "US" && element.status === "inActive") {
          UsInactive.push(element);
        }
        if (element.country === "UK" && element.status === "death") {
          UkDeath.push(element);
        }
        if (element.country === "UK" && element.status === "active") {
          UkActive.push(element);
        }
        if (element.country === "UK" && element.status === "inActive") {
          UkInactive.push(element);
        }
      });
      setUsersList([
        {
          id: 1,
          country: "India",
          Death: InDeath.length,
          active: Active.length,
          inactive: InInactive.length,
        },
        {
          id: 2,
          country: "united state",
          Death: UsDeath.length,
          active: UsActive.length,
          inactive: UsInactive.length,
        },
        {
          id: 3,
          country: "united kingdom",
          Death: UkDeath.length,
          active: UkActive.length,
          inactive: UkInactive.length,
        },
      ]);
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

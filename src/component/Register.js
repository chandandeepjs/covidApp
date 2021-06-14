import React, { useState } from "react";
import classes from "./Register.module.css";
import moment from "moment";
import { API, graphqlOperation } from "aws-amplify";
import { createPatient as CreatePatient } from "../graphql/mutations";

const Register = () => {
  const [patientName, setPatientName] = useState("");
  const [patientStatus, setPatientStatus] = useState("");
  const [dob, setDob] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");

  const PatientNameHandler = event => {
    setPatientName(event.target.value);
  };
  const PatientStatusHandler = event => {
    setPatientStatus(event.target.value);
  };
  const DoBHandler = event => {
    setDob(event.target.value);
  };
  const CountryHandler = event => {
    setCountry(event.target.value);
  };
  const AddressHandler = event => {
    setAddress(event.target.value);
  };
  const PhoneNumberHandler = event => {
    setPhoneNumber(event.target.value);
  };
  const EmergencyContactHandler = event => {
    setEmergencyContact(event.target.value);
  };

  const addPatientHandler = async event => {
    event.preventDefault();

    if (
      patientName.trim().length === 0 ||
      dob.trim().length === 0 ||
      patientName.trim().length === 0 ||
      country.trim().length === 0 ||
      address.trim().length === 0 ||
      phoneNumber.trim().length === 0 ||
      emergencyContact.trim().length === 0
    ) {
      return console.log("Some of field value missing");
    }

    const patient = {
      name: patientName,
      dob: moment().unix(dob),
      status: patientStatus,
      country: country,
      address: address,
      phoneNumber: phoneNumber.toString(),
      emergencyContact: emergencyContact.toString(),
    };
    console.log("[addPatientHandler]", patient);
    try {
      await API.graphql(graphqlOperation(CreatePatient, { input: patient }));
      console.log("item created!");
    } catch (err) {
      console.log("error creating patient...", err);
    }

    setPatientName("");
    setPatientStatus("");
    setDob("");
    setCountry("");
    setAddress("");
    setPhoneNumber("");
    setEmergencyContact("");
  };
  return (
    <div className={classes.input}>
      <form onSubmit={addPatientHandler}>
        <label htmlFor="Name"> Patient Name </label>
        <input
          id="Name"
          type="text"
          value={patientName}
          required
          onChange={PatientNameHandler}
        />
        <label htmlFor=" Patient Status"> Patient Status </label>
        <input
          id="Patient Status"
          type="text"
          list="Status"
          value={patientStatus}
          required
          onChange={PatientStatusHandler}
        />
        <datalist id="Status">
          <option>inActive</option>
          <option>active</option>
          <option>death</option>
        </datalist>
        <label htmlFor="DoB">DoB</label>
        <input id="DoB" type="date" value={dob} onChange={DoBHandler} />
        <label htmlFor="Country">Country</label>
        <input
          id="Country"
          type="text"
          list="country"
          value={country}
          required
          onChange={CountryHandler}
        />
        <datalist id="country">
          <option>India</option>
          <option>US</option>
          <option>UK</option>
        </datalist>
        <label htmlFor="Address">Address</label>
        <input
          id="Address"
          type="text"
          value={address}
          required
          onChange={AddressHandler}
        />
        <label htmlFor="Phone Number">Phone Number</label>
        <input
          id="Phone Number"
          type="tel"
          value={phoneNumber}
          required
          onChange={PhoneNumberHandler}
        />
        <label htmlFor="Emergency Contact">Emergency Contact</label>
        <input
          id="Emergency Contact"
          type="tel"
          value={emergencyContact}
          required
          onChange={EmergencyContactHandler}
        />
        <button type="submit"> Submit </button>
      </form>
    </div>
  );
};
export default Register;

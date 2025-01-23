'use client'

import React from "react";
import styles from "./page.module.css";
import { contactList } from "@/types/contactList";
import { contact } from "@/types/contact";

export default function Home() {

  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [statusMessage, setStatusMessage] = React.useState<string>('');
  const [allContacts, setAllContacts] = React.useState<contactList>({});
  React.useEffect(() => {
    setFirstName('');
    setLastName('');
    setEmail('');
  }, [allContacts]);

  function handleFirstNameChanged(e: React.ChangeEvent<HTMLInputElement>) {
    setFirstName(e.target.value);
  }

  function handleLastNameChanged(e: React.ChangeEvent<HTMLInputElement>) {
    setLastName(e.target.value);
  }

  function handleEmailChanged(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  async function signUpContact() {
    const response = await fetch('/api/createUpdateContact', 
      {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
        }),
      }
    );

    if (response.ok) {
      setStatusMessage('Thanks for signing up!');
    }
    else {
      setStatusMessage('Sorry, we cannot process your signup at this time.  Please try again later.');
    }

    getAllContacts();
  }

  async function getAllContacts() {
    const response = await fetch('/api/getAllContacts');
    const contacts = await response.json();
    setAllContacts(contacts);
  }

  function sortContactsByCreationDate() {
    const contactArray = [];
    const keys = Object.keys(allContacts);
    for (const email of keys) {
      const contact = allContacts[email];
      contactArray.push({
        firstName: contact.firstName,
        lastName: contact.lastName,
        email,
        createdTimestamp: contact.createdTimestamp,
        updatedTimestamp: contact.updatedTimestamp,
      });
    }
    function sortByCreatedDate(a: contact, b: contact) {
      // sort descending to show newest contact first
      return b.createdTimestamp - a.createdTimestamp;
    }
    return contactArray.sort(sortByCreatedDate);
  }

  function convertContactsToCsv() {
    const sortedContacts = sortContactsByCreationDate();
    let csvData = `firstName,lastName,email,createdTimestamp\n`;
    for (const contact of sortedContacts) {
      csvData += `${contact.firstName},${contact.lastName},` +
             `${contact.email},${contact.createdTimestamp}\n`;
    };
    return csvData;
  }

  function downloadContacts() {
    const csvContent = convertContactsToCsv();
    const blob = new Blob([csvContent], { type: 'application/json' });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Newsletter Signup</h1>
        <div>
        <label htmlFor="firstName">First Name: </label>
        <input id="firstName" value={firstName} onChange={handleFirstNameChanged}></input>
        </div>
        <div>
        <label htmlFor="lastName">Last Name: </label>
        <input id="lastName" value={lastName} onChange={handleLastNameChanged}></input>
        </div>
        <div>
        <label htmlFor="email">Email: </label>
        <input id="email" value={email} onChange={handleEmailChanged}></input>
        </div>
        <div>
          <button onClick={signUpContact}
            disabled={!firstName || !lastName || !email}>Sign Up</button>
        </div>
        <div>{statusMessage}</div>
        <div>
          <button onClick={downloadContacts} disabled={!Object.keys(allContacts).length}>
            Download All Contacts</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Created Date</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(allContacts).map((email: string) => (
              <tr key={email}>
                <td>{allContacts[email].firstName}</td>
                <td>{allContacts[email].lastName}</td>
                <td>{email}</td>
                <td>{allContacts[email].createdTimestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

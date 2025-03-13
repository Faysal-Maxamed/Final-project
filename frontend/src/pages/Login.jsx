import React from 'react';

const ContactHistory = () => {
  // Sample contact history data
  const contactHistory = [
    { id: 1, name: 'John Doe', date: '2023-10-01', type: 'Phone Call' },
    { id: 2, name: 'Jane Smith', date: '2023-10-05', type: 'Email' },
    { id: 3, name: 'Alice Johnson', date: '2023-10-10', type: 'Meeting' },
  ];

  return (
    <div>
      <h1>Contact History</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {contactHistory.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.date}</td>
              <td>{contact.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactHistory;
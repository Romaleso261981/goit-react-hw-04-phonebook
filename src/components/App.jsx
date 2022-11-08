import { FilterInput, NotificationSpan } from './AppStyle.js';
import { useState, useEffect, useRef } from 'react';
import Notification from './Notification/Notification';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';

export const App = () => {
  const [contacts, setContacts] = useState(()=>{JSON.parse(localStorage.getItem('contacts'))});
  const [filter, setFilter] = useState('');
  const firtRenderForm = useRef(true);

  // const componentDidMount = () => {
  //   try {
  //     const contactLocal = JSON.parse(localStorage.getItem('contacts'));
  //     this.setState({ contacts: contactLocal });
  //   } catch (error) {
  //     this.setState({ contacts: []});
  //     console.error('Get state error: ', error.message);
  //   }
  // }

  // componentDidUpdate = () => {
  //   const { contacts } = this.state;
  //   localStorage.setItem('contacts', JSON.stringify(contacts));
  // }

  const handleChange = e => {
    this.setState({ name: e.target.value });
  };
  
  const addContact = contact => {
    const { contacts } = this.state;
    if (
      contacts.filter(({ number }) => number === contact.number).length !== 0
    ) {
      alert(contact.number + ' this number is already in your phone book');
      return;
    }
    this.setState(prevState => {
      const newContact = { id: nanoid(), ...contact };
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
  };

  const deleteContact = id => {
    this.setState(({ contacts }) => {
      const updatedContacts = contacts.filter(contact => contact.id !== id);
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
      return { ...this.state, contacts: updatedContacts };
    });
  };

  const handleFilter = e => {
    this.setState({ filter: e.target.value });
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  
  const filteredContacts = getFilteredContacts();
  return (
    <>
      <ContactForm addContact={addContact} value={20} />
      <FilterInput type="text" onChange={handleFilter} />
      {filteredContacts.length > 0 ? (
        <ContactList
          contactsData={filteredContacts}
          deleteContact={deleteContact}
        />
      ) : (
        <NotificationSpan>
          <Notification message="No contacts yet" />
        </NotificationSpan>
      )}
    </>
  );
}


export default App;
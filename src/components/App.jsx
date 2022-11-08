import { FilterInput, NotificationSpan } from './AppStyle.js';
import { useState, useEffect } from 'react';
import Notification from './Notification/Notification';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';

export const App = () => {

  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // useEffect(
  //   prevContacts => {
  //     if (prevContacts === contacts) {
  //       try {
  //         const contactLocal = JSON.parse(localStorage.getItem('contacts'));
  //         setContacts(contactLocal);
  //       } catch (error) {
  //         setContacts([]);
  //         console.error('Get state error: ', error.message);
  //       }
  //     }

  //     if (firtRenderForm.current) {
  //       firtRenderForm.current = false;
  //       return;
  //     }
  //     localStorage.setItem('contacts', JSON.stringify(contacts));
  //   },
  //   [contacts]
  // );

  const addContact = contact => {
    if (
      contacts.filter(({ number }) => number === contact.number).length !== 0
    ) {
      alert(contact.number + ' this number is already in your phone book');
      return;
    } else {
      const newContact = { id: nanoid(), ...contact };
      setContacts([...contacts, newContact]);
      console.log(contacts);
    }
  };

  const deleteContact = id => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    setContacts(updatedContacts);
  };

  const handleFilter = e => {
    setFilter(e.target.value);
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
};

export default App;

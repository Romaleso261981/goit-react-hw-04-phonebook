import { FilterInput, NotificationSpan } from './AppStyle.js';
import { useEffect, useState, useRef } from 'react';
import Notification from './Notification/Notification';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const firstRenderForm  = useRef(true);

  useEffect(() => {
    const storageContacts = localStorage.getItem('contacts');
    if (storageContacts === null) {
      setContacts([]);
    } else if (storageContacts.length > 0 && storageContacts === undefined) {
      setContacts(JSON.parse(storageContacts));
    }
  }, []);
  
  useEffect(() => {   
    if (firstRenderForm.current) {
      firstRenderForm.current = false;
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);



  // const handleChange = e => {
  //   setFilter(filter = e.target.value)
  //   console.log(filter);
  // };
  
  function  addContact(contact){
    if (
      contacts.filter(({ number }) => number === contact.number).length !== 0
    ) {
      alert(contact.number + ' this number is already in your phone book');
      return;
    } else {
  
      const newContact = { id: nanoid(), ...contact }
      setContacts([...contacts, newContact]);
    }
  };

  function deleteContact(id, contacts) {
    console.log(id);
    console.log(contacts);
    const updatedContacts = contacts.Filter(contact => contact.id !== id);
    console.log(updatedContacts);
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
      setContacts(updatedContacts);
  };

  const handleFilter = (e) => {
    console.log("handleFilter");
    console.log(filter);
    setFilter(filter = e.target.value)

  };

  useEffect((contacts, filter) => {
    console.log(filter);
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    )
    }, [filter, contacts])

  
  const filteredContacts = contacts ?? 0;
    return (
      <>
        <ContactForm addContact={addContact} />
        <FilterInput type="text" onChange={handleFilter}/>
        {filteredContacts.length > 0 ? (
          <ContactList
            contactsData={contacts}
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








// export default class App extends Component {
//   state = { contacts: [], filter: '' };

//   componentDidMount() {
//     try {
//       const contactLocal = JSON.parse(localStorage.getItem('contacts'));
//       this.setState({ contacts: contactLocal });
//     } catch (error) {
//       this.setState({ contacts: []});
//       console.error('Get state error: ', error.message);
//     }
//   }

//   componentDidUpdate() {
//     const { contacts } = this.state;
//     localStorage.setItem('contacts', JSON.stringify(contacts));
//   }

//   handleChange = e => {
//     this.setState({ name: e.target.value });
//   };
  
//   addContact = contact => {
//     const { contacts } = this.state;
//     if (
//       contacts.filter(({ number }) => number === contact.number).length !== 0
//     ) {
//       alert(contact.number + ' this number is already in your phone book');
//       return;
//     }
//     this.setState(prevState => {
//       const newContact = { id: nanoid(), ...contact };
//       return {
//         contacts: [...prevState.contacts, newContact],
//       };
//     });
//   };

//   deleteContact = id => {
//     this.setState(({ contacts }) => {
//       const updatedContacts = contacts.filter(contact => contact.id !== id);
//       localStorage.setItem('contacts', JSON.stringify(updatedContacts));
//       return { ...this.state, contacts: updatedContacts };
//     });
//   };

//   handleFilter = e => {
//     this.setState({ filter: e.target.value });
//   };

//   getFilteredContacts = () => {
//     const { contacts, filter } = this.state;

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filter.toLowerCase())
//     );
//   };

//   render() {
//     const filteredContacts = this.getFilteredContacts();
//     return (
//       <>
//         <ContactForm addContact={this.addContact} value={20} />
//         <FilterInput type="text" onChange={this.handleFilter} />
//         {filteredContacts.length > 0 ? (
//           <ContactList
//             contactsData={filteredContacts}
//             deleteContact={this.deleteContact}
//           />
//         ) : (
//           <NotificationSpan>
//             <Notification message="No contacts yet" />
//           </NotificationSpan>
//         )}
//       </>
//     );
//   }
// }


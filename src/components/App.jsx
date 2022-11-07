import { FilterInput, NotificationSpan } from './AppStyle.js';
import { useEffect, useState, useRef } from 'react';
import Notification from './Notification/Notification';
// import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';

export default function App() {
  const [contacts, setContacts] = useState(()=>{JSON.parse(localStorage.getItem('contacts'))});
  const [filter, setFilter] = useState('');
  const firtRenderForm  = useRef(true);

  useEffect(() => {
    const storageContacts = localStorage.getItem('contacts');
    if (storageContacts) {
        setContacts(JSON.parse(storageContacts));
    }
  }, []);
  
  useEffect(() => {
    if (firtRenderForm.current) {
      firtRenderForm.current = false;
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);



  // const handleChange = e => {
  //   this.setState({ name: e.target.value });
  // };
  
  // const addContact = contact => {
  //   const { contacts } = this.state;
  //   if (
  //     contacts.filter(({ number }) => number === contact.number).length !== 0
  //   ) {
  //     alert(contact.number + ' this number is already in your phone book');
  //     return;
  //   }
  //   this.setState(prevState => {
  //     const newContact = { id: nanoid(), ...contact };
  //     return {
  //       contacts: [...prevState.contacts, newContact],
  //     };
  //   });
  // };

  const deleteContact = (id, contacts) => {
    console.log(contacts);
    console.log(id);
      const updatedContacts = contacts.Filter(contact => contact.id !== id);
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
      setContacts(updatedContacts);
  };

  // const handleFilter = (e, filter) => {
  //   setFilter({ filter: e.target.value });
  // };

  // const getFilteredContacts = (contacts, filter) => {
  //   return contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(filter.toLowerCase())
  //   );
  // };

  
  const filteredContacts = contacts ?? 0;
  console.log(contacts);
    return (
      <>
        <ContactForm  />
        <FilterInput type="text" />
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


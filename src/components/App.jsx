import React, { Component } from "react";
import Section from "./Section/Section";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList.jsx";
import Filter from "./FilterSearch/FilterSearch";
import Notiflix from "notiflix";

Notiflix.Notify.init({
  opacity: 1,
  position: "right-bottom",
  width: "250px",
  distance: "10px",
});

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
      filter: ''
    }
  }
  componentDidMount() {
    const contactsFromLocalStorage = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contactsFromLocalStorage) ?? [];

    this.setState({ contacts: parsedContacts });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleNewContacts = (newContact) => {
    const existingContact = this.state.contacts.filter(contact => contact.name === newContact.name);

    if (existingContact.length > 0) {
      Notiflix.Notify.failure(`${newContact.name} is already in contacts!`);
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact]
      }));
    }
  };
  
  handleToggle = (id) => {
    this.setState((prevState)=>( {
      contacts : prevState.contacts.map((contact)=> contact.id ===id ? {...contact} : contact)
    })
    )
  }
  handleAddFilter = (ev) => {
    this.setState( {filter: ev.target.value})
  }
  handleFiltere = () => {
    const {contacts, filter} =this.state
    return contacts.filter(
      contact => contact.name.toLowerCase().includes(filter.toLowerCase())
    )
  };
  handleDelete = (id) =>{
    this.setState((prevState => ({
      contacts : prevState.contacts.filter((contact) => contact.id !==id)
    })))
  }
    render() {
      const {filter} = this.state;
      return(
        <>
        <Section title="PhoneBook">
        <ContactForm onAddContacts = {this.handleNewContacts}/>
        <Filter filter = {filter} onAddFilter = {this.handleAddFilter}/>
        <ContactList contacts ={this.handleFiltere()}  onDeleteContacts ={this.handleDelete}/>
        </Section>
        </>
      )
    }
};

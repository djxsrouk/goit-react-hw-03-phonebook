import React, { Component } from 'react';
import styles from'./ContactForm.module.css';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

class ContactForm extends Component {
    constructor (props){
        super(props);
        this.state = {
          name: '',
          number: ''
        }
      }
      handleSubmit = (event) => {
        event.preventDefault();
        const newName = event.target.elements.name.value;
        const newNumber = event.target.elements.number.value;
        if(newName.trim() !== "" && newNumber.trim() !== 0){
         const newContact = {
           id : nanoid(),
           name : newName,
           number: newNumber
         };
        this.props.onAddContacts(newContact);

        this.setState({
            name: '',
            number:''
        })
        };
       }
      render(){
        return(
        <form className={styles.formPhoneBook} onSubmit={this.handleSubmit}>
          <label className={styles.labelName}> Name:
        <input
        className={styles.formInput}
          type="text"
          name="name"
          placeholder='Name'
          value={this.state.name}
          pattern="^[a-zA-Z]+(([' \-][a-zA-Z ])?[a-zA-Z]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={(event) => this.setState({name: event.target.value})}
          required
        />
          </label>
          <label className={styles.labelPhone}> Number:
          <input
           className={styles.formInput}
            type="tel"
            name="number"
            placeholder='Phone number'
            value={this.state.number}
            pattern= "\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            onChange={(event) => this.setState({number: event.target.value})}
            required
          />
          </label>
        <button type="submit" className={styles.butonSubmit}>Add contact</button>
        </form>
        )
      }
}
ContactForm.protoType = {
   onAddContacts: PropTypes.func.isRequired,
};
export default ContactForm;
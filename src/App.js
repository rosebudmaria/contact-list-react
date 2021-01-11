import React, { Component } from "react";
import ContactTable from "./components/ContactTable";
import ContactForm from "./components/ContactForm";
import ContactModal from "./components/ContactModal";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const SERVICE_URL = "https://tsg-contactlist.herokuapp.com"

class App extends Component {

  state = {
    loading: false,
    showEditModal: false,
    contactData: [
      {
        "contactId": 1, "firstName": "Fake",
        "lastName": "Data",
        "company": "Unknown Inc.",
        "phone": "000-0000",
        "email": "fakedata@unknown.io"
      }],

      newContactData: {
        firstName: '',
        lastName: '',
        company: '',
        phone: '',
        email: ''
      },

      //dummy data
      editContactData: {
        'contactId': 42,
        'firstName': 'Zaphod',
        'lastName': 'Beeblebrox',
        'company': 'Heart of Gold',
        'phone': '000-0000',
        'email': 'prez@badnews.us'
      },

      addFormsErrors: {
        firstName : '',
        lastName : '',
        company : '',
        phone : '',
        email : ''
      }
  }

  handleEditModalClose = (event) => {
    console.log('Closing Edit Modal')
    this.setState({showEditModal: false})
  }

  handleEditModalOpen = (event) => {
    console.log('Opening Edit Modal')
    if (event) event.preventDefault();
    const contactId = event.target.value;
    console.log(`Editing contact id ${contactId}`)

    //submit a GET request to the /contact/{contactId} endpoint
    //the response should come back with the associated contact's json
    fetch(SERVICE_URL + '/contact/' + contactId)
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      this.setState({editContactData : data, showEditModal: true})
    })
    .catch((error) => {
      console.error('Error:', error)
    })
  }

  handleEditFormChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    const contactInfo = this.state.editContactData;

    console.log(`Something change in ${inputName} : ${inputValue}`)

    if(contactInfo.hasOwnProperty(inputName)) {
      contactInfo[inputName] = inputValue;
      this.setState({editContactData : contactInfo})
    }
  }


  handleEditFormSubmit = (event) => {
    if(event) event.preventDefault();
    let contactId = event.target.value;
    console.log(`Submitting edit for contact id ${contactId}`)
    console.log(this.state.editContactData)

    fetch(SERVICE_URL + '/contact/' + contactId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.editContactData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      this.setState({showEditModal : false})
      this.loadContactData();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  handleDeleteContact = (event) => {
    if (event) event.preventDefault();
    let contactId = event.target.value;
    console.log(`Submitting delete for contact id ${contactId}`)

    fetch(SERVICE_URL + '/contact/' + contactId, {
      method: 'DELETE',
    })
    .then(data => {
      this.loadContactData();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }


  handleAddFormChange = (event) => {
    //The event triggering this function should be an input's onChange event
    //We need to grab the input's name & value so we can associate it with the
    //newContactData within the App's state
    const inputName = event.target.name;
    const inputValue = event.target.value;
    const contactInfo = this.state.newContactData;

    console.log(`Updating new contact data: ${inputName} : ${inputValue}`)

    if(contactInfo.hasOwnProperty(inputName)) {
      contactInfo[inputName] = inputValue;
      this.setState({newContactData: contactInfo})
    }
  }

  validateContact = (contact) => {
    let errors = {
      firstName: '',
      lastName: '',
      company: '',
      phone: '',
      email: '',
      isValid: true
    }
     let isInvalid = false;

     if(!contact.firstName) {
       errors.firstName = "Please enter a first name"
       errors.isValid = false
     }

     if(!contact.lastName) {
      errors.lastName = "Please enter a last name."
      errors.isValid = false;
    }

    if(!contact.company){
      errors.company = "Please enter the company name."
      errors.isValid = false;
    }

    if(!contact.phone && !contact.email){
      errors.phone = "Please enter a phone or email contact (or both)."
      errors.email = "Please enter a phone or email contact (or both)."
      errors.isValid = false;
    }

    let phonePattern = "[0-9]{3}-[0-9]{4}";
    if(contact.phone && !contact.phone.match(phonePattern)){
      errors.phone = "Please match the expected pattern."
      errors.isValid = false;
    }

    let emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
    if(contact.email && !contact.email.match(emailPattern)){
      errors.email = "Please match the expected pattern."
      errors.isValid = false;
    }

    return errors;
  }

  handleAddFormSubmit = (event) => {
    console.log("Adding contact!")
    if (event) event.preventDefault();

    let validationErrors = this.validateContact(this.state.newContactData)
    if(!validationErrors.isValid) {
      console.log("New contact is invalid Reporting errors", validationErrors)
      this.setState({addFormsErrors : validationErrors})
      return
    }

    fetch(SERVICE_URL + '/contact/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(this.state.newContactData),
    })
    .then(response => Response.json())
    .then(data => {
      console.log('Add Contact - Success:', data);
      this.setState({
        newContactData: {firstName: '', lastName: '', company: '', phone: '', email: ''}, 
        addFormsErrors : validationErrors})
      this.loadContactData();
    })
    .catch((error) => {
      console.log('Add Contact - Error:')
    });
  }

  loadContactData() {
    this.setState({loading: true})
    console.log("Loading contact data")
    fetch(SERVICE_URL + '/contacts')
    .then(data => data.json())
    .then(data => this.setState(
      {contactData: data, loading: false}
    ))
  }

  componentDidMount() {
    console.log("App is now mounted.")
    this.loadContactData();
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <h1 className="text-center">Contact Application</h1>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm={8}>
            <h2>My Contacts</h2>
            <ContactTable 
            contacts={this.state.contactData}
            handleEdit={this.handleEditModalOpen}
            handleDelete={this.handleDeleteContact}/>
          </Col>
          <Col sm={4}>
            <h2>Add New Contact</h2>
            <ContactForm 
            handleSubmit={this.handleAppFormSubmit}
            handleChange={this.handleAddFormChange}
            contactData={this.state.newContactData}
            contactErrors={this.state.addFormsErrors}/>
          </Col>
        </Row>
        <ContactModal 
        show={this.state.showEditModal}
        handleSubmit={this.handleEditFormSubmit}
        handleChange={this.handleEditFormChange}
        handleClose={this.handleEditModalClose}
        contactData={this.state.editContactData}/>
      </Container>
    );
  }
}

export default App;

import React, { Component } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import ContactForm from './ContactForm'


class ContactModal extends Component {
    render() {
        let {contactData, handleSubmit, handleChange, show, handleClose} = this.props
        return (
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title># {contactData.contactId}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group controlId='contactFirstName'>
                                <Form.Label>First Name:</Form.Label>
                                <Form.Control type='text' 
                                placeholder='First Name' 
                                name='firstName'
                                value={contactData.firstName}
                                onChange={handleChange}/>
                            </Form.Group>

                            <Form.Group controlId='contactLastName'>
                                <Form.Label>Last Name:</Form.Label>
                                <Form.Control type='text' 
                                placeholder='Last Name' 
                                name='lastName'
                                value={contactData.lastName}
                                onChange={handleChange}/>
                            </Form.Group>

                            <Form.Group controlId='contactCompany'>
                                <Form.Label>Company:</Form.Label>
                                <Form.Control type='text' 
                                placeholder='Company' 
                                name='company'
                                value={contactData.company}
                                onChange={handleChange}/>
                            </Form.Group>

                            <Form.Group controlId='contactPhone'>
                                <Form.Label>Phone Number:</Form.Label>
                                <Form.Control type='text' 
                                placeholder='Phone Number' 
                                name='phone'
                                value={contactData.phone}
                                onChange={handleChange}/>
                            </Form.Group>

                            <Form.Group controlId='contactEmail'>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type='text' 
                                placeholder='Email' 
                                name='email'
                                value={contactData.email}
                                onChange={handleChange}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose}>Close</Button>
                        <Button variant='primary' onClick={handleSubmit} value={contactData.contactId}>Save changes</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        )
    }
}
export default ContactModal
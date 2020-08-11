import React, {Component} from 'react'
// import PropsTypes from 'prop-types'
import Section from './Section'
import Form from './Form'
import ContactsList from './Contacts'
import ContactFilter from './Contacts/ContactFilter'
import LocalStorage from './LocalSt'


const shortid = require('shortid');


export default class App extends Component {

    state = { 
        contacts: [
                {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
                {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
                {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
                {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
                  ],
        filter:''
        
    };
// функция записывает input contacts in filter
    changeFilter = event => {
        this.setState({filter:event.target.value})
    }
// search similar name
    updateInfo = () =>{      
        const {filter, contacts} = this.state
         return contacts.filter(contack => contack.name.toLowerCase().includes(filter.toLowerCase()))  
    }
//ф-я перезаписывает контакты 
    handleCreateObjectContact = ({text,number}) =>{

        const {contacts} =this.state
        const filterName = contacts.map(contact => contact.name)
    // смотрим есть ли похожие contacts
        if (filterName.includes(text)){
            alert(text + ' is already in Contacts')
        }else {

    //создаем обьект           
            const newObj ={
                id:shortid(),
                name:text,
                number:number,
               }
    // перезаписываем stae.contacts  пополняем массив
            this.setState((prevState)=>{
                return {
                    contacts:[...prevState.contacts,newObj],
                }
            })

        }
    }
// Delete contact
    onRemoveItem = itemId =>{
        this.setState((prevState)=>{
            return {
                contacts: prevState.contacts.filter(contact => contact.id.indexOf(itemId) === -1)
            }
        })        
    }

// life-circle get local sterage
componentDidMount(){
const prevContacts = localStorage.getItem('contacts')
if (prevContacts){
    this.setState({contacts:JSON.parse(prevContacts)})
}
}
//add local storage 
componentDidUpdate(prevState,prevProps){
    if(prevState.contacts !== this.state.contacts){
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
}

    render (){
        const {filter} = this.state;
        const visible = this.updateInfo();
        return (
            <>
            <Section title ="Phonebook">
                <Form 
                    onAddText={this.handleCreateObjectContact}/>
            </Section>

            <Section title ="Contacts">

                <ContactFilter 
                    onChangeFilter={this.changeFilter}
                    value={filter}/>
                   
                <ContactsList 
                    contacts ={visible}  
                    onDelete={this.onRemoveItem}
                    />
            </Section>
            </>

        )
    }
}
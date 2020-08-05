import React, {Component}from 'react';
import style from './Form.module.css'


export default class Form extends Component {
    state={
        text:'',
        number:''
    }
//меняем текст в state
    handleChangeText = e => {
        this.setState({
            text: e.target.value,
        })
    }
//меняем number in state 
    handleChangeNumber = e => {
        this.setState({
            number: e.target.value,
        })
    }

// отправляем в App our state
    handleSubmit = e =>{
       e.preventDefault();
       const {text,number} = this.state

        this.props.onAddText({text,number})
    //обнуляем наш input
        this.setState({
            text:'',
            number:'',
        })
    }
render(){
return (
    <form 
    className={style.form}
    onSubmit={this.handleSubmit}
        >
        <label>Name
            <input 
            className={style.input}
            type="input" 
            value={this.state.text}
            onChange={this.handleChangeText}
            placeholder="please write name"
            />
         </label>

         <label> Number
            <input 
            className={style.input_number}
            type="input" 
            country="US"
            value={this.state.number}
            onChange={this.handleChangeNumber}
            placeholder="number phone"
            />
         </label>


         <button 
            className={style.button} 
            type="submit"
            disabled={!this.state.text}
            >
                Add contact 
         </button>
    </form>   
  )
 }
}


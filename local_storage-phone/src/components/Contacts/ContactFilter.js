import React from 'react'
import style from './Contact.module.css'


//Filter input for Contacts 
export default function ContactEditor ({value,onChangeFilter}){

    return (
        <div>
            <input 
                className={style.input}
                type="text"
                value={value}
                onChange={onChangeFilter}
            />
        </div>
    )
}
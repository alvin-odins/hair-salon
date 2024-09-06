import React, { useState } from 'react';

import Calendar from 'react-calendar'

import {useNavigate} from 'react-router-dom'

const services = [
  'Haircut',
  'Haircut and Coloring',
  'Hair Extension',
  'Blowout',
  'Waxing',
  'Deep Conditioning',
  'Bridal Styling',
  'Event Styling',
  'Lash Extensions',
  'Nail Services',
  'Massage Therapy'
]

const stylists = [
  'Natalie Rouseborg',
  'Dough Armtwist',
  'Lisa Quay',
  'Patel Stu',
  'Cyril lehoof'
]


const Booking = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState(new Date())
  const [service, setService] = useState('')
  const [stylist, setStylist] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, date, service, stylist})
    })

    if(response.ok) {
      alert(`Booking for ${name} on ${date.toLocalDateString()} was succesful. We will send an email to ${email} with available times.`)
      navigate('/')
    } else {
      alert('Booking failed. Please try again.')
    }

  }

  return (
    <div>
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          id='name' 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          required 
          />
        </div>

        <div>
        <label htmlFor="email">Email</label>
        <input 
          type="text" 
          id='email' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        </div>

        <div>
        <label htmlFor="">Date:</label>
        <Calendar
            onChange={setDate}
            value={date}
            required
        />
        <p>Selected Date: {date.toLocaleDateString()}</p>
        </div>

        <div>
        <label htmlFor="service">Services: </label>
        <select 
          id="service"
          value={service}
          onChange={(e) => setService(e.target-value)}
          required
        >
          <option value="" disabled>Select a service</option>
          {services.map((service,index) => (
            <option key={index} value={service}>{service}</option>
          ))}
        </select>
        </div>

        <div>
        <label htmlFor="stylist">Stylist: </label>
        <select 
          id="stylist"
          value={stylist}
          onChange={(e) => setStylist(e.target-value)}
        >
          <option value="" disabled>Select a stylist (optional) </option>
          {stylists.map((stylists,index) => (
            <option key={index} value={stylists}>{stylists}</option>
          ))}

        </select>
        </div>

            <button type='submit'>Book an appointment</button>
      </form>
    </div>
  )
}

export default Booking;
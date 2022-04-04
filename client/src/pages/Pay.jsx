import React, {useState, useEffect} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const KEY = "pk_test_51KkqiKECSMC6iOCMlKG0ypedsCIGbJTXT87AkfHg1OSaFll6o3mWKM78P07Al0zX4QVO1i3zEts39BqJKdfiCC7B00ASpehyZD"

const Pay = () => {

const navigate = useNavigate()
const [stripeToken, setStripeToken] = useState('')

const onToken = (token) =>{
setStripeToken(token)
}

useEffect(()=>{
    const makeRequest = async () => {
        try {
           const res = await axios.post("http://localhost:5000/api/checkout/payment", {
               tokenId: stripeToken.id,
               amount: 2000
           })
           console.log(res.data)
           navigate("/success")
        } catch (error) {
            console.log(error)
        }
    }
    stripeToken && makeRequest()
}, [stripeToken])

  return (
    <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <StripeCheckout name="Plant Shop" 
        billingAddress
        shippingAddress
        description='Your total is $20'
        amount={2000}
        token={onToken}
        stripeKey={KEY}
        >
        <button style={{
            border: "none",
            width: 120,
            borderRadius: 5,
            padding: '20px',
            backgroundColor: 'black',
            color: 'white', 
            fontWeight: 500, 
            cursor: 'pointer'
        }}> LET'S PAY</button>
        </StripeCheckout>
    </div>
  )
}

export default Pay
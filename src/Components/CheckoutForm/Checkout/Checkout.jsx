import React, {useState, useEffect} from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core'
import makeStyles from './style'
import PaymentForm from '../PaymentForm'
import AddressForm from '../AddressForm'
import { commerce } from '../../../lib/commerce'
function Checkout({ cart }) {
    const steps = ['Shipping address', 'Payment details']
    const classes = makeStyles()
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [activeStep, setActiveStep] = useState(0)
    const [shippingData, setShippingData] = useState({})
    
    useEffect(() =>{
        const generateToken = async() => {
            try{
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
                setCheckoutToken(token)
            }catch(error){
                console.log(error)
            }

        }
        generateToken()
    }, [cart])
    const nextStep = () => setActiveStep(previos => previos+1)
    const backStep = () => setActiveStep(previos => previos-1)

    const next = (data) => {
        setShippingData(data)
        nextStep()
    }
    const Form = () => {
        return activeStep === 0? <AddressForm checkoutToken= {checkoutToken} next={next}/>:<PaymentForm  shippingData={shippingData}/>
    }
    const Confirmation = () => (
        <div>Confirmation</div>
    )
    return (
        <>
        <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                <Typography variant="h4" align="center">Checkout</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </>
    )
}

export default Checkout

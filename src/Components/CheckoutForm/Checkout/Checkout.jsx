import React, {useState, useEffect} from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button,  CssBaseline} from '@material-ui/core'
import makeStyles from './style'
import PaymentForm from '../PaymentForm'
import AddressForm from '../AddressForm'
import { commerce } from '../../../lib/commerce'
import { Link, useHistory } from 'react-router-dom'


function Checkout({ cart, order, onCaptureCheckout, error, refreshCart }) {
    const steps = ['Shipping address', 'Payment details']
    const classes = makeStyles()
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [activeStep, setActiveStep] = useState(0)
    const [shippingData, setShippingData] = useState({})
    const [isFinished, setIsFinished] = useState(false)
    const history = useHistory()
    useEffect(() =>{
        const generateToken = async() => {
            try{
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
                setCheckoutToken(token)
            }catch{
                if (activeStep !== steps.length){
                    history.push('/')
                }
            }

        }
        generateToken()
    }, [cart])
    const nextStep = () => setActiveStep(previous => previous+1)
    const backStep = () => setActiveStep(previous => previous-1)

    const next = (data) => {
        setShippingData(data)
        nextStep()
    }
    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true)
            refreshCart()
        }, 3000)
    }
    const Form = () => {
        return activeStep === 0? <AddressForm checkoutToken= {checkoutToken} next={next}/>:<PaymentForm  shippingData={shippingData} checkoutToken= {checkoutToken} backStep={backStep} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep} timeout={timeout} />
    }
    let Confirmation = () => (order.customer?(
        <>
        <div>
            <Typography variant="h5">Thank you for your purshase, {order.customer.firstname} {order.customer.lastname}</Typography>  
            <Divider className={classes.divider}/>
            <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
        </div>
        <br />
        <Button component={Link} to="/" type="button" variant="outlined">Back to Home</Button>  
        </>
    ): isFinished? (
        <>
        <div>
            <Typography variant="h5">Thank you for your purshase, John Wick</Typography>  
            <Divider className={classes.divider}/>
        </div>
        <br />
        <Button component={Link} to="/" type="button" variant="outlined">Back to Home</Button>  
        </>

    ):(
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    ))
    // if (error){
    //     Confirmation =  () =>(
    //     <>
    //         <Typography variant="h5">Error: {error}</Typography>
    //         <br />
    //         <Button component={Link} to="/" type="button" variant="outlined">Back to Home</Button>  

    //     </>
    //     )
    // }
    return (
        <>
        <CssBaseline />
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

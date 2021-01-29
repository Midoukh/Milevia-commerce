import React, { useState, useEffect } from 'react'
import {InputLabel, Select, MenuItem, Button, Grid, Typography} from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import FormInput from './CustomTextField' 
import { commerce } from '../../lib/commerce'
import { Link } from 'react-router-dom'

function AddressForm({ checkoutToken, next }) {
    const methods = useForm()
    const [shippingCountries, setShippingCountries] = useState([])
    const [shippingCountry, setShippingCountry] = useState('')
    const [shippingDevisions, setShippingDevisions] = useState([])
    const [shippingDevision, setShippingDevision] = useState('')
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState('')

    const countries = Object.entries(shippingCountries).map(([code, label]) => ({code: code, label:label}))
    const subDivisions = Object.entries(shippingDevisions).map(([code, label]) => ({code: code, label:label}))
    const options = shippingOptions.map(shipOpt => ({id: shipOpt.id, label: `${shipOpt.description} - (${shipOpt.price.formatted_with_symbol})`}))
    const fetchShippingCountries = async(checkoutTokenId) => {
        const res = await commerce.services.localeListShippingCountries(checkoutTokenId)
        
        setShippingCountries(res.countries)
        setShippingCountry(Object.keys(res.countries)[0])
        
    }
    const fetchSubDivisions = async(countryCode) => {
        const res = await commerce.services.localeListSubdivisions(countryCode)
        setShippingDevisions(res.subdivisions)
        setShippingDevision(Object.keys(res.subdivisions)[0])
    }
    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: region })
        console.log(options)
        setShippingOptions(options)
        setShippingOption(options[0].id)
    }
    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, [])
    useEffect(() => {
        if (shippingCountry) fetchSubDivisions(shippingCountry)

    }, [shippingCountry])
    useEffect(() => {
        if (shippingDevision) {
            fetchShippingOptions(checkoutToken.id, shippingCountry, shippingDevision)
        }
    }, [shippingDevision])
    return (
        <>
           <Typography variant="h6" gutterBottom>Shipping Address</Typography>
           <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit((data) => next({...data, shippingCountry, shippingDevision, shippingOption}))} >
                <Grid container spacing={3}>
                    <FormInput required name="firstName" label="First name"/>
                    <FormInput required name="lastName" label="Last name"/>
                    <FormInput required name="address1" label="Address"/>
                    <FormInput required name="email" label="Email"/>
                    <FormInput required name="city" label="City" />
                    <FormInput required name="zip" label="ZIP / Postal code"/>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Country</InputLabel>
                        <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                        {countries.map((country) => {
                            return (
                                <MenuItem key={country.code} value={country.code} >
                                        {country.label}
                                </MenuItem>
                            )
                        })}     
                        </Select>
                       
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Sub-division</InputLabel>
                        <Select value={shippingDevision} fullWidth onChange={(e) => setShippingDevision(e.target.value)}>
                           {subDivisions.map((sub) => {
                               return (
                                <MenuItem key={sub.code} value={sub.code} >
                                        {sub.label}
                                </MenuItem>
                               )
                           })}
                        </Select>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Options</InputLabel>
                        <Select value={shippingOption} fullWidth onChange={(e) => shippingOption(e.target.value)}>
                           {options.map((sO) => {
                               return (
                                <MenuItem key={sO.id} value={sO.id} >
                                        {sO.label}
                                </MenuItem>
                               )
                           })}
                        </Select>
                    </Grid>

                </Grid>
                <br />
                <div style={{display: 'flex', justifyContent:'space-between'}}>
                    <Button component={Link} to="/cart" variant="outline" style={{border: '1px solid black'}}>Back to cart</Button>
                    <Button type="submit" variant="contained" color="primary">Next</Button>

                </div>
              </form>
           </FormProvider>
        </>
    )
}

export default AddressForm

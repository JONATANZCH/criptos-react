import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'
import Error from './Error'

const InputSubmit = styled.input`
    font-weight: 700;
    font-size: 20px;
    color: #FFF;
    background-color: #0D2235;
    padding: 10px 30px;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    border-radius: 10px;
    transition: 3000ms;
    transform: translateY(0);
    display: block;
    margin: 30px auto 0 auto;
    flex-direction: row;
    align-items: center;
    text-transform: uppercase;
    cursor: pointer;
    width: max-content;
    &:hover {
        transition: 3000ms;
        padding: 10px 170px;
        transform: translateY(-0px);
        background-color: #dddddd;
        color: #d60101;
        border: solid 2px #d60101;
    }
`

const Formulario = ({setMonedas}) => {
    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)

    const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu Moneda', monedas)
    const [ criptomoneda, SelectCriptomoneda ] = useSelectMonedas('Elige tu Criptomoneda', criptos)

    useEffect(() => {
        const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()

            const arrayCriptos = resultado.Data.map( cripto => {
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                return objeto
            })

            setCriptos(arrayCriptos)

        }
        consultarAPI()
    }, [])
    
    const handleSubmit = e => {
        e.preventDefault()

        if([moneda, criptomoneda].includes('')) {
            setError(true);
            return
        }

        setError(false)
        setMonedas({
            moneda,
            criptomoneda
        })
    }

    return (
        <>
            {error && <Error>Todos los campos son obligatorios</Error>}
            <form
                onSubmit={handleSubmit}
            >

                <SelectMonedas/>
                <SelectCriptomoneda/>
                
                
                <InputSubmit 
                    type="submit"  
                    value="Cotizar"
                />
            </form>
        </>
    )
}

export default Formulario

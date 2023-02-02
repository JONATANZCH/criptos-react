import { useState } from 'react'
import styled from '@emotion/styled'

const Label = styled.label`
    color: #0D2235;
    display: block;
    font-family: 'Lato', sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin: 15px 0;
`
const Select = styled.select`
    width: 100%;
    font-size: 18px;
    padding: 14px;
    border-radius: 15px;
    background: rgba( 255, 255, 255, 0.3 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 0px );
    -webkit-backdrop-filter: blur( 0px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
`

const useSelectMonedas = (label, opciones) => {

    const [state, setState] = useState('')
    
    const SelectMonedas = () => (
        <>
            <Label>{label}</Label>
            <Select
                value={state}
                onChange={ e => setState( e.target.value )}
            >
                <option value="">Seleccione</option>
                {opciones.map( opcion => (
                    <option 
                        key={opcion.id}
                        value={opcion.id}
                    >{opcion.nombre}</option>
                ))}
            </Select>
        </>
    )

    return [ state, SelectMonedas ]
}

export default useSelectMonedas

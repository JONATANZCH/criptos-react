import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import ImageCripto from './img/imagen-criptos.png'
import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  } 
`
const Imagen = styled.img`
  background: rgba( 196, 2, 2, 0.3 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 2px );
  -webkit-backdrop-filter: blur( 2px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  max-width: 400px;
  width: 80%;
  margin: 180px auto 0 auto;
  display: block;
`
const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #0D2235;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #000;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

function App() {

  const [monedas, setMonedas] = useState({})
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    if(Object.keys(monedas).length > 0 ) {

      const cotizarCripto = async () => {
        setCargando(true)
        setResultado({})

        const { moneda, criptomoneda } = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        setResultado(resultado.DISPLAY[criptomoneda][moneda])

        setCargando(false)
      }
      cotizarCripto()
    }
  }, [monedas])

  return (
    <Contenedor>
      <Imagen
        src={ImageCripto}
        alt='imagen criptos'
      />

      <div>
        <Heading>Cotiza Criptomonedas al Instante </Heading>
        <Formulario
          setMonedas={setMonedas}
        />
        {cargando && <Spinner/> }
        {resultado.PRICE && <Resultado resultado={resultado}/>}
      </div>

    </Contenedor>
  )
}

export default App

import styled from '@emotion/styled'

const Texto = styled.div`
    background: rgba( 0, 0, 0, 0.4 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 0px );
    -webkit-backdrop-filter: blur( 0px );
    border-radius: 10px;
    border: 2px solid rgba( 200, 0, 0, 0.18 );
    color: #a80101;
    padding: 15px;
    font-size: 22px;
    text-transform: uppercase;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    text-align: center;
`

const Error = ({children}) => {
    return (
        <Texto>
            {children}
        </Texto>
    )
}

export default Error

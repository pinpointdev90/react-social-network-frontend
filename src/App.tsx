import styled from '@emotion/styled'
import React from 'react'
import Router from './router'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    font-family: sans-serif;
    background-color: #f6f6f6;
  //overflow: hidden;
  padding: 0;
  margin: 0;
`


const App = () => {
  return (
      <Container>
        <Router/>
      </Container>
  )
}

export default App
import React, { useState } from 'react';
import { Heading, Text, Button } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';

import './home.style.scss';

function Home() {
  const [featuresRedirect, setFeaturesRedirect] = useState(false);

  return (
    <div className='Home'>
      {featuresRedirect ? <Navigate to='/features' /> : null}
      <Heading as='h1'>CRA Template</Heading>
      <Text>A simple React App to kickstart your work on u.dev_.</Text>
      <Button colorScheme='teal' onClick={() => setFeaturesRedirect(true)}>
        Features
      </Button>
    </div>
  );
}

export default Home;

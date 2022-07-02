import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Heading,
  List,
  ListItem,
  ListIcon,
  Code,
  Button,
  Link,
} from '@chakra-ui/react';
import { CheckCircleIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { toast } from 'react-toastify';

import './features.style.scss';

const Features = () => {
  const [goToHome, setGoToHome] = useState(false);

  return (
    <article className='Features'>
      {goToHome ? <Navigate to='/home' /> : null}
      <section className='Features-content'>
        <Heading as='h1'>Features</Heading>
        <List spacing={3}>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color='green.500' />
            Style with{' '}
            <Link href='https://sass-lang.com/' isExternal>
              SASS <ExternalLinkIcon mx='2px' />
            </Link>
            ;
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color='green.500' />
            Use the power of{' '}
            <Link href='https://www.typescriptlang.org/' isExternal>
              TypeScript <ExternalLinkIcon mx='2px' />
            </Link>
            ;
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color='green.500' />
            Simple toasts notification with{' '}
            <Link
              href='https://fkhadra.github.io/react-toastify/introduction'
              isExternal
            >
              React Toastfy <ExternalLinkIcon mx='2px' />
            </Link>
            ;
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color='green.500' />
            Use the{' '}
            <Link href='https://chakra-ui.com' isExternal>
              Chakra Design system <ExternalLinkIcon mx='2px' />
            </Link>{' '}
            for great pre-made components;
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color='green.500' />
            Lint your code with Prettier using <Code>npm run lint</Code>.
          </ListItem>
        </List>
        <Button
          colorScheme='teal'
          onClick={() => {
            setGoToHome(true);
            toast.success('Nice!');
          }}
        >
          Nice?
        </Button>
      </section>
    </article>
  );
};

export default Features;

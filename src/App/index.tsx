import * as React from 'react';
import { render } from 'react-dom';
import Container from 'App/View/Container';

import { sections, mails } from '../data.json';

render(
    <Container sections={sections} mails={mails} />,
    document.getElementById('app')
);

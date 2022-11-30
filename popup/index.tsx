import React from 'react';
import { createRoot } from 'react-dom/client';
// import { Popup } from './Popup';
import { Clipboard } from './Clipboard';

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(<Clipboard />);

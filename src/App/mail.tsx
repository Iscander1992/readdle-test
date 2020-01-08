import * as React from 'react';
import { render } from 'react-dom';
import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import { Mail } from 'App/Types';
import { pipe } from 'fp-ts/lib/pipeable';
import { fromNullable, mapNullable, toNullable } from 'fp-ts/lib/Option';
import MailShow from 'App/View/Section/MailInfo/MailShow';

/**
 * @return {A}
 * @constructor
 */
const App: React.FC = () => {

    const [mail, setMail] = useState<Mail>(null);

    useEffect(() => {
        const listener = (event, args)=> setMail(args);
        ipcRenderer.on('channel', listener);
        return () => ipcRenderer.off('channel', listener);
    });

    return pipe(
        fromNullable(mail),
        mapNullable(mail => (
            <MailShow mail={mail} />
        )),
        toNullable
    );
};

render(
    <App />,
    document.getElementById('mail')
);

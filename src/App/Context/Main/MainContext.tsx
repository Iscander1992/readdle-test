import * as React from 'react';
import { Mail, Section } from 'App/Types';

export interface MainContextProps {

    mails: Mail[];
    activeMailId?: string;
    setActiveMail: (activeMailId: string) => void;
    updateMail: (id: string, mail: Partial<Mail>) => void;

    sections: Section[];
    activeSectionId?: string;
    setActiveSection: (activeSectionId: string) => void;
}

const MainContext = React.createContext<MainContextProps>({

    mails: [],
    activeMailId: null,
    setActiveMail: () => undefined,
    updateMail: () => undefined,

    sections: [],
    activeSectionId: null,
    setActiveSection: () => undefined,
});

export default MainContext;

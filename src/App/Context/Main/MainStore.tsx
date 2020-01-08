import * as React from 'react';
import { Reducer, useContext, useReducer } from 'react';
import MainContext, { MainContextProps } from 'App/Context/Main/MainContext';
import { pipe } from 'fp-ts/lib/pipeable';
import prop from 'ramda/es/prop';
import cond from 'ramda/es/cond';
import equals from 'ramda/es/equals';
import assoc from 'ramda/es/assoc';
import dissoc from 'ramda/es/dissoc';
import always from 'ramda/es/always';
import over from 'ramda/es/over';
import set from 'ramda/es/set';
import T from 'ramda/es/T';
import { Mail, Section } from 'App/Types';
import lensProp from 'ramda/es/lensProp';
import mergeDeepLeft from 'ramda/es/mergeDeepLeft';
import replaceItemInArray from 'App/Helper/Array/replaceItemInArray';

/**
 * @interface Props
 */
interface Props {
    getDefaultProps?: () => Partial<MainContextProps>;
}

/**
 * @type Action
 */
type Action = {
    type: string;

    activeSectionId?: string;
    activeMailId?: string;
    id?: string;
    mail?: Mail;
}

/**
 * @param {MainContextProps} prevState
 * @param {Action} action
 * @return {MainContextProps}
 */
const reducer: Reducer<MainContextProps, Action> = (prevState, action) => pipe(
    action,
    prop('type'),
    cond([
        [equals('setActiveSection'), () => pipe(
            prevState,
            set(
                lensProp('activeSectionId'),
                action.activeSectionId,
            ),
            dissoc('activeMailId'),
        )],
        [equals('setActiveMail'), () => pipe(
            prevState,
            set(
                lensProp('activeMailId'),
                action.activeMailId,
            ),
            over(
                lensProp('mails'),
                replaceItemInArray({ id: action.activeMailId }, assoc('isRead', true)),
            )
        )],
        [equals('updateMail'), () => over(
            lensProp('mails'),
            replaceItemInArray({ id: action.id }, mergeDeepLeft(action.mail)),
            prevState
        )],
        [T, always(prevState)]
    ]),
);

/**
 * @param {React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined} children
 * @param {(() => Partial<MainContextProps>) | undefined} getDefaultProps
 * @return {any}
 * @constructor
 */
const MainStore: React.FC<Props> = ({ children, getDefaultProps }) => {

    const mainContext = useContext(MainContext);
    const [state, dispatch] = useReducer(reducer, {
        ...mainContext,

        ...getDefaultProps(),

        setActiveSection: (activeSectionId) => dispatch({ type: 'setActiveSection', activeSectionId }),
        setActiveMail: (activeMailId) => dispatch({ type: 'setActiveMail', activeMailId }),
        updateMail: (id, mail) => dispatch({ type: 'updateMail', id, mail }),
    });

    return (
        <MainContext.Provider value={state}>
            {children}
        </MainContext.Provider>
    );
};

MainStore.defaultProps = {
    getDefaultProps: () => ({}),
};

export default MainStore;

import * as React from 'react';
import { ComponentType } from 'react';
import MainContext, { MainContextProps } from 'App/Context/Main/MainContext';

/**
 * @param {React.ComponentType<Props & MainContextProps>} Component
 * @return {(props: Props) => any}
 */
const withMain = <Props extends object>(Component: ComponentType<Props & MainContextProps>) => (props: Props) => (
    <MainContext.Consumer>
        {main => <Component {...main} {...props} />}
    </MainContext.Consumer>
);

export default withMain;

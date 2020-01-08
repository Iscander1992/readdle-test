import * as React from 'react';
import Sidebar from 'App/View/Section/Sidebar';
import MailList from 'App/View/Section/MailList';
import { Mail, Section } from 'App/Types';
import MainStore from 'App/Context/Main/MainStore';
import MailInfo from 'App/View/Section/MailInfo';

/**
 * @interface Props
 */
interface Props {
    sections?: Section[];
    mails?: Mail[];
}

/**
 * @param {Section[] | undefined} sections
 * @param {Mail[] | undefined} mails
 * @return {any}
 * @constructor
 */
const Container: React.FC<Props> = ({ sections, mails }) => {

    return (
        <MainStore
            getDefaultProps={() => ({ sections, mails })}
        >
            <div className="container-fluid">
                <div className="row flex-nowrap full-height">
                    <Sidebar />
                    <MailList />
                    <MailInfo />
                </div>
            </div>
        </MainStore>
    );
};

Container.defaultProps = {
    sections: [],
    mails: [],
};

export default React.memo(Container);

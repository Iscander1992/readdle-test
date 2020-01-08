import * as React from 'react';
import { useMemo } from 'react';
import withMain from 'App/Context/Main/withMain';
import { pipe } from 'fp-ts/lib/pipeable';
import find from 'ramda/es/find';
import whereEq from 'ramda/es/whereEq';
import { fromNullable, mapNullable, toNullable } from 'fp-ts/lib/Option';
import MailShow from 'App/View/Section/MailInfo/MailShow';

/**
 * @type {(props: {readonly updateMail?: any; readonly activeSectionId?: any; readonly activeMailId?: any; readonly mails?: any}) => any}
 */
const MailInfo = withMain(({ mails, activeMailId, activeSectionId, updateMail }) => {

    return useMemo(() => (
        pipe(
            fromNullable(mails),
            mapNullable(find(whereEq({ id: activeMailId }))),
            mapNullable((mail) => (
                <MailShow
                    mail={mail}
                    updateMail={updateMail}
                />
            )),
            toNullable
        )
    ), [mails, activeMailId, activeSectionId]);
});

export default MailInfo;

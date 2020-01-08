import * as React from 'react';
import withMain from 'App/Context/Main/withMain';
import { pipe } from 'fp-ts/lib/pipeable';
import { filter, fromNullable, mapNullable, toNullable } from 'fp-ts/lib/Option';
import isArray from 'lodash-es/isArray';
import MailItem from 'App/View/Section/MailList/MailItem';
import addIndex from 'ramda/es/addIndex';
import complement from 'ramda/es/complement';
import filterR from 'ramda/es/filter';
import ifElse from 'ramda/es/ifElse';
import find from 'ramda/es/find';
import whereEq from 'ramda/es/whereEq';
import equals from 'ramda/es/equals';
import isEmpty from 'ramda/es/isEmpty';
import mapR from 'ramda/es/map';
import { Mail } from 'App/Types';
import { getOrElse } from 'fp-ts/es6/Option';
import { useMemo } from 'react';

const MailList: React.FC = withMain(({ activeSectionId, sections, mails, setActiveMail }) => {

    return useMemo(() => (
        pipe(
            fromNullable(sections),
            mapNullable(find(whereEq({ id: activeSectionId }))),
            mapNullable((selectedSection) => (
                <div className="col-4 border-right border-secondary bg-light">
                    <h2 className="mb-4">{selectedSection.name}</h2>
                    {
                        pipe(
                            fromNullable(mails),
                            filter(isArray),
                            mapNullable(ifElse(
                                () => equals(activeSectionId, 'removed'),
                                filterR(whereEq({
                                    isDeleted: true,
                                })),
                                filterR(whereEq({
                                    sectionId: selectedSection.id,
                                    isDeleted: equals(activeSectionId, 'removed'),
                                }))
                            )),
                            filter(complement(isEmpty)),
                            mapNullable(addIndex(mapR)((mail: Mail, index) => (
                                <MailItem
                                    key={index}
                                    onSelecting={setActiveMail}
                                    mail={mail}
                                />
                            ))),
                            mapNullable((mails) => (
                                <ul className="list-unstyled">
                                    {mails}
                                </ul>
                            )),
                            getOrElse(() => (
                                <div className="text-center">No data</div>
                            ))
                        )
                    }
                </div>
            )),
            toNullable
        )
    ), [activeSectionId, sections, mails]);
});

export default MailList;

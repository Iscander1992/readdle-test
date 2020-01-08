import * as React from 'react';
import classNames from 'classnames';
import withMain from 'App/Context/Main/withMain';
import * as fa from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { pipe } from 'fp-ts/lib/pipeable';
import { filter, fromNullable, mapNullable, toNullable } from 'fp-ts/lib/Option';
import isArray from 'lodash-es/isArray';
import addIndex from 'ramda/es/addIndex';
import mapR from 'ramda/es/map';
import equals from 'ramda/es/equals';
import { Section } from 'App/Types';
import { useMemo } from 'react';

/**
 * @type {(props: {readonly sections?: any}) => any}
 */
const Sidebar: React.FC = withMain(({ sections, activeSectionId, setActiveSection }) => {

    return useMemo(() => (
        <div className="col-2 bg-dark text-light sidebar">
            <ul className="list-unstyled pt-3 pb-3">
                {
                    pipe(
                        fromNullable(sections),
                        filter(isArray),
                        mapNullable(addIndex(mapR)((section: Section, index) => (
                            <li
                                key={index}
                                onClick={() => setActiveSection(section.id)}
                                className={classNames('pt-1 pb-1 pl-1', {
                                    'bg-light text-dark': equals(section.id, activeSectionId)
                                })}
                            >
                                <FontAwesomeIcon icon={fa[section.icon]} />
                                {section.name}
                            </li>
                        ))),
                        toNullable
                    )
                }
            </ul>
        </div>
    ), [sections, activeSectionId]);
});

export default Sidebar;

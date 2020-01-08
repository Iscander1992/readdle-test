import * as React from 'react';
import DateFormatter from 'App/View/Module/DateFormatter';
import { Mail } from 'App/Types';
import { pipe } from 'fp-ts/lib/pipeable';
import { filter, fromNullable, mapNullable, toNullable } from 'fp-ts/lib/Option';
import isFunction from 'lodash-es/isFunction';

/**
 * @interface Props
 */
interface Props {
    mail: Mail;
    updateMail?: (mailId: string, mail: Partial<Mail>) => void;
}

/**
 * @param {Mail} mail
 * @param {((mailId: string, mail: Partial<Mail>) => void) | undefined} updateMail
 * @return {any}
 * @constructor
 */
const MailShow: React.FC<Props> = ({ mail, updateMail }) => {

    return (
        <div className="col-sm mail-info">
            <h2 className="mb-4">Mail info</h2>

            {
                pipe(
                    fromNullable(updateMail),
                    filter(isFunction),
                    mapNullable(() => (
                        <div className="form-inline mb-4">
                            <div className="form-group form-check mr-4">
                                <input
                                    id="mail-read"
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={mail.isRead}
                                    onChange={(event) => updateMail(mail.id, { isRead: event.target.checked })}
                                />
                                <label className="form-check-label" htmlFor="mail-read">Read</label>
                            </div>
                            <div className="form-group form-check">
                                <input
                                    id="mail-deleted"
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={mail.isDeleted}
                                    onChange={(event) => updateMail(mail.id, { isDeleted: event.target.checked })}
                                />
                                <label className="form-check-label" htmlFor="mail-deleted">Deleted</label>
                            </div>
                        </div>
                    )),
                    toNullable
                )
            }

            <h6 className="mail-info-subject">{mail.subject}</h6>
            <div className="row">
                <h5 className="col-sm">From: {mail.from}</h5>
                <div className="col-sm-3 text-right">
                    <DateFormatter
                        date={mail.date}
                        format="HH:ii, d MMM yyyy"
                    />
                </div>
                <h5 className="col-sm-12">To: {mail.to}</h5>
            </div>
            <div className="mail-info-content">{mail.content}</div>
        </div>
    );
};

export default MailShow;

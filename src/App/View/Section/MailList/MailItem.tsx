import * as React from 'react';
import { Mail } from 'App/Types';
import DateFormatter from 'App/View/Module/DateFormatter';
import { useMemo } from 'react';
import { ipcRenderer } from "electron";

/**
 * @interface Props
 */
interface Props {
    mail: Mail;
    onSelecting: (mailId: string) => void;
}

/**
 * @param {Mail} mail
 * @param {(mailId: string) => void} onSelecting
 * @return {unknown}
 * @constructor
 */
const MailItem: React.FC<Props> = ({ mail, onSelecting }) => {
    return useMemo(() => (
        <li className="border-bottom mail-item mb-3" onClick={() => onSelecting(mail.id)}>
            <div className="row">
                <h5 className="col-sm">
                    {
                        !mail.isRead && (
                            <span className="badge badge-pill badge-primary mr-1">
                                Unread
                            </span>
                        )
                    }
                    &nbsp;
                    {mail.from}
                </h5>
                <div className="col-sm-3 text-right no-wrap">
                    <DateFormatter date={mail.date} />
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    <h6 className="mail-item-subject">{mail.subject}</h6>
                </div>
                <div className="col-sm text-right">
                    <button type="button" className="btn btn-primary" onClick={(event) => {
                        event.stopPropagation();
                        ipcRenderer.send('new-window', mail)
                    }}>Open in new window</button>
                </div>
            </div>
            <div className="mail-item-content">{mail.content}</div>
        </li>
    ), [mail]);
};

export default MailItem;

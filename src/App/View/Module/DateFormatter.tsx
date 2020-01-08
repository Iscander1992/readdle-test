import * as React from 'react';
import formatFn from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

/**
 * @interface Props
 */
interface Props {
    date: string,
    format?: string,
}

/**
 * @param {string} date
 * @param {string} format
 * @return {any}
 * @constructor
 */
const DateFormatter: React.FC<Props> = ({ date, format }) => (
    <>
        {formatFn(parseISO(date), format)}
    </>
);

DateFormatter.defaultProps = {
    format: 'd MMM, yyyy',
};

export default React.memo(DateFormatter);

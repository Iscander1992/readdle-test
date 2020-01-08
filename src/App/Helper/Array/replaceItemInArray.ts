import isArray from 'lodash-es/isArray';
import { pipe } from 'fp-ts/lib/pipeable';
import { filter, fromNullable, getOrElse, mapNullable } from 'fp-ts/lib/Option';
import whereEq from 'ramda/es/whereEq';
import always from 'ramda/es/always';
import adjust from 'ramda/es/adjust';
import lte from 'ramda/es/lte';
import findIndex from 'ramda/es/findIndex';
import clone from 'ramda/es/clone';
import curry from 'ramda/es/curry';

/**
 * @type {Curry<<T>(criteria: Partial<T>, replacer: (item: T) => T, items: T[]) => T[]>}
 */
const replaceItemInArray = curry(<T>(criteria: Partial<T>, replacer: (item: T) => T, items: T[]): T[] => pipe(
    fromNullable(items),
    filter(isArray),
    mapNullable(findIndex(whereEq(criteria))),
    filter(lte(0)),
    mapNullable(index => adjust(index, replacer, items)),
    getOrElse(always(clone(items)))
));

export default replaceItemInArray;

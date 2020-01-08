import replaceItemInArray from './replaceItemInArray';

describe('replaceItemInArray', () => {

    it('replace item in array where', () => {

        const items = [
            {
                id: 1,
                value: 'One'
            },
            {
                id: 2,
                value: 'Two',
            },
            {
                id: 3,
                value: 'Three',
            }
        ];

        const newItems = replaceItemInArray({
                id: 2,
                value: 'Two',
            }, item => ({
                ...item,
                value: 'SECOND',
            }),
            items
        );

        expect(newItems).toEqual([
            {
                id: 1,
                value: 'One'
            },
            {
                id: 2,
                value: 'SECOND',
            },
            {
                id: 3,
                value: 'Three',
            }
        ]);
        expect(newItems).not.toBe(items);
    });

    it('doesn\'t replace item in array where', () => {

        const items = [
            {
                id: 1,
                value: 'One'
            },
            {
                id: 2,
                value: 'Two',
            },
            {
                id: 3,
                value: 'Three',
            }
        ];

        const newItems = replaceItemInArray({
                id: 5
            }, (item) => ({
                ...item,
                value: 'NOT EXISTS',
            }),
            items
        );

        expect(newItems).toEqual(items);
        expect(newItems).not.toBe(items);
    });
});

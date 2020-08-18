/**
 * 
 * @param {array} array new trace to be created from array
 */
export const newTrace = (array) => {
    return [
        {
            array: [...array],
            groupA: [],
            groupB: [],
            groupC: [],
            groupD: [],
            sortedIndices: []
        }
    ];
};

export const createRange = (start, end) => {
    return [...Array(end - start).keys()].map((elem) => elem + start);
};

export const addToTrace = (
    trace,
    array,
    sortedIndices = [],
    groupA = [],
    groupB = [],
    groupC = [],
    groupD = []
) => {
    trace.push({
        array: [...array],
        groupA: [...groupA],
        groupB: [...groupB],
        groupC: [...groupC],
        groupD: [...groupD],
        sortedIndices: [...sortedIndices]
    });
};

export const lastSorted = (trace) => {
    return trace[trace.length - 1].sortedIndices;
};

/**
 * Swaps two elements in an array
 * @param {array} array 
 * @param {int} i first array index to be swapped
 * @param {int} j second array index to be swapped
 */
export const swap = (array, i, j) => {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
}

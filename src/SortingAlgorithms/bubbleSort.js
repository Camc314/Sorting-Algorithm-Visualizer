import {
    swap,
    addToTrace,
    newTrace,
    lastSorted
} from '../services/helperFunctions'

/**
 * Returns trace of sorted array
 * @param {array} nums Input array to be sorted and traced 
 */
const BubbleSort = (array) => {
    // Set up code for tracing the algorithm
    const trace = newTrace(array);

    // Sorting Algorithm with trace capture
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            // Visualize: Comparing A[j] and A[j + 1]
            addToTrace(trace, array, lastSorted(trace), [j, j + 1]);

            if (array[j] > array[j + 1]) {
                swap(array, j, j + 1);

                // Visualize: Swap A[j] and A[j + 1]
                addToTrace(trace, array, lastSorted(trace), [], [j, j + 1]);
            }
        }

        // Visualize: final value is sorted
        addToTrace(trace, array, [
            ...lastSorted(trace),
            array.length - 1 - i
        ]);
    }

    return trace;
};

export default BubbleSort
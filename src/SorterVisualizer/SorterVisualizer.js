import React, { Component } from 'react';

const NUMBER_OF_POINTS = 50;

//const DELAY_MS = 15;
const PRIMARY_COLOR = 'black';
const SECONDARY_COLOR = 'blue';
const ANIMATION_SPEED_MS = 20;
//const NUMBER_OF_ARRAY_BARS = NUMBER_OF_POINTS;

class SorterVisualizer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            array: [],
            arrayAccess: 0,
            extraClass: '',
            sortMethod: 'bubble'
        }
    }

    handleChange = (event) => {
        this.setState({
            sortMethod: event.target.value
        });

        //console.log(this.state)
    }

    generateNewArray = () => {
        this.setState({
            array: setInitialValues()
        })
    }

    runSort = () => {
        console.log(`Running ${this.state.sortMethod} Sort Method`)
        switch (this.state.sortMethod) {
            case 'bubble':
                this.runBubbleSort();
                break;
            case 'insertion':
                this.runInsertionSort();
                break;
            case 'quickSort':
                this.runQuickSort();
                break;
            case 'heapSort':
                this.runHeapSort();
            default:
                break;
        }
    }

    runHeapSort() {
        const trace = HeapSort(this.state.array)
        console.log(trace)
        for (let i = 0; i < trace.length; i++) {
            // console.log(item)
            setTimeout(() => {
                this.setState({ array: trace[i].array })
            }, i * 10)
        }
    }

    runBubbleSort() {
        // console.log(this.state.array);
        // let array = this.state.array;
        // //let extraClass = this.state.extraClass;
        // let a = bubbleSortAnimations(array)
        // console.log(a)
        // for (let i = 0; i < a.length - 1; i += 2) {

        //     setTimeout(() => {
        //         array[a[i][0]] = a[i][1];
        //         array[a[i + 1][0]] = a[i + 1][1];
        //         //extraClass[a[i+1]] = 'isActive';
        //         this.setState({ arrayAccess: i })
        //         this.setState({ array });

        //     }, i * ANIMATION_SPEED_MS);
        // }

        const trace = BubbleSort(this.state.array)
        console.log(trace)

        for (let i = 0; i < trace.length; i++) {
            // console.log(item)
            setTimeout(() => {
                this.setState({ array: trace[i].array })
            }, i * 10)
        }
    }

    runInsertionSort() {
        let array = this.state.array;
        let a = insertionSortAnimations(array);
        console.log(a)
        for (let i = 0; i < a.length; i += 2) {

            setTimeout(() => {
                this.setState({ array: a[i] });

            }, i * ANIMATION_SPEED_MS);
        }
    }

    runQuickSort() {

    }

    componentDidMount() {
        const array = setInitialValues();
        //console.log(values);
        //;
        //const extraClass = setInitialClass();
        //this.setState({ extraClass });
        this.setState({ array });
        //this.resetArray();
    }

    render() {

        const array = this.state.array;
        const { values } = this.state;

        return (
            <div>
                <div className="optionsContainer">

                    <button onClick={this.runSort}>Start</button>
                    <button onClick={this.runSort}>Stop</button>
                    <button title="" id="newArray" style={{}} onClick={() => this.generateNewArray()}>Shuffle</button>


                    <span className="customDropdown">
                        <select id="algorithm" name="algorithm" value={this.state.value}
                            onChange={this.handleChange} >
                            <option value="bubble">Bubble Sort</option>
                            <option value="insertion">Insertion Sort</option>
                            <option value="heapSort">Heap Sort</option>
                        </select>

                    </span>

                    <div class="inputCont">
                        <span>Amount</span>
                        <input id="numberPoints" type="number" value="100" />
                    </div>

                    <div class="inputCont">
                        <span>Speed</span>
                        <input type="number" value="100" />
                    </div>

                </div>
                <h3>Array Accesses: {this.state.arrayAccess}</h3>

                <div className="graphContainer" style={{ display: 'flex', alignItems: 'flex-end' }}>
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{
                                backgroundColor: colorMap(value, 169, 204),
                                height: `${value * 4}px`,
                                width: `${100 / NUMBER_OF_POINTS}%`
                            }}
                        ></div>
                    ))}
                </div>
            </div>
        )
    }
}

const colorMap = (percent, start, end) => {
    const a = percent / 100;
    const b = (end - start) * a;
    const c = (b + start);
    return `hsl(${c}, 100%, 50%)`

}

const swap = (array, i, j) => {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
}

const newTrace = (array) => {
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


const addToTrace = (
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

const lastSorted = (trace) => {
    return trace[trace.length - 1].sortedIndices;
};

const BubbleSort = (nums) => {
    // Set up code for tracing the algorithm
    const trace = newTrace(nums);

    // Sorting Algorithm with trace capture
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length - i - 1; j++) {
            // Visualize: Comparing A[j] and A[j + 1]
            addToTrace(trace, nums, lastSorted(trace), [j, j + 1]);
            if (nums[j] > nums[j + 1]) {
                swap(nums, j, j + 1);
                // Visualize: Swap A[j] and A[j + 1]
                addToTrace(trace, nums, lastSorted(trace), [], [j, j + 1]);
            }
        }

        // Visualize: final value is sorted
        addToTrace(trace, nums, [
            ...lastSorted(trace),
            nums.length - 1 - i
        ]);
    }

    return trace;
};

const setInitialValues = () => {
    const row = [];
    for (let i = 0; i < NUMBER_OF_POINTS; i++) {
        row.push(Math.round(Math.random() * 100));
    }
    //const row = [99, 1, 98, 2, 97, 3, 96, 4, 95, 5];
    console.log(row);
    return row;
}

const setInitialClass = () => {
    const row = [];
    for (let i = 0; i < NUMBER_OF_POINTS; i++) {
        row.push(' ');
    }
    console.log(row)
    return row
}

const bubbleSortAnimations = (array) => {
    let array1 = array;
    const animations = []
    for (let i = 0; i < array1.length - 1; i++) {
        for (let j = 0; j < array1.length; j++) {
            if (array1[j] > array1[j + 1]) {
                animations.push([j, array1[j + 1]]);
                animations.push([j + 1, array1[j]])
                let temp = array1[j];
                array1[j] = array1[j + 1];
                array1[j + 1] = temp;
            }
        }
    }
    return animations;
}

const insertionSortAnimations = (array) => {
    const animations = []

    for (let i = 1; i < array.length; i++) {
        let j = i - 1
        let tmp = array[i]
        while (j >= 0 && array[j] > tmp) {
            array[j + 1] = array[j]
            j--
            animations.push([...array])
        }
        array[j + 1] = tmp
        animations.push([...array])
    }
    return animations;
}

const quickSortAnimation = (array) => {
    if (array.length < 2) {
        return array;
    }

    var pivot = array[0];
    var lesserArray = [];
    var greaterArray = [];

    for (var i = 1; i < array.length; i++) {
        if (array[i] > pivot) {
            greaterArray.push(array[i]);
        } else {
            lesserArray.push(array[i]);
        }
    }

    return quickSortAnimation(lesserArray).concat(pivot, quickSortAnimation(greaterArray));

}

function checkEqualArrays(array1, array2) {
    if (array1.length !== array2.length) {
        return false;
    }
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
}

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SorterVisualizer;

const createRange = (start, end) => {
    return [...Array(end - start).keys()].map((elem) => elem + start);
};

const HeapSort = (nums) => {
    const trace = newTrace(nums);

    // Helper functions to quickly access nodes
    const left = (i) => 2 * i + 1;
    const right = (i) => 2 * i + 2;
    const parent = (i) => Math.floor((i - 1) / 2);

    const maxHeapify = (array, i, heapsize) => {
        const leftChild = left(i);
        const rightChild = right(i);

        // Visualize: Compare parent and leftChild
        addToTrace(trace, array, lastSorted(trace), [i, leftChild]);

        let largest =
            leftChild < heapsize && array[leftChild] > array[i]
                ? leftChild
                : i;

        // Visualize: Compare largest and rightChild
        addToTrace(trace, array, lastSorted(trace), [largest, rightChild]);

        if (rightChild < heapsize && array[rightChild] > array[largest])
            largest = rightChild;

        if (largest !== i) {
            // Visualize: Select largest child and parent
            addToTrace(trace, array, lastSorted(trace), [], [i, largest]);

            swap(array, i, largest);

            // Visualize: Swap largest child and parent
            addToTrace(trace, array, lastSorted(trace), [], [i, largest]);

            maxHeapify(array, largest, heapsize);
        }
    };

    const BuildMaxHeap = (array) => {
        const start = Math.floor(array.length / 2);
        const heapsize = array.length;
        for (let i = start; i >= 0; i--) {
            maxHeapify(array, i, heapsize);
        }

        // Visualize: Mark heap as built
        addToTrace(
            trace,
            array,
            lastSorted(trace),
            [],
            [],
            [],
            createRange(0, array.length)
        );
    };

    const heapSort = (array) => {
        BuildMaxHeap(array);
        let heapsize = array.length;
        for (let i = array.length - 1; i > 0; i--) {
            // Visualize: Select Maximum
            addToTrace(trace, array, lastSorted(trace), [], [0, i]);

            swap(array, 0, i);
            heapsize -= 1;

            // Visualize: Swap with last element in heap
            addToTrace(trace, array, [...lastSorted(trace), i], [], [0, i]);

            maxHeapify(array, 0, heapsize);

            // Visualize: Heap created
            addToTrace(
                trace,
                array,
                lastSorted(trace),
                [],
                [],
                [],
                createRange(0, heapsize)
            );
        }
        addToTrace(trace, array, [...lastSorted(trace), 0]);
    };

    // Execute Heapsort
    heapSort(nums);
    return trace;
};
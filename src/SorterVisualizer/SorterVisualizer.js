import React, { Component } from 'react';
import BubbleSort from '../SortingAlgorithms/bubbleSort';
import QuickSort from '../SortingAlgorithms/quickSort'
import HeapSort from '../SortingAlgorithms/heapSort'
import InsertionSort from '../SortingAlgorithms/insertionSort'

class SorterVisualizer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            array: [],
            extraClass: '',
            sortMethod: 'bubble',
            amount: 100,
            speed: 10,
            running: false
        }
    }

    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        });

        if (event.target.name === 'amount') {
            this.setState({
                array: setInitialValues(event.target.value)
            })
        }

        console.log(this.state)
    }

    generateNewArray = () => {
        this.setState({
            array: setInitialValues(this.state.amount)
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
            case 'quick':
                this.runQuickSort();
                break;
            case 'heap':
                this.runHeapSort();
            default:
                break;
        }
    }

    runBubbleSort() {
        const trace = BubbleSort(this.state.array)

        this.renderSort(trace)
    }

    runHeapSort() {
        const trace = HeapSort(this.state.array)

        this.renderSort(trace)
    }

    runInsertionSort() {
        const trace = InsertionSort(this.state.array);

        this.renderSort(trace)
    }

    runQuickSort() {
        const trace = QuickSort(this.state.array)

        this.renderSort(trace)
    }

    /**
     * Renders the trace according to the current speed
     * @param {array} trace Array of objects to render
     */
    renderSort(trace) {
        console.log(trace)

        this.setState({ running: true })

        for (let i = 0; i < trace.length; i++) {
            setTimeout(() => {
                this.setState({ array: trace[i].array })

                if ((trace.length - 1) === i) {
                    this.setState({ running: false })
                }
            }, i * (100 / this.state.speed),
            )
        }
    }

    stopSort() {

    }

    componentDidMount() {
        const array = setInitialValues(this.state.amount);

        this.setState({ array });
    }

    render() {

        const array = this.state.array;

        return (
            <div>
                <div class="header">
                    <h1>Sorting Algorithm Visualizer</h1>
                </div>
                <div className="optionsContainer">

                    <button disabled={this.state.running} onClick={this.runSort}>Start</button>
                    {/* <button onClick={this.stopSort}>Stop</button> */}
                    <button title="" id="newArray" style={{}} onClick={() => this.generateNewArray()}>Shuffle</button>


                    <span className="customDropdown">
                        <select name="sortMethod" id="algorithm" value={this.state.value}
                            onChange={this.handleChange} >
                            <option value="bubble">Bubble Sort</option>
                            <option value="insertion">Insertion Sort</option>
                            <option value="heap">Heap Sort</option>
                            <option value="quick">Quick Sort</option>

                        </select>

                    </span>

                    <div className="inputCont">
                        <span>Amount</span>
                        <input min="1" max="10000" id="numberPoints" type="number" name="amount" value={this.state.amount} onChange={this.handleChange} />
                    </div>

                    <div className="inputCont">
                        <span>Speed</span>
                        <input min="1" name="speed" type="number" value={this.state.speed} onChange={this.handleChange} />
                    </div>

                </div>

                <div className="graphContainer" style={{ display: 'flex', alignItems: 'flex-end' }}>
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{
                                backgroundColor: colorMap(value, 169, 204),
                                height: `${value * 4}px`,
                                width: `${100 / this.state.amount}%`
                            }}
                        ></div>
                    ))}
                </div>
                <div>
                    <h4>Sorting Algorithm Visualizer</h4>
                    <p>This is a personal project to built an app to visualize sorting algorithms such as quick sort, merge sort, bubble sort and more.</p>
                    <p>The project is built on React, and utilizes JavaScript algorithms to visualize the sorting methods. To see my other work, check out my GitHub <a href="https://github.com/camc314" target="_blank">here.</a></p>
                </div>
            </div>
        )
    }
}

/**
 * Maps colour using a percentage between two points on a color wheel
 * @param {integer} percent 
 * @param {integer} start 
 * @param {integer} end
 * @returns {string} hsl color format at the percentage between the start and end points 
 */
const colorMap = (percent, start, end) => {
    const a = percent / 100;
    const b = (end - start) * a;
    const c = (b + start);
    return `hsl(${c}, 100%, 50%)`

}

/**
 * Generate a random set of initial values
 * @param {int} numberOfPoints Number of random points to be generated
 * @return {array} array of randomly generated points
 */
const setInitialValues = (numberOfPoints) => {
    const row = [];
    for (let i = 0; i < numberOfPoints; i++) {
        row.push(Math.round(Math.random() * 100));
    }
    //const row = [99, 1, 98, 2, 97, 3, 96, 4, 95, 5];
    console.log(row);
    return row;
}

/**
 * Checks that if both arrays are equal
 * @param {array} array1 
 * @param {array} array2 
 * @return {boolean} True if both arrays are equal
 */
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

/**
 * Generates a random integer from interval
 * @param {int} min 
 * @param {int} max 
 * @returns {int} random integer from the specified interval
 */
function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SorterVisualizer;

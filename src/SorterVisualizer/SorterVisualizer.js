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
            default:
                break;
        }
    }

    runBubbleSort() {
        console.log(this.state.array);
        let array = this.state.array;
        //let extraClass = this.state.extraClass;
        let a = bubbleSortAnimations(array)

        for (let i = 0; i < a.length - 1; i += 2) {

            setTimeout(() => {
                array[a[i][0]] = a[i][1];
                array[a[i + 1][0]] = a[i + 1][1];
                //extraClass[a[i+1]] = 'isActive';
                this.setState({ arrayAccess: i })
                this.setState({ array });

            }, i * ANIMATION_SPEED_MS);
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


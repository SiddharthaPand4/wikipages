import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import GraphService from './services/GraphService';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minYear: 0,
      maxYear: 0,
      data: {
        x: [],
        y: []
      }
    }
  }

  componentDidMount() {
  }

  submitForm = e => {
    if (this.state.minYear === 0 || this.state.maxYear === 0) {
      alert("Invalid Value");
      return;
    }

    GraphService.fetchData(this.state.minYear, this.state.maxYear)
        .then(res => {
          this.setState({
            data: res.data
          })
        })
        .catch(err => {
          alert("Something Went Wrong")
          console.log(err)
        })
  }


  render() {
    const graphData = {
      labels: this.state.data.x,
      datasets: [
        {
          label: 'No Of Titles Published Vs Year',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgb(194,27,78)',
          borderColor: 'rgb(194,27,78)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgb(194,27,78)',
          pointBackgroundColor: 'rgb(194,27,78)',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgb(194,27,78)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.data.y
        }
      ]
    };
    const graphOptions = {
      responsive: true,
      maintainAspectRatio: true,
      animation: {
        duration: 0
      },
      hover: {
        animationDuration: 0
      },
      responsiveAnimationDuration: 0,
      legend: {
        position: 'top'
      },
      scales: {
        xAxes: [{
          stacked: true,
          ticks: {
            beginAtZero: true
          }, scaleLabel: {
            display: true,
            labelString: "Years"
          }
        }],
        yAxes: [{
          stacked: true,
          ticks: {
            beginAtZero: true
          }, scaleLabel: {
            display: true,
            labelString: "No Of Titles"
          }
        }]
      },
      plugins: {
        datalabels: {
          display: true,

        }
      }
    };
    return (
        <div align={'center'}>
          <h3>
            Bar Graph Of Number of Titles published in a particular range
          </h3>
          <h5>Enter the range of years:-</h5>
          <label htmlFor="minYear">Starting Year:</label>
          <input type="number" id="max" name="minYear" onChange={event => {this.setState({minYear: event.target.value})}} /><br /><br />
          <label htmlFor="max">Last Year:</label>
          <input type="number" id="max" name="maxYear" onChange={event => {this.setState({maxYear: event.target.value})}} /><br /><br />
          <button onClick={this.submitForm}> Submit </button>
          <div style={{ margin: '5% 20% 20% 20%'}}>
            <Line data={graphData} options={graphOptions}/>
          </div>
        </div>
    );
  }
}

export default App;

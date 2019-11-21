import React from "react";
import echarts from "echarts";
import "./App.styl";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.eventChartRef = React.createRef();
  }
  componentDidMount() {
    const eventChart = echarts.init(this.eventChartRef.current);
    let option = {
      tooltip: {
        trigger: "item",
        formatter: "{b}:{c}"
      },
      dataZoom: {
        end: 100
      },
      xAxis: {
        data: [1, 2, 3]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          type: "bar",
          data: [1, 2, 3]
        }
      ]
    };
    eventChart.setOption(option);
  }
  render() {
    return (
      <div className="App">
        <nav className="App-nav">
          <div className="App-nav__title">winston browser</div>
          <ul className="App-nav__list nav-list">
            <li>Search</li>
            <li>Source Setup</li>
          </ul>
        </nav>

        <div className="search">
          <ul className="tabBar">
            <li>default1</li>
            <li>default2</li>
            <li>default3</li>
            <li>new</li>
          </ul>
          <div className="searchBar">
            <input type="text" />
            <span>时间选择器</span>
            <button>搜索</button>
          </div>
          <div>
            <div className="left"></div>
            <div className="right">
              <ul>
                <li>event</li>
                <li>chart</li>
              </ul>
              <div className="event">
                <div ref={this.eventChartRef}></div>
              </div>
              <div className="chart"></div>
              <div className="eventView"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

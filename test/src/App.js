import React from "react";
import echarts from "echarts";
import moment from "moment";
import "./App.styl";

import EventView from "./components/EventView.js";

// const quarterMs = 15 * 60 * 1000;
// const hourMs = 4 * quarterMs;
// const dayMs = 24 * hourMs;
// const monthMs = 30 * dayMs;
// const yearMs = 12 * monthMs;

const steps = {
  minutes10: {
    key: "minutes",
    val: 15
  },
  hour: {
    key: "hours",
    val: 1
  },
  day: {
    key: "days",
    val: 1
  },
  week: {
    key: "weeks",
    val: 1
  },
  month: {
    key: "months",
    val: 1
  },
  quarter: {
    key: "quarters",
    val: 1
  },
  year: {
    key: "years",
    val: 1
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.eventChartRef = React.createRef();

    this.state = {
      events: [
        {
          message: "hello world",
          from: "hoover",
          level: "info",
          tags: ["tag1", "tag2"],
          id: "723af600-0903-11ea-8eb5-41429d940592",
          token: "my-token",
          timestamp: "2019-11-17T06:28:19.424Z"
        },
        {
          data: "hello world",
          level: "info",
          tags: ["tag1", "tag2"],
          id: "73d0b130-0903-11ea-8eb5-41429d940592",
          token: "my-token",
          timestamp: "2019-11-17T06:28:22.083Z"
        },
        {
          message: "hello world",
          from: "hoover",
          level: "info",
          tags: ["tag1", "tag2"],
          id: "52a95650-0904-11ea-8eb5-41429d940592",
          token: "my-token",
          timestamp: "2019-11-17T06:34:35.957Z"
        }
      ],
      startTime: moment().subtract(100, "days"),
      endTime: moment(),
      step: steps.day
    };
  }
  componentDidMount() {
    this.setEventBar();
  }
  setEventBar() {
    const { startTime, endTime, events } = this.state;
    const eventChart = echarts.init(this.eventChartRef.current);
    const tiemDiff = endTime.diff(startTime);
    const duration = moment.duration(tiemDiff);
    const xAxis = [];
    const data = [];

    window.s1 = startTime;
    window.s2 = endTime;
    window.moment = moment;

    let tempTime = startTime.clone();
    let step = this.step;
    if (duration.asYears() > 3) {
      step = steps.year;
    } else if (duration.asMonths() > 12) {
      step = steps.month;
    } else if (duration.asWeeks() > 4) {
      step = steps.week;
    } else if (duration.asDays() > 1) {
      step = steps.day;
    } else if (duration.asHours() > 6) {
      step = steps.hour;
    } else {
      step = steps.minutes10;
    }

    xAxis.push(tempTime.clone());
    while (tempTime < endTime) {
      xAxis.push(tempTime.add(step.key, step.val).clone());
      data.push(0);
    }

    events.forEach(event => {
      for (let i = 0; i < xAxis.length - 1; i++) {
        if (moment(event.timestamp).isBetween(xAxis[i], xAxis[i + 1])) {
          data[i]++;
          break;
        }
      }
    });

    let option = {
      tooltip: {
        trigger: "item",
        formatter: "{b}:{c}"
      },
      dataZoom: {
        end: 100
      },
      xAxis: {
        data: xAxis.map(d => d.format("YY-MM-DD hh:mm"))
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          type: "bar",
          data: data
        }
      ]
    };
    eventChart.setOption(option);

    this.setState({
      step
    });
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
          {/* <ul className="tabBar">
            <li>default1</li>
            <li>default2</li>
            <li>default3</li>
            <li>new</li>
          </ul> */}
          {/* <div className="searchBar">
            <input type="text" />
            <span>时间选择器</span>
            <button>搜索</button>
          </div> */}
          <div>
            <div className="left"></div>
            <div className="right">
              {/* <ul>
                <li>event</li>
                <li>chart</li>
              </ul> */}
              <div className="event">
                <div ref={this.eventChartRef}></div>
              </div>
              <div className="chart"></div>
              <div className="eventView">
                <EventView events={this.state.events}></EventView>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

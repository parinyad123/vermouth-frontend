# Introduction

The Vermouth Frontend is a user-facing dashboard designed to present the results of a deep learning anomaly detection model for satellite data. Key features include:

- Weekly and Daily Anomaly Reports: Provides detailed summaries of anomaly data on a weekly and daily basis for various satellite telemetries.

- Anomaly Points Display: Visualizes anomaly points to highlight areas of concern.

- Statistical Charts: Offers statistical charts that enable users to analyze and understand the data more effectively.

This dashboard empowers users to monitor, investigate, and analyze telemetry anomalies with ease and precision.

# Install Tools
### 1. Vue-Axios :
[Vue-Axios](https://www.npmjs.com/package/vue-axios) is a small wrapper that integrates the axios HTTP client into Vue.js applications, making it easy to use axios within your Vue components. Essentially, it provides a way to globally register axios so that it can be accessed anywhere in your Vue application, without needing to import axios in every single component.

Install : `npm install --save axios vue-axios`

### 2. Splitpanes

[Splitpanes](https://madewithvuejs.com/splitpanes) is a Vue.js component that allows you to create resizable split views (panes). This is useful for building interfaces where you need draggable dividers to resize sections of the UI.

Install : `$ npm i splitpanes@legacy`

### 3. Plotly.js-dist

[Plotly.js-dist](https://www.npmjs.com/package/plotly.js-dist) is a distribution of Plotly.js, a graphing library that enables you to create interactive, high-quality charts and graphs in web applications. This particular package is a pre-built, ready-to-use version of Plotly.js that can be easily included in projects via npm. Plotly.js supports a wide variety of chart types, including line charts, bar charts, scatter plots, pie charts, and more.

Install : `$ npm install plotly.js-dist`


# Project Setup
This command sets up your project by downloading and installing all necessary libraries and tools specified in package.json. It ensures that your project has all the required packages to run correctly.

`$ npm install`

# Run Project
`$ npm run serve` : Starts a development server with hot-reload capability. 

OR

`$ npm run build` : Compiles the project for production use.


# Web Application Interfaces

## 1. Dashboard Summary 

### 1.1 Number of anomaly telemetry each satellite per a week

Represents a different satellite, displaying the number of anomalies detected in that week for each satellite.
![Reference Image recommendation user](/img/db_weekly.png)


### 1.2 Amount anomaly of telemetry parameters in daily

This part appears to be focused on displaying and filtering daily anomalies in satellite telemetry data. Here's a detailed breakdown of its features:
![Reference Image recommendation user](/img/db_daily.png)

- Filter:

    - Sub-Systems Filter: Allows users to filter anomalies based on specific subsystems of satellite (e.g., "TOP", "TT&C").

    - Telemetry Parameters Filter: Enables filtering based on specific telemetry parameters of Sub-Systems. In this example, parameters like "VIPUREF4A", "TIPUBARMSA", "TIPUIPUHKA", and "TIPUBARPAA" are selected.

- Date Range Selector:
    - Range, Multiple, and All Options: Users can select a range of dates, multiple specific dates, or all available dates.

    - Calendar: A calendar widget for selecting dates. The selected dates are highlighted, allowing users to specify the exact period they are interested in.


## 2.  Anomaly Chart

### 2.1 Search for Telemetry parameter of Satellite

The Search for Telemetry parameter of Satellite allows users to search telemetry parameters of satellites. It includes the following features:

![Reference Image recommendation user](/img/ch_filter.png)

- Filter:

    - Satellite Filter: Select specific satellites to narrow down the search.

    - Sub-Systems Filter: Filter anomalies based on different subsystems within the satellite.

    - Telemetry Filter: Choose specific telemetry parameters to focus the search on particular data points.

    - Frequency Filter: Adjust the frequency of data points to be analyzed (e.g., hourly, daily).

- Date Range Selector: 

    - Define the time period for which the anomaly and statistical data should be fetched.


### 2.2 Anomaly Chart Page

The Anomaly Chart page provides a detailed visualization and analysis of telemetry parameters. The key features include:

![Reference Image recommendation user](/img/ch_statistic.png)

1. Anomaly chart Display

- Average Data (Telemetry): Shows the average values of the selected telemetry parameters.

- Anomaly Levels: Points indicating different levels of anomalies:
    - Anomaly 1 (Low): Yellow points.
    - Anomaly 2 (Medium): Orange points.
    - Anomaly 3 (High): Red points. 

2. Statistical Data:

Provides comprehensive statistical measures, including:
- Count: Number of data points.

- Standard Deviation: Measure of data dispersion.
- Quartiles (Q1, Q2, Q3): Values dividing the data into quarters.
- Minimum: Smallest data value.
- Maximum: Largest data value.

3. Interactive Features:

![Reference Image recommendation user](/img/ch_detail.png)

- Information Display: Click on data points to view detailed information about the telemetry.

- Data Download: Click to download the data of the anomaly and statistical charts in CSV file format.


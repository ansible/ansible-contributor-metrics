# ansible-contributor-metrics

The web application provides a dashboard in terms of factual metrics system for the github projects managed by Ansible for content collections.

## Features

The application collects information about a Github repositories (and org.) along with the developers of the team, and aggregates the data across all projects into a single user interface.

Namely, there are 3 routes:

1. Collections
2. Developers
3. Analytics

### Collections

![](https://github.com/priyamsahoo/ansible-github-metrics/blob/doc-updates/screenshots/collections.gif)

- Shows tables for issues and pull requests and allows user to sort and filter data with a date ranges
- Displays collection insight in terms of number of issues opened/closed and number of PRs opened/closed/merged
- Provides details of Releases and Tags

### Developers

![](https://github.com/priyamsahoo/ansible-github-metrics/blob/doc-updates/screenshots/developers.gif)

- Shows the details of the developers in terms of their contributions to the observed repositories
- Overall contributions can be filtered according to different timelines

### Analytics

![](https://github.com/priyamsahoo/ansible-github-metrics/blob/doc-updates/screenshots/analytics.gif)

- Displays graphical representations of various Key Performance Indicators (KPIs) of the observed repositories
  (based on the latest data)
- Graphs are interactive in nature and thus dynamic filters can be applied

**Note:**

> This project is bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and designed with flavours of [Ant Design](https://ant.design/).

## How to use

- Prior to starting the application, make a _`.env`_ file and provide the github token and graphql endpoint

- To add repositories and developers of interest or to modify the existing list hop on to `src/data/repositories.js` or `src/data/users.js` and update the list accordingly.

In the project directory, you can run:

#### `npm start`

This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

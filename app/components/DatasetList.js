import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';
import Dataset from './Dataset'
import styles from './DatasetList.css';

class DatasetList extends Component {

  componentWillMount() { 
    if (this.props.datasets.length == 0) {
      this.props.history.push("/add") 
    }
  }

  render() {
    var resetMessage = ""
    if (this.props.resetTime) {
      var d = new Date(0);
      d.setUTCSeconds(this.props.resetTime)
      resetMessage = 
        <div className={styles.rateLimit}>
          {"Rate limit exceeded till " + d.toTimeString()}
        </div> 
    }
    return (
      <div className={styles.container}>
        <details open>
        <summary>Your Datasets</summary>
        <p>
        <em>Start</em> and <em>Stop</em> hydration as needed. 
        Hydrator will manage your <em>Twitter API Rate Limits</em> for you. 
        Click on the dataset for details.
        </p>
        </details>
        {resetMessage}
        <ul>
          {this.props.datasets.map(dataset => 
            <li key={dataset.id}>
              <Dataset {...dataset} 
                startHydration={this.props.startHydration}
                deleteDataset={this.props.deleteDataset} 
                stopHydration={this.props.stopHydration}
                setOutputPath={this.props.setOutputPath}
                exportCsv={this.props.exportCsv}
                csvExportStarted={dataset.csvExportStarted}
                numTweetIds={dataset.numTweetIds} 
                idsRead={dataset.idsRead}
                tweetsHydrated={dataset.tweetsHydrated}
                completed={dataset.completed} />
              </li>
          )}
        </ul>
        <br />
      </div>
    )
  }
}

export default DatasetList

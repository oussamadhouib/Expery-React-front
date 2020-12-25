import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Signup from './components/routes/Signup';
import Login from './components/routes/Login';
import { BrowserRouter, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { PrivateRoute } from './components/routing-utils/PrivateRoute';
import MyProfile from './components/routes/MyProfile';
import { connect } from 'react-redux';
// for file reader
import { render } from 'react-dom';
import { CsvToHtmlTable } from 'react-csv-to-table';
import ReactFileReader from 'react-file-reader';


const sampleData = `
Chrysler Imperial,14.7,8,440,230,3.23,5.345,17.42,0,0,3,4
Fiat 128,32.4,4,78.7,66,4.08,2.2,19.47,1,1,4,1
`;

const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated
  }
}

class PApp extends Component {
  state={
    csvData: null
  };
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
         
            <ReactFileReader 
                multipleFiles={false}
                fileTypes={[".csv"]} 
                handleFiles={this.handleFiles}>
                <button className='btn'>Upload</button>
            </ReactFileReader>
            <CsvToHtmlTable
              data={this.state.csvData || sampleData}
              csvDelimiter=","
              tableClassName="table table-striped table-hover"
            />

        
         
          <div className="container">
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            < PrivateRoute authed={this.props.isAuthenticated} path="/profile" component={MyProfile} />
          </div>
          <ToastContainer />
        </div>
      </BrowserRouter>
    );
  }
  handleFiles = files => {
    var reader = new FileReader();
    reader.onload =  (e) => {
      // Use reader.result
      this.setState({
        csvData: reader.result
      })
    }
    reader.readAsText(files[0]);
  }
}

const App = connect(mapStateToProps, {})(PApp)
//render(<App />, document.getElementById('root'));
export default App;

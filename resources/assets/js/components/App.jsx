import React from 'react';
import axios from 'axios';
import Detail from './Detail.jsx';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Loadable from 'react-loading-overlay';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { l: [], ld: false };
    }

    componentDidMount() {
        this.setState({ld: true});
        axios.get(`${basePath}/listing`)
            .then(r => this.setState({l: r.data, ld: false}));
    }

    renderList() {
        const { l } = this.state;
        const list = l.map(d => (
            <li key={d.id} className="list-group-item">
                <Link to={`/add/s/${d.id}?n=${d.name}`}>{d.name}</Link>
            </li>
        ));
        return list;
    }

    render() {
        const { ld } = this.state;
        return (
            <Router>
                <div className="row">
                    <div className="col-md-4 mt-3">
                        <div className="row">
                            <div className="col-md-12">
                                <Link to="/add" className="btn btn-sm btn-danger mb-2 float-right">Create</Link>
                            </div>
                            <div className="col-md-12">
                                <Loadable active={ld} animate={false} color={'#007bff'} spinner spinnerSize={'35px'}  background={'none'}>
                                    <ul className="list-group" style={{cursor: 'pointer'}}>
                                        {this.renderList()}
                                    </ul>
                                </Loadable>
                            </div>
                        </div>
                    </div>
                    <Switch>
                        <Route exact path="/add" render={props => <Detail {...props} create={true} />} />
                        <Route path="/add/s/:id" render={props => <Detail {...props} create={false} />} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
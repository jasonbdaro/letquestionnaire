import React from 'react';
import Question from './Question.jsx';
import axios from 'axios';
import uuid from 'uuid';
import Loadable from 'react-loading-overlay';

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sid: 0,
            sc: '',
            scc: '',
            qs: [{ uid: uuid(), q: '', a: '', b: '', c: '', d: '', c_a: '' }],
            qsc: [],
            dqs: [],
            l: false,
            msg: '',
        };

        this.addRow = this.addRow.bind(this);
        this.delRow = this.delRow.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleQInputChange = this.handleQInputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);        
    }

    componentWillReceiveProps(e) {
        const { create, match } = e;
        const p = new URLSearchParams(e.location.search);
        const sc = p.get('n');
        this.setState({dqs: [], l: true});
        if (create) {
            this.setState({
                sc: '',
                qs: [{ uid: uuid(), q: '', a: '', b: '', c: '', d: '', c_a: '' }],
                l: false,
                msg: '',
            });
        } else {
            axios.get(`${basePath}/sec`, {
                params: {
                    id: parseInt(match.params.id)
                }
            })
            .then(r => {
                const qs = r.data.map(d => {
                    return {...d, uid: uuid()};
                });
                this.setState({sc, qs, qsc: qs, scc: sc, l: false});
            });
            this.setState({sid: match.params.id, msg: ''});
        }
    }

    addRow() {
        const qs = [...this.state.qs];
        qs.push({ uid: uuid(), q: '', a: '', b: '', c: '', d: '', c_a: '' });
        this.setState({qs});
    }

    delRow(e) {
        const ar = [...this.state.qs];
        const uid = e.target.dataset.uid;
        const qs = ar.filter(d => d.uid !== uid);
        this.setState({qs});

        const { create } = this.props;
        if (!create) {
            const f = this.state.qs.find(d => d.uid === uid);
            if (f) {
                let dqs = [...this.state.dqs];
                if (dqs.length) {
                    dqs = dqs.filter(d => d.uid !== uid);
                }
                if (f.hasOwnProperty('id')) {
                    dqs.push({dlt: f.id});
                }
                this.setState({dqs});
            }
        }
    }

    handleInputChange(e) {
        const target = event.target;
        const type = target.type;
        const value = type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        });

        this.dirtyFields(name, value, type, true);
    }

    handleQInputChange(e) {
        const qs = [...this.state.qs];
        const target = e.target;
        const type = target.type;
        const uid = target.dataset.uid;
        const name = target.name;
        const value = type === 'checkbox' ? target.checked : target.value;
        
        const f = qs.find(d => d.uid === uid);
        const i = type === 'radio' ? {...f, c_a: value} : {...f, [name]: value};
        qs[qs.findIndex(d => d.uid === f.uid)] = i;
        this.setState({qs});

        this.dirtyFields(name, value, type, false, uid);
    }

    dirtyFields(name, value, type, ih, uid = '') {
        const { create } = this.props;
        if (!create) {
            const dqs = [...this.state.dqs];
            if (dqs.length) {
                const dt = ih ? dqs.find(d => d.hasOwnProperty('sid')) : dqs.find(d => d.uid === uid);
                if (dt) {
                    if (ih) {
                        const di = {...dt, [name]: value};
                        dqs[dqs.findIndex(d => d.hasOwnProperty('sid'))] = di;
                    } else {
                        const qs = [...this.state.qs];
                        const fqs = qs.find(d => d.uid === uid);
                        const di = type === 'radio' ? {...dt, id: fqs.id, c_a: value} : {...dt, id: fqs.id, [name]: value};
                        dqs[dqs.findIndex(d => d.uid === dt.uid)] = di;
                    }
                } else {
                    if (ih) {
                        const { sid } = this.state;
                        dqs.push({sid, [name]: value});
                    } else {
                        const qs = [...this.state.qs];
                        const fqs = qs.find(d => d.uid === uid);
                        const di = type === 'radio' ? {uid, id: fqs.id, c_a: value} : {uid, id: fqs.id, [name]: value};
                        dqs.push(di);    
                    }
                }
            } else {
                if (ih) {
                    const { sid } = this.state;
                    dqs.push({sid, [name]: value});
                } else {
                    const qs = [...this.state.qs];
                    const fqs = qs.find(d => d.uid === uid);
                    const di = type === 'radio' ? {uid, id: fqs.id, c_a: value} : {uid, id: fqs.id, [name]: value};
                    dqs.push(di);
                }
            }
            this.setState({dqs});
        }
    }

    handleClick() {
        const { create } = this.props;
        if (create) {
            this.create();
        } else {
            this.update();
        }
    }

    create() {
        const { sc, qs } = this.state;
        const qu = JSON.stringify(qs);
        this.setState({l: true});
        axios({
            url: `${basePath}/add`,
            method: 'post',
            data: { sc, qu }
        }).then(() => {
            this.setState({l: false, msg: 'Data successfully saved'});
            setTimeout(() => this.setState({msg: ''}), 1200);
        });
    }
    
    update() {
        const { dqs, sid } = this.state;
        const data = JSON.stringify(dqs);
        this.setState({l: true});
        axios({
            url: `${basePath}/update`,
            method: 'post',
            data: {sid, data},
        }).then(() => {
            axios.get(`${basePath}/sec`, {
                params: {
                    id: sid
                }
            })
            .then(r => {
                const qs = r.data.map(d => {
                    return {...d, uid: uuid()};
                });
                const { sc } = this.state;
                this.setState({qs, qsc: qs, scc: sc, l: false, dqs: [], msg: 'Data successfully saved'});
                setTimeout(() => this.setState({msg: ''}), 1200);
            });
        });
    }
    
    handleCancel() {
        const { qsc, scc } = this.state;
        this.setState({dqs: [], qs: qsc, sc: scc });
    }
    
    handleClickDelete() {
        const { sid } = this.state;
        if (confirm('Are you sure you want to delete all the data?')) {
            axios({
                url: `${basePath}/delete`,
                method: 'post',
                data: {sid},
            });
        }
    }

    renderQuestions() {
        const { qs, dqs } = this.state;
        const { create } = this.props
        if (create) {
            return qs.map((d, i) => (
                <Question key={d.uid} {...d} delRow={this.delRow} onChange={this.handleQInputChange} i={i} dqs={dqs} />
            ));
        }
        return qs.map((d, i) => (
            <Question key={d.uid} {...d} delRow={this.delRow} onChange={this.handleQInputChange} i={i} dqs={dqs} i_n={!d.hasOwnProperty('id')} />
        ));
    }

    renderSave() {
        const { sc, qs, dqs, msg } = this.state;
        const { create } = this.props;
        if (qs.length === 0) {
            return null;
        }        
        const s = sc.length > 3;
        const q = qs.find(d => d.q.length < 5);
        const a = qs.find(d => d.a === '');
        const b = qs.find(d => d.b === '');
        const c = qs.find(d => d.c === '');
        const c_a = qs.find(d => d.c_a === '');
        const con = s && !q && !a && !b && !c && !c_a && qs.length;
        if (create && con) {
            return (
                <div>
                    <button type="button" onClick={this.handleClick} className="btn btn-sm btn-primary mt-2 mb-2">Save Data</button>
                    {msg && <span className="text-success ml-2">&#10003; {msg}</span>}
                </div>
            );
        }
        if (con) {
            if (dqs.length) {
                return (
                    <div>
                        <button type="button" onClick={this.handleClick} className="btn btn-sm btn-primary mt-2 mb-2">Save Changes</button>
                        <button type="button" onClick={this.handleCancel} className="btn btn-sm btn-secondary ml-1 mt-2 mb-2">Cancel Changes</button>
                        {msg && <span className="text-success ml-2">&#10003; {msg}</span>}
                    </div>
                );
            } else {
                return (
                    <div>
                        <button type="button" className="btn btn-sm btn-primary mt-2 mb-2" disabled>Save Changes</button>
                        <button type="button" className="btn btn-sm btn-secondary ml-1 mt-2 mb-2" disabled>Cancel Changes</button>
                        {msg && <span className="text-success ml-2">&#10003; {msg}</span>}
                    </div>
                );
            }
        }
        return (
            <button type="button" className="btn btn-sm btn-primary mt-2 mb-2" disabled>Save Data</button>
        );
    }

    renderDelete() {
        const { create } = this.props;
        if (!create) {
            return (
                <button type="button" onClick={this.handleClickDelete} className="btn btn-sm btn-danger" title="Delete all data">X</button>
            );
        }
    }

    renderDirtyField() {
        const { dqs } = this.state;
        const f = dqs.find(d => d.hasOwnProperty('sid'));
        if (f) {
            return (
                <span className="dirty-field" title="This field has changed"></span>
            );
        }
    }
    
    render() {
        const { sc, qs, l } = this.state;
        return (
            <div className="col-md-8 mt-3">
                <div className="input-group input-group-sm mb-1">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-default">Section Name</span>
                    </div>
                    {this.renderDirtyField()}
                    <input type="text" onChange={this.handleInputChange} value={sc} name="sc" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                    <div className="input-group-append">
                        <button type="button" onClick={this.addRow} class="btn btn-sm btn-secondary">{qs.length ? `Add Question (${qs.length})` : 'Add Question'}</button>
                        {this.renderDelete()}
                    </div>
                </div>
                <Loadable active={l} animate={false} color={'#007bff'} spinner spinnerSize={'35px'}  background={'none'}>
                    {this.renderQuestions()}
                </Loadable>
                {this.renderSave()}
            </div>
        );
    }
}

export default Detail;
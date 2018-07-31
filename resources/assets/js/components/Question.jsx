import React from 'react';
import Options from './Options.jsx';

class Question extends React.Component {
    constructor(props) {
        super(props);        
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        this.props.onChange(e);
    }

    renderDirtyField() {
        const { dqs, uid, i_n } = this.props;
        const f = dqs.find(d => d.uid === uid && d.hasOwnProperty('q'));
        if (f && !i_n) {
            return (
                <span className="dirty-field" title="This field has changed"></span>
            );
        }
    }

    render() {
        const { q, a, b, c, d, c_a, uid, i, delRow, dqs, i_n } = this.props;
        return (
            <div className="row mb-2">
                <div className="col-md-6">
                    <div className="input-group input-group-sm">
                        <div className="input-group-prepend">
                            <span className={i_n ? 'input-group-text bg-secondary text-white' : 'input-group-text'} >{`Q${i+1}`}</span>
                        </div>
                        {this.renderDirtyField()}
                        <textarea onChange={this.handleInputChange} value={q} data-uid={uid} name="q" className="form-control" rows="7" aria-label="With textarea" 
                            style={{marginTop:0,marginBottom:0,height:'136px'}}></textarea>
                    </div>
                </div>
                <Options a={a} b={b} c={c} d={d} chg={this.handleInputChange} n={uid} c_a={c_a} dqs={dqs} i_n={i_n} />
                <div className="col-md-1">
                    <button type="button" onClick={e => delRow(e)} data-uid={uid} className="close">&times;</button>
                </div>
            </div>
        );
    }
}

export default Question;
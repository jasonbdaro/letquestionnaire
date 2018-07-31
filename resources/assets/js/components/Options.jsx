import React from 'react';

class Options extends React.Component {
    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        this.props.chg(e);
    }

    renderDirtyField(nm, ir = true) {
        const { dqs, n, c_a, i_n } = this.props;
        if (i_n) {
            return null;
        }

        if (ir) {
            const f = dqs.find(d => d.uid === n && d.hasOwnProperty('c_a'));
            if (c_a === nm && f) {
                return (
                    <span className="dirty-field" title="This field has changed"></span>
                );
            }
        } else {
            const f = dqs.find(d => d.uid === n && d.hasOwnProperty(nm));
            if (f) {
                return (
                    <span className="dirty-field" title="This field has changed"></span>
                );
            }
        }
    }

    render() {
        const { a, b, c, d, n, c_a } = this.props;
        return (
            <div className="col-md-5">
                <div className="input-group input-group-sm mb-1">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-default">A</span>
                    </div>
                    {this.renderDirtyField('a', false)}
                    <input onChange={this.handleInputChange} value={a} data-uid={n} name="a" type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                    <div class="input-group-append">
                        {this.renderDirtyField('a')}
                        <div class="input-group-text">
                            <input type="radio" onChange={this.handleInputChange} name={n} value={'a'} data-uid={n} aria-label="Radio button for following text input" checked={c_a === 'a'} />
                        </div>
                    </div>
                </div>
                <div className="input-group input-group-sm mb-1">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-default">B</span>
                    </div>
                    {this.renderDirtyField('b', false)}
                    <input onChange={this.handleInputChange} value={b} data-uid={n} name="b" type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                    <div class="input-group-append">
                        {this.renderDirtyField('b')}
                        <div class="input-group-text">
                            <input type="radio" onChange={this.handleInputChange} name={n} value={'b'} data-uid={n} aria-label="Radio button for following text input" checked={c_a === 'b'} />
                        </div>
                    </div>
                </div>
                <div className="input-group input-group-sm mb-1">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-default">C</span>
                    </div>
                    {this.renderDirtyField('c', false)}
                    <input onChange={this.handleInputChange} value={c} data-uid={n} name="c" type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                    <div class="input-group-append">
                        {this.renderDirtyField('c')}
                        <div class="input-group-text">
                            <input type="radio" onChange={this.handleInputChange} name={n} value={'c'} data-uid={n} aria-label="Radio button for following text input" checked={c_a === 'c'} />
                        </div>
                    </div>
                </div>
                <div className="input-group input-group-sm mb-1">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-default">D</span>
                    </div>
                    {this.renderDirtyField('d', false)}
                    <input onChange={this.handleInputChange} value={d} data-uid={n} name="d" type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                    <div class="input-group-append">
                        {this.renderDirtyField('d')}
                        <div class="input-group-text">
                            <input type="radio" onChange={this.handleInputChange} name={n} value={'d'} data-uid={n} aria-label="Radio button for following text input" checked={c_a === 'd'} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Options;
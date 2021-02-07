import {Component} from "react";

class InvoiceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerId : 1,
            payment : 'CASH',
            items: []
        }

        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(event) {
        const target = event.target;
        let value = target.value
        if (target.multiple) {
            value = []
            for (const option of target.selectedOptions) {
                value.push({productId: option.value})
            }
        }
        const name = target.name
        this.setState( { [name]: value} );
    }

    render() {
        return (
            <form className="row">
                <div className="col-12 col-sm-6">
                    <div className="form-group">
                        {JSON.stringify(this.state)}
                        <label htmlFor="user-id">Seleciona un Cñiente</label>
                        <select className="custom-select" id="user-id" name="customerId" onChange={this.handleInputChange}>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                </div>

                <div className="col-12 col-sm-6">
                    <div className="form-group">
                        <label htmlFor="products">Selecciona uno o más productos</label>
                        <select multiple={true} className="custom-select" id="products" name="items" onChange={this.handleInputChange}>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                </div>

                <div className="col-12">
                    <div className="form-group">

                        <div className="custom-control custom-radio">
                            <input type="radio" id="payment1" name="payment" value="CARD" className="custom-control-input"  onChange={this.handleInputChange}/>
                            <label className="custom-control-label" htmlFor="payment1">Tarjeta</label>
                        </div>

                        <div className="custom-control custom-radio">
                        <input type="radio" id="payment2" name="payment" className="custom-control-input" value="CASH" checked={this.state.payment === 'CASH'} onChange={this.handleInputChange}/>
                            <label className="custom-control-label" htmlFor="payment2">Efectivo</label>
                        </div>

                    </div>
                </div>
                <button className="btn btn-success">Crear Factura</button>
            </form>
        )
    }
}

export default InvoiceForm

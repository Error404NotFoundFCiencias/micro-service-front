import {Component} from "react";
import users from '../../users.json'
import products from "../../products.json";

import './InvoiceForm.css'

class InvoiceForm extends Component {
    constructor(props) {
        super(props);

        const items = products.map( product => (
            {
                quantity: 0,
                price: product.price,
                productId: product.id
            }
        ))

        this.state = {
            customerId : -1,
            payment : 'CASH',
            items: items,
            cards: []
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmmit = this.handleSubmmit.bind(this)
    }

    handleSubmmit(event) {
        event.preventDefault()
        let state = this.state
        state.items = state.items.filter(item => item.quantity > 0)
        delete state.cards
        alert(JSON.stringify(state))
    }

    handleInputChange(event) {
        let {name, value} = event.target
        if (name === 'customerId') {
            value = Number(value)
            const user = users.find(user => user.id === value)
            this.setState({cards: user?.cards})
        }
        this.setState( { [name]: value} );
    }

    handleItemsChange(i, event) {
        let newItems = this.state.items
        newItems[i].quantity = Number(event.target.value)
        this.setState( {items: newItems} )
    }

    render() {
        const inputProducts = products.map((product,i) => (
            <li className="list-group-item p-0 border-0" key={product.id}>
                <div className="form-group">
                    <label htmlFor={'product-' + product.id} className="d-flex justify-content-between align-items-end">
                        {product.description}
                        <span className="badge badge-dark">{product.category.name}</span>
                    </label>
                    <div className="input-group">

                        <input type="number"
                               min="0"
                               max={product.stock}
                               value={this.state.items[i].quantity}
                               name="items"
                               className="form-control" id={'product-' + product.id}
                               onChange={this.handleItemsChange.bind(this,i)}
                        />
                        <div className="input-group-append">
                            <span className="input-group-text">${product.price * (this.state.items[i].quantity || 1)}</span>
                        </div>
                    </div>
                </div>
            </li>
        ))

        const customers = users.map(customer => (
            <li className="list-group-item p-0" key={customer.id}>
                <input type="radio" id={'customer-' + customer.id}
                       name="customerId" value={customer.id}
                       onChange={this.handleInputChange}/>
                <label htmlFor={'customer-' + customer.id} className="d-flex justify-content-between align-items-center">
                    <div>
                        {customer.firstName} {customer.lastName}
                        <p className="text-muted">{customer.email}</p>
                        <p>{customer.cards.length > 0
                            ? customer.cards.length + ' targetas'
                            : 'Este usuario no tiene tarjetas.'}</p>
                    </div>
                    <i className="bi bi-person-circle"/>
                </label>
            </li>
        ))

        const cards = this.state.cards.map(x => (
            <li className="list-group-item p-0" key={x.id}>
                <input type="radio"
                        name="cardId"
                       value={x.id}
                       onChange={this.handleInputChange}
                       id={'card-' + x.id}/>
                <label htmlFor={'card-' + x.id}>
                    <p>{'**** '.repeat(3) + x.number.slice(-4)}</p>
                    <p>{x.name}</p>
                    <p>{x.expDate.slice(0,10)}</p>
                    <p>{x.bank.name}</p>
                </label>
            </li>
        ))

        return (
            <form className="row" onSubmit={this.handleSubmmit}>
                <div className="col-12">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <a className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" href="#pills-home"
                               role="tab" aria-controls="pills-home" aria-selected="true">Usuario</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" href="#pills-profile"
                               role="tab" aria-controls="pills-profile" aria-selected="false">Productos</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" href="#pills-contact"
                               role="tab" aria-controls="pills-contact" aria-selected="false">Método de pago</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link" id="pills-description-tab" data-bs-toggle="pill" href="#pills-description"
                               role="tab" aria-controls="pills-description" aria-selected="false">Descripción</a>
                        </li>
                    </ul>
                </div>

                <div className="col-12">
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                             aria-labelledby="pills-home-tab">
                            <FormControl title="Selecciona un usuario" id="user-control" >
                                <ul className="list-group">
                                    {customers}
                                </ul>
                            </FormControl>
                        </div>
                        <div className="tab-pane fade" id="pills-profile" role="tabpanel"
                             aria-labelledby="pills-profile-tab">
                            <FormControl title="Selecciona tus productos:" id="product-control">
                                <ul className="list-group">
                                    {inputProducts}
                                </ul>
                            </FormControl>
                        </div>
                        <div className="tab-pane fade" id="pills-contact" role="tabpanel"
                             aria-labelledby="pills-contact-tab">
                            { this.state.customerId !== -1 &&
                            <FormControl title="Selecciona el método de pago" id="payment-control">
                                <div className="custom-control ">
                                    <input type="radio" id="payment2"
                                           name="payment" value="CASH" checked={this.state.payment === 'CASH'}
                                           onChange={this.handleInputChange}/>
                                    <label className="pt-2" htmlFor="payment2"><i
                                        className="bi bi-cash text-light"/> Efectivo</label>
                                </div>

                                {this.state.cards.length > 0
                                    ? <div className="custom-control">
                                        <input type="radio" id="payment1" name="payment" value="CARD"
                                               onChange={this.handleInputChange}/>
                                        <label className="pt-2" htmlFor="payment1"><i
                                            className="bi bi-credit-card-fill text-light"/>Tarjeta</label>
                                    </div>
                                    : <p className="text-muted mt-2">No hay más métodos de pago disponibles.</p>}
                            </FormControl>}

                            {this.state.cards.length > 0 && this.state.payment === 'CARD' &&
                            <FormControl title="Elige tu tarjeta" id="card-control">
                                <ul className="list-group">
                                    {cards}
                                </ul>
                            </FormControl>}
                        </div>

                        <div className="tab-pane fade" id="pills-description" role="tabpanel"
                             aria-labelledby="pills-description-tab">
                            <FormControl title="Descripción de la factura">
                                <textarea className="form-control" id="description" name="description" rows="3" value={this.state.description} onChange={this.handleInputChange}/>
                            </FormControl>

                            <div className="col d-flex mt-2">
                                <button className="btn btn-success ml-auto" type="submit">
                                    Crear Factura
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </form>

        )
    }
}

function FormControl(prop) {
    return (
        <div className="col-12">
            <div className="form-group">
                <h3 className="my-4">{prop.title}</h3>
                {prop.children}
            </div>
            <hr/>
        </div>
    )
    
}

export default InvoiceForm

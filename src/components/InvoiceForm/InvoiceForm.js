import {Component} from "react";

import './InvoiceForm.css'

import {createInvoice, getProducts, getUsers} from "../../api";

class InvoiceForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customerId : -1,
            payment : 'CASH',
            items: [],
            cards: [],
            products: [],
            users: []
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmmit = this.handleSubmmit.bind(this)
    }

    createId() {
   let chatSet = 'ABCDEFGHIJKLMNOPQRSTUVWXY123456789'
   let result = ''
   for (let i = 0; i < 12; i++) {
   result += chatSet[ Math.floor(Math.random() * 12) ]
   }
   return result
   }

componentDidMount() {
        getProducts().then(({data}) => {
            const items = data.map(product => ({quantity: 0, price: product.price, productId: product.id}))
            this.setState({items: items, products: data});
        }).catch(e => alert(JSON.stringify(e)))
        getUsers().then(({data}) => this.setState({users: data}))
            .catch(e => console.error(e))
    }

    handleSubmmit(event) {
        event.preventDefault()
        let state = this.state
        state.items = state.items.filter(item => item.quantity > 0)
        delete state.users
        delete state.products
        delete state.cards
        state.numberInvoice = this.createId()
        createInvoice(state).then(() => alert('Creada con exito'))
    }

    handleInputChange(event) {
        let {name, value} = event.target
        if (name === 'customerId') {
            const user = this.state.users.find(user => user.id === Number(value))
            this.setState({cards: user?.cards})
        }
        this.setState( { [name]: value} );
    }

    handleItemsChange(i, event) {
        let newItems = this.state.items
        newItems[i].quantity = event.target.value
        this.setState( {items: newItems} )
    }

    render() {
        const inputProducts = this.state.products.map((product,i) => (
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

        const customers = this.state.users.map(customer => (
            <li className="list-group-item p-0" key={customer.id}>
                <input type="radio" id={'customer-' + customer.id}
                       name="customerId" value={customer.id}
                       onChange={this.handleInputChange}/>
                <label htmlFor={'customer-' + customer.id} className="d-flex justify-content-between align-items-center">
                    <div>
                        {customer.firstName} {customer.lastName}
                        <p className="text-muted">{customer.email}</p>
                        <p>{customer.cards.length > 0
                            ? customer.cards.length + ' tarjetas'
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
                    <p>Saldo: ${x.balance}</p>
                    <p>{x.bank.name}</p>
                </label>
            </li>
        ))

        return (
            <form className="row" onSubmit={this.handleSubmmit}>
                <div className="col-12">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <Tab title="Usuario" to="pills-home" appendClass="active"/>
                        <Tab title="Productos" to="pills-profile"/>
                        <Tab title="Método de pago" to="pills-contact"/>
                        <Tab title="Descripción" to="pills-description"/>
                    </ul>
                </div>

                <div className="col-12">
                    <div className="tab-content" id="pills-tabContent">

                        <TabPanel appendClass="show active" id='pills-home'>
                            <FormControl title="Selecciona un usuario" id="user-control" >
                                <ul className="list-group">
                                    {customers}
                                </ul>
                            </FormControl>
                        </TabPanel>

                        <TabPanel id='pills-profile'>
                            <FormControl title="Selecciona tus productos:" id="product-control">
                                <ul className="list-group">
                                    {inputProducts}
                                </ul>
                            </FormControl>
                        </TabPanel>

                        <TabPanel id="pills-contact">
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
                        </TabPanel>

                        <TabPanel id='pills-description'>
                            <FormControl title="Descripción de la factura">
                                <textarea className="form-control" id="description" name="description" rows="3" value={this.state.description} onChange={this.handleInputChange}/>
                            </FormControl>
                            <div className="col d-flex mt-2">
                                <button className="btn btn-success ml-auto" type="submit">
                                    Crear Factura
                                </button>
                            </div>
                        </TabPanel>
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

function Tab(prop) {
    return (
        <li className="nav-item" role="presentation">
            <a className={"nav-link " + prop.appendClass} id={prop.to + "-tab"} data-bs-toggle="pill" href={'#' + prop.to}
               role="tab" aria-controls={prop.to} aria-selected="true">{prop.title}</a>
        </li>
    )
}

function TabPanel(prop) {
    return (
        <div className={"tab-pane fade " + prop.appendClass} id={prop.id} role="tabpanel"
             aria-labelledby={prop.id + '-tab'}>
            {prop.children}
        </div>
    )
}

export default InvoiceForm

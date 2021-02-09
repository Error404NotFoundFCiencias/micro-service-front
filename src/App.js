import './App.css';
import InvoiceForm from "./components/InvoiceForm/InvoiceForm";
import Invoice from "./components/Invoice/Invoice";
import {getInvoices} from './api'
import {Component} from 'react'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = { invoices: [] }
    }

    componentDidMount() {
        getInvoices().then(({data}) => this.setState({invoices: data}))
            .catch(e => console.error(e))
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-5 mb-3">
                    <div className="col">
                        <header>
                            <h2>Adminstrador de facturas</h2>
                        </header>
                    </div>
                </div>

                <div className="row">
                    <div className="col border p-4 shadow">
                        <h2>Agregar</h2>
                        <InvoiceForm/>
                    </div>
                </div>


                <div className="row mt-5">
                    <div className="col p-4 border shadow">
                        <h2>Facturas</h2>
                        {this.state.invoices.map(invoice => <Invoice data={invoice} key={invoice.id}/>)}
                    </div>
                </div>

            </div>
        )
    }
}

export default App;

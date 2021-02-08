import './App.css';
import invoices from "./data.json";
import InvoiceForm from "./components/InvoiceForm/InvoiceForm";
import Invoice from "./components/Invoice/Invoice";

function App() {
  return (
    <div className="container">
      <div className="row mt-5 mb-3">
          <div className="col">
              <header>
                  <h2>Adminstrador de facturas</h2>
              </header>
          </div>
      </div>
        <h2>Agregar</h2>
        <InvoiceForm/>
        <hr/>

        <h2>Facturas</h2>
        <div className="row">
            {invoices.map(invoice => <Invoice data={invoice} key={invoice.id}/>)}
        </div>

    </div>
  );
}

export default App;

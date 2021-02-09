import './Invoice.css'
import InvoiceItems from "../InvoiceItems";

function Invoice(props) {
    const {
        id,
        numberInvoice,
        description,
        createAt,
        payment,
        card,
        items
    } = props.data
    const total = items.reduce( (acc, i) => acc + i.subTotal,0)
    const hmtlId = 'item-' + id
    return (
        <div className="col-12">
            <div className="card text-white bg-primary mb-3">

                <div className="card-header d-flex">
                    <div>
                        <p>{createAt}</p>
                        <p>Id de la factura: #{numberInvoice}</p>
                    </div>
                </div>

                <div className="card-body">

                    <h4 className="card-title">
                        {description}
                    </h4>

                    <p className="card-text">Total: ${total}</p>

                    {payment === 'CARD'
                        ? <span><i className="bi bi-credit-card-fill text-info"/>Tarjeta {'**** '.repeat(3) + card.number}</span>
                        : <span><i className="bi bi-cash text-success"/>Efectivo</span>}


                    <br/>
                    <button className="btn btn-outline-light btn-sm my-3" type="button" data-bs-toggle="collapse"
                            data-bs-target={'#' + hmtlId}  aria-expanded="false" aria-controls={hmtlId}>
                        Ver detalles
                    </button>

                    <div className="collapse" id={hmtlId}>
                        <InvoiceItems data={items}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Invoice

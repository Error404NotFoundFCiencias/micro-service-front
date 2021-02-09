function InvoiceItems(props) {
    const items = props.data

    return (
        <div className="table-responsive">
            <table className="table table-sm table-hover table-light">
                <thead>
                <tr>
                    <th scope="col">Id producto</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Precio por unidad</th>
                    <th scope="col">Subtotal</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, i) => (
                    <tr key={i}>
                        <th scope="row">{item.id}</th>
                        <th>{item.product?.name}</th>
                        <th>{item.quantity}</th>
                        <th>{item.product?.price}</th>
                        <th>{item.subTotal}</th>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default InvoiceItems

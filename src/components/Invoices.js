import Card from "./Card";

function Invoices(props) {
    const invoices = props.data;
    return invoices.map(invoice => <Card data={invoice} key={invoice.id}/>);
}

export default Invoices

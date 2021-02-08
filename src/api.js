/*import axios from 'axios'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

let api = axios.create({baseURL: 'http://localhost:8080'})
let getProducts = async () => await api.get('/products');
let getUsers = async () => await api.get('/customers');
let createInvoice = async data => await api.post('/invoices',data)
let getInvoices = async () => await api.get('/invoices')*/
import users from "./users.json";
import products from './products.json'
import invoices from "./data.json";


let getProducts = async () => ({data: products})
let getUsers = async () => ({data: users})
let getInvoices = async () => ({data: invoices})
let createInvoice = async () => 'invoice created'


export {getProducts, getUsers, createInvoice, getInvoices}

import axios from 'axios'

let api = axios.create({baseURL: 'http://localhost:8080'})
let getProducts = async () => await api.get('/products');
let getUsers = async () => await api.get('/customers');
let createInvoice = async data => await api.post('/invoices',data, { headers: {'Access-Control-Allow-Origin': '*'}})
let getInvoices = async () => await api.get('/invoices')


export {getProducts, getUsers, createInvoice, getInvoices}

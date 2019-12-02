import React, { Component } from "react";
import { thisExpression } from "@babel/types";

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.onApplyFilter = this.onApplyFilter.bind(this)
        this.onResetFilter = this.onResetFilter.bind(this)

        this.state = {
            allProducts: [],
            products: [],
            isLoading: true,
            titleFilter: "",
            brandFilter: ""
        }

        fetch(`${this.props.proxy}/api/products/`, {
            method: 'GET', 
        }).then(response => {
            response.json().then(data => ({
            status: response.status,
            data: data
        })).then(obj => {
            if (obj.status !== 200)
                this.setState({error : obj.data.error})
            else
                this.setState({
                    allProducts: obj.data,
                    products: obj.data,
                    isLoading: false
                })
        })})
        
    }

    onResetFilter(event) {
        event.preventDefault()
        this.setState({
            brandFilter: "",
            titleFilter: "",
            products: this.state.allProducts
        })
    }

    onApplyFilter(event) {
        event.preventDefault()

        let products = []
        for(let i = 0; i < this.state.allProducts.length; i++) {
            let product = this.state.allProducts[i];
            if (this.state.titleFilter !== '')
                if (product.title.indexOf(this.state.titleFilter) === -1)
                    continue
            if (this.state.brandFilter !== '')
                if (product.brand.indexOf(this.state.brandFilter) === -1)
                    continue
            products.push(product)
        }

        this.setState({
            products: products
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        let products
        products = this.state.products.map(product => (
            <div className="col-sm-3 d-flex align-items-stretch" style={{marginBottom: "40px"}} key={product.title}>
                <div className='card'>
                    <img className='card-img-top' alt={product.title} style={{padding: "25px"}} src={product.image}/>
                    <div className='card-body'>
                        <h6 className='card-title'>{product.title}</h6>
                        <h6 className='card-title'>{product.brand}</h6>
                        <p className='card-text'>{product.price} UAH</p>
                    </div>
                </div>
            </div>
        ))
        return (
            <div className='body'>
                {this.state.isLoading !== false ? ("") : (
                    <div className='row'>
                        <div className='col-lg-2'>
                            <form onReset={this.onResetFilter} onSubmit={this.onApplyFilter}>
                                <h3>Filter</h3>
                                <hr/>
                                <div className='input-grop'>
                                    <label>Title</label>
                                    <input
                                        className='form-control'
                                        type='text'
                                        placeholder="Title"
                                        name='titleFilter'
                                        value={this.titleFilter}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className='input-grop'>
                                    <label>Brand</label>
                                    <input
                                        className='form-control'
                                        type='text'
                                        placeholder="Brand"
                                        name='brandFilter'
                                        value={this.brandFilter}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <button type='submit' style={{margin: "10px", marginLeft: "0px"}} className='btn btn-primary'>Apply</button>
                                <button type='reset' style={{margin: "10px", marginLeft: "0px"}} className='btn btn-info'>Reset</button>
                            </form>
                        </div>
                        <div className="col-lg-10">
                            <div className='row'>
                                {products}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

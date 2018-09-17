import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import axios from 'axios';
import ReactFileReader from 'react-file-reader';


class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: [],
            products: [],
            editable: false,
            pEditableId: null,
            creatable: false,
            categoryName: null,
            addCat: false,
            newCat: null,
            currentCat: null,
            newProduct: true,
            productName: null,
            productDescription: null,
            productBrand: null,
            productContent: [],
        };

        this.getCategories = this.getCategories.bind(this);
        this.getNewCatName = this.getNewCatName.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.updateProducts = this.updateProducts.bind(this);

        this.createProducts = this.createProducts.bind(this);
        this.getProductFile = this.getProductFile.bind(this);
        this.getProductName = this.getProductName.bind(this);
        this.getProductDescription = this.getProductDescription.bind(this);
        this.getProductBrand = this.getProductBrand.bind(this);
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories() {
        axios.get('api/category')
        .then(res => {
            this.setState({
                category: res.data.list
            });
        });
    }

    editCategories() {
        this.setState({
            editable: !this.state.editable ? true : false
        });
    }

    getNewCatName(data) {
        this.setState({
            categoryName: data.target.value
        });
    }


    updateCategories(id) {
        if (this.state.categoryName) {
            axios.post(`api/category/put`, {
                id: id,
                name: this.state.categoryName
            })
            .then(res => {
                this.setState({
                    categoryName: null,
                    editable: false,
                    category: res.data.list
                });
            })
        }
    }

    createCategories(parent) {
        axios.post(`api/category/add`, {
            name: this.state.categoryName,
            parent: parent
        })
        .then(res => {
            this.setState({
                category: res.data.list,
                categoryName: null,
                addCat: false
            });
        });
    }

    addCategory() {
        this.setState({
            addCat: !this.state.addCat ? true : false
        });
        if (this.state.categoryName) {
            this.createCategories();
        }
    }


    deleteCategories(id) {
        axios.post('api/category/delete', {
            id: id
        })
        .then(res => {
            this.setState({
                category: res.data.list
            });
        })
    }


    getProducts(id) {
        axios.get('api/product/' + id)
            .then(res => {
                this.setState({
                    currentCat: id,
                    products: res.data.list
                });
            })
    }

    updateProducts() {
        axios.get(`api/category`)
            .then(res => {
                const persons = res.data;
                this.setState({persons});
            })
    }


    ////////////////////////////////

    getProductName(event) {
        this.setState({
            productName: event.target.value
        });
    }

    getProductDescription(event) {
        this.setState({
            productDescription: event.target.value
        });
    }

    getProductBrand(event) {
        this.setState({
            productBrand: event.target.value
        });
    }

    createProducts() {
        axios.post('api/product/add', {
            name: this.state.productName,
            description: this.state.productDescription,
            brand: this.state.productBrand,
            file: this.state.productContent,
            category: this.state.currentCat?this.state.currentCat:1
        })
        .then(res => {
            this.setState({
                products: res.data.list,
                productName: null,
                productDescription: null,
                productBrand: null,
                productContent: [],
            });
        })
    }

    getProductFile(event) {

        if(this.state.productContent.length < 9){
            this.setState({
                productContent: [...this.state.productContent, event]
            });
        }
    }


    ////////////////


    deleteProduct(id) {
        axios.post(`api/product/delete`, {
            category: this.state.currentCat,
            id: id
        }).then(res => {
            this.setState({
                products: res.data.list
            });
        });
    }

    editProduct(id) {
        // let pEditableId = null;
        // if (pEditableId == id) {
        //     pEditableId = null;
        // } else {
        //     pEditableId = id;
        // }
        this.setState({
            pEditableId: id||null
        });
    }

    updateProductName(event) {
        let productIndex = -1;
        this.state.products.map((prod, i) => {
            if (prod.id == this.state.pEditableId) {
                productIndex = i;
            }
        });

        let products = this.state.products;
        products[productIndex].name = event.target.value;

        this.setState({
            products: products
        });
    }

    updateProductDescription(event) {
        let productIndex = -1;
        this.state.products.map((prod, i) => {
            if (prod.id == this.state.pEditableId) {
                productIndex = i;
            }
        });

        let products = this.state.products;
        products[productIndex].description = event.target.value;

        this.setState({
            products: products
        });
    }

    saveProductChanges() {
        let products = this.state.products;
        let productIndex = -1;
        this.state.products.map((prod, i) => {
            if (prod.id == this.state.pEditableId) {
                productIndex = i;
            }
        });
        let prodoct = products[productIndex];
        console.log(prodoct);
        axios.post(`api/product/put`, prodoct).then((res) => {
            this.setState({
                pEditableId: null
            });
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-4">
                        <div className="card-header bg-dark text-light">
                            <Link to="" className="btn btn-outline-info btn-sm pull-right">Categories</Link>
                            <Link to="" onClick={this.editCategories.bind(this)}>
                                <i className="fa fa-pencil-square-o" style={{float: 'right', fontSize: 31}}
                                   aria-hidden="true"></i>
                            </Link>
                            <Link to="" onClick={this.addCategory}>
                                <i className="fa fa-plus" style={{float: 'right', fontSize: 31, marginRight: 2}}
                                   aria-hidden="true"></i>
                            </Link>
                            <div className="clearfix"></div>
                        </div>
                        <ul className="list-group">
                            {this.state.category.map((category, key) => (
                                <li key={category.id} className="list-group-item">
                                    <span className="icon">
                                        <i style={{fontSize: 24, marginRight: 7, fontWeight: "bold"}} className="direction fa fa-angle-down"></i>
                                    </span>
                                    {this.state.editable ?
                                        <div style={{display: 'inline-block'}}>
                                            <input defaultValue={category.name} onChange={this.getNewCatName}/>
                                            <Link onClick={this.updateCategories.bind(this, category.id)} to="">
                                                <i className="fa fa-pencil-square-o" style={{float: 'right'}}
                                                   aria-hidden="true"></i>
                                            </Link>
                                        </div> :
                                        <Link to="" onClick={this.getProducts.bind(this, category.id)}>{category.name}</Link>

                                    }
                                    <Link to="" onClick={this.deleteCategories.bind(this, category.id)}>
                                        <i className="fa fa-trash" style={{float: 'right'}} aria-hidden="true"></i>
                                    </Link>
                                    <ul>
                                        {this.state.addCat ?
                                            <Link to="" onClick={this.createCategories.bind(this, category.id)}>
                                                <i className="fa fa-plus"
                                                   style={{float: 'right', marginTop: -28, marginRight: 16}}
                                                   aria-hidden="true"></i>
                                            </Link> : ""
                                        }
                                        {category.sub.map((sub, id) => (
                                            <li key={sub.id} className="list-group-item">
                                                <span className="icon">
                                                    <i style={{fontSize: 24, marginRight: 7, fontWeight: "bold"}}
                                                       className="direction fa fa-angle-right"></i>
                                                </span>
                                                {this.state.editable ?
                                                    <div>
                                                        <input defaultValue={sub.name} onChange={this.getNewCatName}/>
                                                        <Link onClick={this.updateCategories.bind(this, sub.id)} to="">
                                                            <i className="fa fa-pencil-square-o" style={{float: 'right'}} aria-hidden="true"></i>
                                                        </Link>
                                                    </div> :
                                                    <Link to="" onClick={this.getProducts.bind(this, sub.id)}>{sub.name}</Link>
                                                }
                                                <Link to="" onClick={this.deleteCategories.bind(this, sub.id)}>
                                                    <i className="fa fa-trash" style={{float: 'right'}}
                                                       aria-hidden="true"></i>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                            {this.state.addCat ? <input className="form-control" onChange={this.getNewCatName}/> : ""}
                        </ul>
                    </div>
                    <div className="col-12 col-sm-12 col-md-8">
                        <div className="card shopping-cart">
                            <div className="card-header bg-dark text-light">
                                <Link to="" className="btn btn-outline-info btn-sm pull-right">Products</Link>
                                <div className="clearfix"></div>
                            </div>
                            <div className="card-body">
                                {this.state.products.map((product, key) => (
                                    <div key={product.id}>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-12 col-sm-12 col-md-2 text-center">
                                                <img className="img-responsive" style={{height: 80, width: 80}} src="http://placehold.it/120x80" alt="prewiew" width="120" height="80"/>
                                            </div>
                                            <div className="col-12 text-sm-center col-sm-12 text-md-left col-md-4">
                                                <h4 className="product-name">
                                                    <strong>Name: {this.state.pEditableId == product.id ? (
                                                        <input className="form-control" type="text" defaultValue={product.name} onChange={this.updateProductName.bind(this)}/>
                                                        ) : product.name}
                                                    </strong>
                                                </h4>
                                                <h4>
                                                    <small>description:{this.state.pEditableId == product.id ? (
                                                        <input className="form-control" type="text" defaultValue={product.description} onChange={this.updateProductDescription.bind(this)}/>
                                                        ) : product.description}
                                                    </small>
                                                </h4>
                                            </div>
                                            <div className="col-12 col-sm-12 text-sm-center col-md-6 text-md-right row">
                                                <div className="col-3 col-sm-3 col-md-4 text-md-right"
                                                     style={{paddingTop: 5 + "px"}}>
                                                    <h6>
                                                        <strong>Content Count</strong><br/>
                                                        <strong>{product.attachment.length}</strong>
                                                    </h6>
                                                </div>
                                                <div className="col-3 col-sm-3 col-md-4">
                                                    <div className="quantity">
                                                        <strong>UPC</strong><br/>
                                                        <strong>{product.ubc}</strong>
                                                    </div>
                                                </div>
                                                <div className="col-1 col-sm-1 col-md-2 text-right">
                                                    {this.state.pEditableId == product.id ? (
                                                        <button type="button" className="btn btn-outline-success btn-xs"
                                                                onClick={this.saveProductChanges.bind(this)}>
                                                            <i className="fa fa-save" aria-hidden="true"></i>
                                                        </button>
                                                    ) : (
                                                        <button type="button" className="btn btn-outline-warning btn-xs"
                                                                onClick={this.editProduct.bind(this, product.id)}>
                                                            <i className="fa fa-edit" aria-hidden="true"></i>
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="col-1 col-sm-1 col-md-2 text-right">
                                                    <button type="button" className="btn btn-outline-danger btn-xs"
                                                            onClick={this.deleteProduct.bind(this, product.id)}>
                                                        <i className="fa fa-trash" aria-hidden="true"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <hr/>
                                    </div>
                                ))}

                                {this.state.newProduct ? (
                                    <div className="row">

                                        <div className="col-md-6">
                                            <span className="control-label">Name</span>
                                            <input  onChange={this.getProductName}  className="form-control"/>
                                        </div>

                                        <div className="col-md-6">
                                            <span className="control-label">Description</span>
                                            <input onChange={this.getProductDescription} className="form-control"/>
                                        </div>

                                        <div className="col-md-6">
                                            <span className="control-label">Brand</span>
                                            <input onChange={this.getProductBrand} className="form-control"/>
                                        </div>

                                        <div className="col-md-6">
                                            <span className="control-label">content {this.state.productContent.length}</span>
                                            <ReactFileReader base64={true} multipleFiles={false} handleFiles={files =>{ this.getProductFile(files.base64);}}>
                                                <button id="banner-image" type="button" className='btn'>Upload</button>
                                            </ReactFileReader>
                                        </div>

                                        {this.state.productContent.map(value => (
                                            <img style={{height:100}} src={value}/>
                                        ))}

                                    </div>
                                ) : ''}
                            </div>
                            <div className="card-footer">
                                <div className="pull-left" style={{margin: 10 + "px"}}>
                                    <button className="btn btn-success pull-right" onClick={this.createProducts}>Add
                                        Product
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}




export default connect(

)(Products);
const express = require('express')
const mongoose = require('mongoose');
const Product  = require('./models/product.models')
const ProductCategory = require('./models/product.category.models')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
const port = 3000

function errorResponse(res, error){
    res.status(500).json({
        status: false,
        message: error.message,
        response: []
    })
}

function customErrorResponse(res, errorMessage){
    res.status(404).json({
        status: false,
        message: errorMessage,
        response: []
    })
}

function goodResponse(res, message, responseData){
    res.status(200).json({
        status: true,
        message: message,
        response: responseData
    })
}

// Product
// =============================================================

// Get semua produk
app.get('/api/products', async (req, res) => {
  try {
    const product = await Product.find({})
    goodResponse(res, "Sukses mengambil data", product)
  } catch (error) {
    errorResponse(res, error)
  }
})

// Get produk berdasarkan id
app.get('/api/product/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        goodResponse(res, "Berhasil menemukan data", [product])
    } catch (error) {
        errorResponse(res, error)
    }
})

// Menambah produk baru
app.post('/api/products', async (req, res) => {
    try {
       const product = await Product.create(req.body)
       goodResponse(res, "Berhasil menambah produk", [])
    } catch (error) {
        errorResponse(res, error)
    }
})

// Update produk berdasarkan ID
app.put( '/api/product/:id', async (req, res) => {
     try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body)

        if(!product) {
            return res.status(404).json({
                status: false,
                message: "Produk tidak ditemukan",
                response: []
            })
        }
        const updateProduct = await Product.findById(req.params.id)
        goodResponse(res, "Sukses mengupdate data", [updateProduct])
     } catch (error) {
        errorResponse(res, error)
     }
})

// Hapus produk berdasarkan ID
app.delete( '/api/product/:id', async (req, res) => {
    try {
       const product = await Product.findByIdAndDelete(req.params.id)

       if(!product) {
           return res.status(404).json({
               status: false,
               message: "Produk tidak ditemukan",
               response: []
           })
       }
       goodResponse(res, "Berhasil menghapus data", [])
    } catch (error) {
        errorResponse(res, error)
    }
})

// Category Product
// =============================================================
// Menambah produk category baru
app.post('/api/add_products_category', async (req, res) => {
    try {
       const product = await ProductCategory.create(req.body)
       goodResponse(res, "Berhasil menambah produk category", [])
    } catch (error) {
        errorResponse(res, error)
    }
})


// Akhir dari Route API
// ============================================================

// koneksi ke mongoodb offline
mongoose.connect('mongodb://localhost:27017/Node-API')
    .then(() => {
        console.log('Terhubung dengan MongoDB');
        app.listen(port, () => {
            console.log(`RestAPI Projek berjalan di port ${port}`)
          })
    })
    .catch((err) => {console.log(`Failed to connect MongoDB ${err}`)});

// koneksi ke mongodb online
// mongoose.connect('mongodb+srv://craftgirlsssshopping:V417cceMCdbSS6TV@backenddb.dfj1h.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB')
//     .then(() => {
//         console.log('Terhubung dengan MongoDB');
//         app.listen(port, () => {
//             console.log(`RestAPI Projek berjalan di port ${port}`)
//           })
//     })
//     .catch((err) => {console.log(`Failed to connect MongoDB ${err}`)});
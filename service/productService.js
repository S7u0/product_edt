const product = require("../model/product");

async function productService() {
  try {
    const invalid = new product({
      productID: "TEST",
      productName: "Test",
      price: 20,
      category: "Electronics",
      stock: 120,
      supplierCity: "Surat",
    });

    try {
      await invalid.validate();
    } catch (error) {
      if (!error.errors?.marks) throw error;
      console.log(
        "Expected marks validation error:",
        error.errors.marks.message,
      );
    }

    const productExists = await product.exists({ productID: "TEST" });
    console.log("Invalid record inserted:", Boolean(productExists));

    // Create: omit isActive; Mongoose supplies its default of true.
    const products = [
      {
        productID: "P01",
        productName: "Keyboard",
        price: 1200,
        category: "Electronics",
        stock: 15,
        supplierCity: "Surat",
      },
      {
        productID: "P02",
        productName: "Mouse",
        price: 650,
        category: "Electronics",
        stock: 5,
        supplierCity: "Ahmedabad",
      },
      {
        productID: "P03",
        productName: "Notebook",
        price: 80,
        category: "Stationery",
        stock: 50,
        supplierCity: "Surat",
      },
      {
        productID: "P04",
        productName: "Headphones",
        price: 1800,
        category: "Electronics",
        stock: 0,
        supplierCity: "Vadodara",
      },
      {
        productID: "P05",
        productName: "Pen set",
        price: 150,
        category: "Stationery",
        stock: 8,
        supplierCity: "Rajkot",
      },
    ];
    const inserted = await product.insertMany(products);
    console.log("Inserted products:", inserted);

    const allProducts = await product.find();
    console.log("All products:", allProducts);

    const electronicsProducts = await product.find({ category: "Electronics" });
    console.log("Products of Electronics:", electronicsProducts);

    const highPrices = await product
      .find({ price: { $lte: 1000 } })
      .sort({ price: 1 });
    console.log("Prices at most 1000:", highPrices);

    // Read one record by its unique productID.
    const mouse = await product.findOne({ productID: "P02" });
    console.log("Found P02:", mouse);

    // Update one record and display the returned, updated product.
    const mouseUpdate = await product.findOneAndUpdate(
      { productID: "P02" },
      { $set: { price: 700 } },
      { returnDocument: "after", runValidators: true },
    );

    console.log("Updated P02:", mouseUpdate);

    // stationery products: increase stock by 10, and display the number of modified records.
    const updateResult = await product.updateMany(
      { category: "Stationery" },
      { $inc: { stock: 10 } },
      { runValidators: true },
    );
    console.log("Stationery products changed:", updateResult.modifiedCount);

    // Delete P04, then confirm it is absent.
    const deletedP04 = await product.findOneAndDelete({ productID: "P04" });
    console.log("Deleted P04:", deletedP04);
    const p04Exists = await product.exists({ productID: "P04" });
    console.log("P04 still exists:", Boolean(p04Exists));
  } catch (error) {
    console.error("Error in productService:", error);
  }
}

module.exports = { productService };

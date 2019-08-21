"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = require("./product.model");
const tests_1 = require("../../../../tests");
xdescribe('product', () => {
    beforeAll(tests_1.dbTools.connectToDB);
    beforeEach(tests_1.dbTools.cleanDB);
    afterEach(tests_1.dbTools.cleanDB);
    afterAll(tests_1.dbTools.disconnectDB);
    it('should get all', async () => {
        const products = [
            {
                productName: 'Stu1',
                productSku: '1fgsdf',
                productDescription: 'ThisIstestProductOne',
                productPrice: 14.99,
                productQuantity: 100
            },
            {
                productName: 'Stu2',
                productSku: '14568',
                productDescription: 'ThisIstestProductOne',
                productPrice: 12.99,
                productQuantity: 80
            },
            {
                productName: 'Stu3',
                productSku: '1HGgdfs',
                productDescription: 'ThisIstestProductOne',
                productPrice: 11.99,
                productQuantity: 700
            }
        ];
        await product_model_1.productModel.create(products);
        const { data, errors } = await tests_1.runQuery(`{
        getAllProducts(input:{limit:3,offset:0}) {
          products{
            productName
            productSku
            productDescription
            productPrice
            productQuantity
          }
        }
      }`, {}, { productModel: product_model_1.productModel });
        expect(errors).toBeUndefined();
        expect(data).tobeobject;
        expect(data.getAllProducts.products).toEqual(expect.arrayContaining(products));
    });
    it('should create one product', async () => {
        const product = {
            productName: 'Stu1',
            productSku: '1fgsdf',
            productDescription: 'ThisIstestProductOne',
            productPrice: 14.99,
            productQuantity: 100
        };
        const query = `mutation usr($input:NewProduct!){
         createProduct(input:$input) {
            productName
            productDescription
            productSku
            productPrice
            productQuantity
         }
       }`;
        const result = await tests_1.runQuery(query, {
            input: product
        }, { productModel: product_model_1.productModel });
        expect(result.errors).toBeUndefined();
        expect(result.data).tobeobject;
        expect(result.data.createProduct).toEqual(product);
    });
    it('should get one', async () => {
        const product = {
            productName: 'Stu1',
            productSku: '1fgsdf',
            productDescription: 'ThisIstestProductOne',
            productPrice: 14.99,
            productQuantity: 100
        };
        const val = await product_model_1.productModel.create(product);
        const query = `query usr($input:ProductIdInput!){
         getProduct(input:$input) {
            productName
            productSku
            productDescription
            productPrice
            productQuantity
         }
       }`;
        const result = await tests_1.runQuery(query, { input: { id: val._id + '' } }, { productModel: product_model_1.productModel });
        expect(result.errors).toBeUndefined();
        expect(result.data).tobeobject;
        expect(result.data.getProduct).toEqual(product);
    });
    it('should update one product', async () => {
        const product = {
            productName: 'Stu1',
            productSku: '1fgsdf',
            productDescription: 'ThisIstestProductOne',
            productPrice: 14.99,
            productQuantity: 100
        };
        const val = await product_model_1.productModel.create(product);
        const updateName = 'NameUpdated';
        const updateDescription = 'updated';
        const query = `mutation usr($input:UpdateProduct!){
         updateProduct(input:$input) {
            productName
        productDescription
         }
       }`;
        const result = await tests_1.runQuery(query, {
            input: {
                id: val._id + '',
                productName: updateName,
                productDescription: updateDescription
            }
        }, { productModel: product_model_1.productModel });
        expect(result.errors).toBeUndefined();
        expect(result.data).tobeobject;
        expect(result.data.updateProduct.productName).toEqual(updateName);
        expect(result.data.updateProduct.productDescription).toEqual(updateDescription);
    });
    it('should fail to  update one product', async () => {
        const product = {
            productName: 'Stu1',
            productSku: '1fgsdf',
            productDescription: 'ThisIstestProductOne',
            productPrice: 14.99,
            productQuantity: 100
        };
        const val = await product_model_1.productModel.create(product);
        const updateName = 'NameUpdated';
        const updateDescription = 'updated';
        const query = `mutation usr($input:UpdateProduct!){
         updateProduct(input:$input) {
            productName
        productDescription
         }
       }`;
        const result = await tests_1.runQuery(query, {
            input: {
                id: val._id + '456',
                productName: updateName,
                productDescription: updateDescription
            }
        }, { productModel: product_model_1.productModel });
        expect(result.errors).toBeDefined();
        expect(result.data).tobeNull;
    });
    it('should delete one product', async () => {
        const product = {
            productName: 'Stu1',
            productSku: '1fgsdf',
            productDescription: 'ThisIstestProductOne',
            productPrice: 14.99,
            productQuantity: 100
        };
        const val = await product_model_1.productModel.create(product);
        const query = `mutation usr($input:DeleteProduct!){
         deleteProduct(input:$input) {
            err
            id
         }
       }`;
        const result = await tests_1.runQuery(query, { input: { id: val._id + '' } }, { productModel: product_model_1.productModel });
        expect(result.errors).toBeUndefined();
        expect(result.data).tobeobject;
        expect(result.data.deleteProduct.id).toEqual(val._id + '');
        expect(result.data.deleteProduct.err).toBe(0);
    });
    it('should fail to delete one product', async () => {
        const product = {
            productName: 'Stu1',
            productSku: '1fgsdf',
            productDescription: 'ThisIstestProductOne',
            productPrice: 14.99,
            productQuantity: 100
        };
        const val = await product_model_1.productModel.create(product);
        const query = `mutation usr($input:DeleteProduct!){
         deleteProduct(input:$input) {
            err
            id
         }
       }`;
        const result = await tests_1.runQuery(query, { input: { id: val._id + 'i234' } }, { productModel: product_model_1.productModel });
        expect(result.errors).toBeDefined();
        expect(result.data).tobeNull;
    });
});
//# sourceMappingURL=product.spec.js.map
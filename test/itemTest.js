// Import the dependencies for testing

var chai = require('chai');
var chaiHttp = require('chai-http');
const { exists } = require('../model/items');
// var app = 'http://localhost:3000/api/v1/checklists';

const app = require('./../bin/www');

// Configure chai


// (node:17643) Warning: Setting the NODE_TLS_REJECT_UNAUTHORIZED environment variable to '0' 
// makes TLS connections and HTTPS requests insecure by disabling certificate verification.
// https://stackoverflow.com/questions/41572681/set-accepted-ca-list-and-ignore-ssl-errors-with-chai-http
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


chai.use(chaiHttp);
chai.use(require('chai-json-schema'));

var oneItemSchema = require('./schema/item/one.json');
let token = '6d7f3f6e-269c-4e1b-abf8-9a0add479511';

chai.should();

describe("Items API Test", () => {
    describe("Base URL : /api/v1/checklists/2/items", () => {
        
        // // Test to get all items record
        // it("Should get all items record for given checklist", (done) => {
        //      chai.request(app)
        //          .get('/')
        //          .end((err, res) => {
        //              res.should.have.status(200);
        //             //  res.body.to.be.jsonSchema();
        //              done();
        //           });
        // });
        
        // Test to get single item record
       it("Should get one item record for given checklist", (done) => {
            const id = 1;
             chai.request(app)
                 .get(`/2/items/${id}`)
                 .set({ "Authorization": `Bearer ${token}` })
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.jsonSchema(oneItemSchema);
                     done();
                  });
         });
    });
});
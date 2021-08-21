const app = require('./app');
const Todolist = require('./models/todolist');
// const assert = require('assert').strict;
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

describe("Server!", () => {
    it("get todolists", done => {
    chai.request(app)
        .get("/api/list")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
   });

   it("add a todolist", done => {
    chai.request(app)
        .post("/api/list")
        .send({ title: "first" })
        .end((err, res) => {
            res.should.have.status(201);
            done();
        });
    });

    it("add a task", done => {
        let todo = new Todolist({title: "first title"});
        todo.save((err, todo) => {
            chai.request(app)
            .get("/api/list/:id")
            .end((err,res) => {
                res.should.have.status(200);
                done();
            });
        });
    });

    it("delete a todolist", done => {
        chai.request(app)
            .get("api/list")
            .end((err,res) => {
                chai.request(app)
                .delete(`api/list/${res.body._id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
            });
        });
    });
});
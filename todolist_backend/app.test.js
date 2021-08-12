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

    it("get a single todolist", done => {
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

    it("update a task", done => {
        const update = {taskValue: "task updated!"};
        let todo = new Todolist({taskValue: "task to update"});
        todo.save((err, todo) => {
            chai.request(app)
            .put("api/list/:id")
            .send(update)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
        });
        //`api/list/${todo.id}`
    });
});
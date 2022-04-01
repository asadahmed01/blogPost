let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index.js");
chai.should();
chai.use(chaiHttp);

describe("Posts API", () => {
  /*
   * Test the GET route
   */
  describe("GET /posts", () => {
    it("it should get all the posts", (done) => {
      chai
        .request(server)
        .get("/posts")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });

  /*
   * Test the GET (by id) route
   */

  describe("GET /posts/:id", () => {
    it("it should get a post by ID", (done) => {
      const id = "62468a511c79b3abd351e299";
      chai
        .request(server)
        .get("/posts/" + id)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eq(1);
          done();
        });
    });

    it("it should return not found", (done) => {
      const id = "62468a511c79b3abd351e299kkkkkkk"; //invalid id
      chai
        .request(server)
        .get("/posts/" + id)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.a("object");

          done();
        });
    });
  });

  /*
   * Test the POST route
   */

  describe("POST /posts/create", () => {
    it("it should create the post", (done) => {
      chai
        .request(server)
        .post("/posts/create")
        .send({
          title: "post title",
          content: "this is the content",
          userId: 1,
          likes: [],
          comments: [],
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("msg").eql("success");
          done();
        });
    });
  });

  /*
   * Test the PUT (UPDATE) route
   */
  describe("PUT /posts/update/:id", () => {
    it("it should update the post with the id", (done) => {
      const id = "62468a511c79b3abd351e299";
      chai
        .request(server)
        .put("/posts/update/" + id)
        .send({
          title: "update post title",
          content: "this is updated content",
          userId: 1,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("msg").eql("the post has been updated");
          done();
        });
    });

    //Test updating a post from user that does not own the post

    it("it should NOT update the post with the id", (done) => {
      const id = "62468a511c79b3abd351e299";
      chai
        .request(server)
        .put("/posts/update/" + id)
        .send({
          title: "update post title",
          content: "this is updated content",
          userId: 2,
        })
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property("msg").eql("Access Denied!");
          done();
        });
    });
  });

  /*
   * Test the DELETE route
   */

  describe("DELETE /posts/delete/:id", () => {
    it("it should DELETE the post with the id", (done) => {
      const id = "6246a5417d846930fbeb44f5";
      chai
        .request(server)
        .put("/posts/delete/" + id)
        .send({
          userId: 1,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("msg").eql("the post has been deleted");
          done();
        });
    });
  });

  //Like A POST

  describe("PUT /posts/like/:id", () => {
    it("it should LIKE the post with the id", (done) => {
      const id = "62468a5a1c79b3abd351e29b";
      chai
        .request(server)
        .put("/posts/like/" + id)
        .send({
          userId: 6,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("msg").eql("liked!");
          done();
        });
    });
  });

  //Reply to a post
  describe("PUT /posts/reply/:id", () => {
    it("it should REPLY TO the post with the id", (done) => {
      const id = "62468a5a1c79b3abd351e29b";
      chai
        .request(server)
        .put(`/posts/reply/${id}`)
        .send({
          userId: 5,
          commentText: "this is a reply from user 5",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("msg").eql("replied!");
          done();
        });
    });
  });

  //UPDATE a reply with a given id

  describe("PUT /posts/reply/update/:id", () => {
    it("it should UPDATE the reply with the id", (done) => {
      const id = "6246c2d6b49d7c2a1d10c3dc";
      chai
        .request(server)
        .put(`/posts/reply/update/${id}`)
        .send({
          userId: 5,
          commentText: "this is a super UPDATED reply from user 5",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("msg").eql("success");
          done();
        });
    });
  });

  //DELETE A REPLY TO POST (reply id)

  describe("PUT /posts/reply/delete/:id", () => {
    it.only("it should DELTE the reply with the id", (done) => {
      const id = "6246c2d6b49d7c2a1d10c3dc";
      chai
        .request(server)
        .put(`/posts/reply/delete/${id}`)
        .send({
          userId: 5,
          commentText: "this is a super UPDATED reply from user 5",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("msg").eql("reply deleted");
          done();
        });
    });
  });
});

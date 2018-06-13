exports.install = function() {
	F.route('/api/puppies', getAllPuppies, ['get']);
  F.route('/api/puppies/{id}', getSinglePuppy, ['get']);
  F.route('/api/puppies', createPuppy, ['post']);
  F.route('/api/puppies/{id}', updatePuppy, ['put']);  //with this and delete you can remove the {id} and just pass it in the form data if you want
  F.route('/api/puppies/{id}', removePuppy, ['delete']);
};

function getAllPuppies() {
	var self = this;
	var sql = DB();

	sql.select('pupslist','pups').make(function(builder) {
		builder.sort('name');
	});

	sql.exec(function(err, response) {
		if (err)
			return self.throw500(err);
		self.json(response.pupslist);
    //console.log(response.pupslist);
	});
}

function getSinglePuppy(id) {
	var self = this;
	var sql = DB();

	sql.select('pupslist','pups').make(function(builder) {
		builder.where('id', id);
	});

	sql.exec(function(err, response) {
		if (err)
			return self.throw500(err);
		self.json(response.pupslist);
    //console.log(response.pupslist);
	});
}

function createPuppy(req,res) {
  var self = this;
  var sql = DB();
  sql.insert('pup','pups').make(function (builder) {
    builder.set(self.body);
  });
  //console.log(self.body);
  sql.exec(function (err,response) {
    if(err)
      return self.throw500(err);
      self.json('pup added');
  })

}

function updatePuppy(id) {
  var self = this;
  var sql = DB();
  sql.update('pup','pups').make(function (builder) {
    builder.set(self.body);
    builder.where('id', id);
  });
  //console.log(self.body);
  sql.exec(function (err,response) {
    if(err)
      return self.throw500(err);
      self.json('pup updated');
  })

}

function removePuppy(id) {
  var self = this;
  var sql = DB();
  sql.remove('pup','pups').make(function (builder) {
    builder.where('id', id);
  });
  //console.log(self.body);
  sql.exec(function (err,response) {
    if(err)
      return self.throw500(err);
      self.json('pup removed');
  })

}

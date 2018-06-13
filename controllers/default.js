exports.install = function() {
	F.route('/', view_homepage);
};

function view_homepage() {

	var self = this;
	var sql = DB();

	sql.select('pupslist','pups').make(function(builder) {
		builder.sort('name');
	});

	sql.exec(function(err, response) {
		if (err)
			return self.throw500(err);
		self.view('index', response.pupslist);
    console.log(response.pupslist);
	});
}

import React from 'react';

class Pagination extends React.Component {
	constructor() {
		super();
		this.state = { numberOfNotes: 0 };
	}

	render() {
		return (
			<div className="pagination">
				<div className="page-number">1</div>
				<div className="page-number">2</div>
				<div className="page-number">3</div>
			</div>
		);
	}
}

export default Pagination;

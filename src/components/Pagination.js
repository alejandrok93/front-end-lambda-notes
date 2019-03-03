import React from 'react';

class Pagination extends React.Component {
	constructor() {
		super();
		this.state = { numberOfNotes: 0, numberOfPages: 1 };
	}

	componentDidMount() {
		const numOfPages = Math.floor(this.props.numberOfNotes / 10);
		this.setState({
			numberOfNotes: this.props.numberOfNotes,
			numberOfPages: numOfPages
		});
	}

	render() {
		console.log(this.props);
		return (
			<div className="pagination">
				<div onClick={() => this.props.prevPage()} className="page-number">
					Prev
				</div>
				<div className="page-number">1</div>
				<div className="page-number">2</div>
				<div className="page-number">3</div>
				<div onClick={() => this.props.nextPage()} className="page-number">
					Next
				</div>
			</div>
		);
	}
}

export default Pagination;

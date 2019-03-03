import React from 'react';

class Pagination extends React.Component {
	constructor() {
		super();
		this.state = { numberOfNotes: 0, numberOfPages: 1 };
	}

	componentDidMount() {
		// const numOfPages = this.props.numberOfNotes / 10;
		// console.log(numOfPages);
		// console.log('hellooooooo');
		// console.log('number of notes: ' + this.props.numberOfNotes);
		// this.setState(
		// 	{
		// 		numberOfNotes: 100,
		// 		numberOfPages: numOfPages
		// 	},
		// 	this.addPageNumbers
		// );
	}

	addPageNumbers = () => {
		let pageNumbers = [];
		const numOfPages = this.props.numberOfNotes / 10;
		console.log(this.state);
		for (let i = 1; i <= numOfPages; i++) {
			pageNumbers.push(<div className="page-number">{i}</div>);
		}
		console.log(pageNumbers);
		return pageNumbers;
	};

	render() {
		console.log(this.props);
		console.log(this.state);
		return (
			<div className="pagination">
				<div onClick={() => this.props.prevPage()} className="page-number">
					Prev
				</div>
				{this.addPageNumbers()}
				<div onClick={() => this.props.nextPage()} className="page-number">
					Next
				</div>
			</div>
		);
	}
}

export default Pagination;

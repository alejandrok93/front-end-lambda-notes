import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import Fuse from 'fuse.js';

//Import components
import NotesList from './components/NotesList/NotesList';
import Menu from './components/Menu/Menu';
import NewNote from './components/NewNote/NewNote';
import NoteView from './components/NoteView/NoteView';
import Authenticate from './components/Authenticate/Authenticate.js';
import SearchBar from './components/SearchBar/SearchBar.js';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			notes: []
		};
	}

	componentDidMount() {
		const url = 'https://lambda-notes-backend-project.herokuapp.com/api/notes';
		const token = localStorage.getItem('jwt');
		const options = {
			headers: {
				Authorization: token
			}
		};
		//Get notes from Backend Project - 10/29/2018
		axios
			.get(url, options)
			.then(response => {
				console.log(response);
				this.setState({ ...this.state, notes: response.data });
			})
			.catch(err => console.log(err));
	}

	addNewNote(note) {
		console.log(note);
		const url = 'https://lambda-notes-backend-project.herokuapp.com/api/notes';
		const token = localStorage.getItem('jwt');
		const options = {
			headers: {
				Authorization: token
			}
		};
		if (note.title.length > 0) {
			axios
				.post(url, note, options)
				.then(response => {
					if (response.status === 201) {
						axios
							.get(url, options)
							.then(response =>
								this.setState({ ...this.state, notes: response.data })
							)
							.catch(err => {
								console.log(err);
							});
					}
				})
				.catch(err => {
					//console.log('there was an authorization error with token ' + token);
					console.log(err);
				});
		}
	}

	deleteNote(id) {
		const url = `https://lambda-notes-backend-project.herokuapp.com/api/notes/`;
		const url_with_id = `https://lambda-notes-backend-project.herokuapp.com/api/notes/${id}`;
		const token = localStorage.getItem('jwt');
		const options = {
			headers: {
				Authorization: token
			}
		};
		axios
			.delete(url_with_id)
			.then(res => {
				axios
					.get(url, options)
					.then(response =>
						this.setState({ ...this.state, notes: response.data })
					)
					.catch(err => console.log(err));
			})
			.catch(err => console.log(err));
	}

	updateNote(updatedNote) {
		const id = updatedNote.id;
		const url = `https://lambda-notes-backend-project.herokuapp.com/api/notes/`;
		const url_with_id = `https://lambda-notes-backend-project.herokuapp.com/api/notes/${id}`;
		const token = localStorage.getItem('jwt');
		const options = {
			headers: {
				Authorization: token
			}
		};
		axios
			.put(url_with_id, updatedNote)
			.then(res => {
				axios
					.get(url, options)
					.then(response =>
						this.setState({ ...this.state, notes: response.data })
					)
					.catch(err => console.log(err));
			})
			.catch(err => console.log(err));
	}

	getNoteFromState(id) {
		if (!id) {
			//do nothing
		}
		const noteArr = this.state.notes.filter(note => note.id.toString() === id);
		const note = noteArr[0];
		return note;
	}

	handleLogOut = e => {
		//remove JWT
		localStorage.removeItem('jwt');
		console.log(this);
		//e.preventDefault();

		//Push to main component to redirect to login
	};
	handleSearch = term => {
		let options = {
			shouldSort: true,
			tokenize: true,
			threshold: 0.6,
			location: 0,
			distance: 100,
			maxPatternLength: 32,
			minMatchCharLength: 1,
			keys: ['title', 'content']
		};

		if (term.length > 0) {
			const f = new Fuse(this.state.notes, options);
			const result = f.search(term);
			this.setState({ ...this.state, notes: result });
			console.log(result);
		}
	};
	render() {
		return (
			<div className="App">
				<Menu handleLogOut={this.handleLogOut} />
				<div className="container">
					{/* <SearchBar handleSearch={this.handleSearch} /> */}
					<Route
						exact
						path="/"
						render={props => <NotesList {...props} notes={this.state.notes} />}
					/>
					<Route
						exact
						path="/notes/:id"
						render={props => {
							let id = props.match.params.id;
							console.log(this.state.notes);

							const noteArr = this.state.notes.filter(
								note => note.id.toString() === id
							);
							const note = noteArr[0];
							console.log(note);
							return (
								<NoteView
									{...props}
									deleteNote={this.deleteNote.bind(this)}
									note={note}
								/>
							);
						}}
					/>
					<Route
						path="/new"
						render={() => <NewNote addNewNote={this.addNewNote.bind(this)} />}
					/>

					<Route
						path="/notes/:id/edit"
						render={props => {
							let id = props.match.params.id;
							const note = this.getNoteFromState(id);
							return (
								<NewNote
									{...props}
									updateNote={this.updateNote.bind(this)}
									addNewNote={this.addNewNote.bind(this)}
									isUpdatingNote="true"
									note={note}
								/>
							);
						}}
					/>
				</div>
			</div>
		);
	}
}

// const mapStateToProps = state => {
//   console.log(getNotesData);
//   console.log(state);
//   return {
//     notes: state.notes,
//     fetchingNotes: state.fetchingNotes,
//     fetchedNotes: state.fetchedNotes,
//     addingNote: state.addingNote,
//     addedNote: state.addedNote,
//     editingNote: state.editingNote,
//     editedNote: state.editedNote,
//     deletingNote: state.deletingNote,
//     deletedNote: state.deletedNote
//   };
// };

export default Authenticate(App);

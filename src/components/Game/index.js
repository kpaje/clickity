import React, { useState, useEffect } from "react";
import Container from "../Container";
import Jumbotron from "../Jumbotron";
import ClickItem from "../ClickItem";
import data from "../../data.json";

function Game() {
	const [score, setScore] = useState(0);
	const [topScore, setTopScore] = useState(0);

	// componentDidMount() {
	//   setState({ data: shuffleData(data) });
	// }

	useEffect(() => {
		shuffleData(data);
	}, []);

	const handleCorrectGuess = newData => {
		const newScore = score + 1;
		const newTopScore = Math.max(newScore, topScore);

		shuffleData(newData);
		setScore(newScore);
		setTopScore(newTopScore);
	};

	const handleIncorrectGuess = data => {
		resetData(data);
		setScore(0);
	};

	const resetData = data => {
		const resetData = data.map(item => ({ ...item, clicked: false }));
		return shuffleData(resetData);
	};

	const shuffleData = data => {
		let i = data.length - 1;
		while (i > 0) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = data[i];
			data[i] = data[j];
			data[j] = temp;
			i--;
		}
		return data;
	};

	const handleItemClick = id => {
		let guessedCorrectly = false;
		const newData = data.map(item => {
			const newItem = { ...item };
			if (newItem.id === id) {
				if (!newItem.clicked) {
					newItem.clicked = true;
					guessedCorrectly = true;
				}
			}
			return newItem;
		});
		guessedCorrectly
			? handleCorrectGuess(newData)
			: handleIncorrectGuess(newData);
	};

	return (
		<div>
			<Jumbotron />
			<Container>
				{data.map(item => (
					<ClickItem
						key={item.id}
						id={item.id}
						shake={!score && topScore}
						handleClick={handleItemClick}
						image={item.image}
					/>
				))}
			</Container>
		</div>
	);
}

export default Game;

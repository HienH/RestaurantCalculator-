import './App.css';
import MenuPrice from './MenuPrices.json';
import { useState } from 'react';
function App() {
	const selectionNumbers = [
		'2',
		'14',
		'30',
		'34',
		'76',
		'120',
		'173',
		'174',
		'221',
	];
	let [value, setValue] = useState('');
	let [total, setTotal] = useState(0);
	let [displayData, setDisplayData] = useState('');
	let [showLetters, setShowLetters] = useState(false);
	let [showDrinks, setShowDrinks] = useState(false);

	const hasNoLetters = ['2', '9', '120'];

	const hasA = ['14', '30', '34', '76', '120', '173', '174', '221'];

	const hasB = ['2', '9', '14', '30', '34', '76', '173', '174', '221'];

	const hasC = ['14', '34'];

	const hasD = ['14', '34'];

	let [receipt, setReciept] = useState([]);

	const addValue = (number) => {
		setDisplayData((displayData += number));
		setValue(value + number);
	};

	const minusFromOrder = (itemToremove) => {
		setReciept(receipt.filter((foodItem) => foodItem !== itemToremove));

		const currentTotal = (
			parseFloat(total) - parseFloat(itemToremove.price)
		).toFixed(2);

		setTotal(currentTotal);
	};

	const addToOrder = () => {
		const price = parseFloat(MenuPrice[value]);

		if (!price) {
			window.alert('This value does not exist');
			setDisplayData('');
			setValue('');
			return;
		}

		const foodObj = {
			price: price.toFixed(2),
			foodNumber: value,
		};
		setReciept([...receipt, foodObj]);

		const currentTotal = (parseFloat(total) + price).toFixed(2);

		setTotal(currentTotal);
		setValue('');
	};

	const finishCalculating = () => {
		const price = parseFloat(MenuPrice[value]);
		if (!price) {
			window.alert('This value does not exist');
			setDisplayData('');
			setValue('');
			return;
		}

		const foodObj = {
			price: price.toFixed(2),
			foodNumber: value,
		};
		setReciept([...receipt, foodObj]);

		const currentTotal = (parseFloat(total) + price).toFixed(2);
		setTotal(currentTotal);
		setValue('');
	};

	const operationFunction = (operation) => {
		if (operation == 'del') {
			setValue(value.slice(0, -1));
			return;
		}

		if (selectionNumbers.includes(value)) {
			setShowLetters(true);
			return;
		}
		switch (operation) {
			case '+':
				setDisplayData((displayData += operation));
				addToOrder();
				break;
			case '-':
				setDisplayData((displayData += operation));
				minusFromOrder();
				break;
			case '=':
				finishCalculating();
		}
	};

	const addLetter = (letter) => {
		setDisplayData((displayData += letter));
		const price = parseFloat(MenuPrice[(value += letter)]);
		if (!price) {
			window.alert('This value does not exist');
			setDisplayData('');
			setValue('');
			return;
		}
		const foodObj = {
			price: price.toFixed(2),
			foodNumber: value,
		};
		setReciept([...receipt, foodObj]);

		const currentTotal = (parseFloat(total) + price).toFixed(2);
		setTotal(currentTotal);
		setValue('');
		setShowLetters(false);
	};

	const addDrink = (drink) => {
		const foodObj = {
			price: drink.price.toFixed(2),
			foodNumber: drink.name,
		};
		setReciept([...receipt, foodObj]);
		const currentTotal = (parseFloat(total) + drink.price).toFixed(2);
		setTotal(currentTotal);
	};

	const onReset = () => {
		setDisplayData('');
		setReciept([]);
		setValue('');
		setTotal(0);
	};

	const drinks = [
		{
			name: 'Tea',
			price: 2,
		},
		{
			name: 'Fizzy/Water',
			price: 1.5,
		},
		{
			name: 'Juice/Lemonade',
			price: 3.5,
		},
		{
			name: 'Coffee/Beer',
			price: 4,
		},
		{
			name: 'Spirits',
			price: 3,
		},
		{
			name: 'GlassWine - Standard',
			price: 4.5,
		},
		{
			name: 'GlassWine - Special',
			price: 5.5,
		},
		{
			name: 'BottleWine - Standard',
			price: 13,
		},
		{
			name: 'BottleWine - Special',
			price: 16,
		},
		{
			name: 'Remy',
			price: 75,
		},
		{
			name: 'Tea',
			price: 2,
		},
	];

	return (
		<>
			<h1 className='title'>Van Hing Calculator</h1>
			<div className='container'>
				{!showDrinks && (
					<div className='calculator'>
						<div className='displayOutput'>{value}</div>
						{!showLetters && (
							<div className='buttons'>
								<button className='btn-number' onClick={() => addValue('1')}>
									1
								</button>
								<button className='btn-number' onClick={() => addValue('2')}>
									2
								</button>
								<button className='btn-number' onClick={() => addValue('3')}>
									3
								</button>
								<button className='btn-number' onClick={() => addValue('4')}>
									4
								</button>
								<button className='btn-number' onClick={() => addValue('5')}>
									5
								</button>
								<button className='btn-number' onClick={() => addValue('6')}>
									6
								</button>
								<button className='btn-number' onClick={() => addValue('7')}>
									7
								</button>
								<button className='btn-number' onClick={() => addValue('8')}>
									8
								</button>
								<button className='btn-number' onClick={() => addValue('9')}>
									9
								</button>
								<button
									className='btn-operator'
									// disabled={value1 === ''}
									onClick={() => operationFunction('del')}
								>
									Del
								</button>

								<button className='btn-number' onClick={() => addValue('0')}>
									0
								</button>

								<button
									className='btn-operator'
									// disabled={value1 === ''}
									onClick={() => operationFunction('+')}
								>
									+
								</button>

								<button className='btn-operator' onClick={() => onReset()}>
									Reset
								</button>
								<button
									className='btn-equals'
									onClick={() => operationFunction('=')}
								>
									=
								</button>
							</div>
						)}

						{showLetters && (
							<div className='buttons'>
								<button
									className='btn-number'
									disabled={!hasA.includes(value)}
									onClick={() => {
										addLetter('a');
									}}
								>
									a
								</button>
								<button
									className='btn-number'
									disabled={!hasB.includes(value)}
									onClick={() => {
										addLetter('b');
									}}
								>
									b
								</button>
								<button
									className='btn-number'
									disabled={!hasC.includes(value)}
									onClick={() => addLetter('c')}
								>
									c
								</button>
								<button
									className='btn-number'
									disabled={!hasD.includes(value)}
									onClick={() => addLetter('d')}
								>
									d
								</button>
								<button
									className='btn-number'
									disabled={!hasNoLetters.includes(value)}
									onClick={() => addLetter('')}
								>
									No letter
								</button>
							</div>
						)}
					</div>
				)}
				{showDrinks && (
					<>
						<h2 className='info'>Drinks:</h2>
						<div className='flex'>
							{drinks.map((drink, i) => (
								<div key={i} className='drink-items'>
									<button
										className='drink-button'
										onClick={() => addDrink(drink)}
									>
										{drink.name}
									</button>
								</div>
							))}
						</div>
					</>
				)}

				<button
					className='toggleButton'
					onClick={() => setShowDrinks((showDrinks) => !showDrinks)}
				>
					{showDrinks ? 'Food Calculator' : 'Add Drinks'}
				</button>
				{receipt.length >= 1 && (
					<div className='border'>
						<h2 className='info'>Receipt:</h2>
						<n />
						<div className='flex'>
							{receipt.map((foodItem, i) => (
								<div key={i} className='food-item'>
									<b>{foodItem.foodNumber}</b>: £{foodItem.price}
									<button
										className='remove-btn'
										onClick={() => minusFromOrder(foodItem)}
									>
										x
									</button>
								</div>
							))}
						</div>

						<div>
							<h2 className='border'>
								Total Price: <strong>£{total}</strong>
							</h2>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default App;

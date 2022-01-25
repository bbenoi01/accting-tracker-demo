import './month.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import { types } from '../../types';

import { logout, addRevenue, addExpense, addStartBal } from './actions';

const Month = ({ month }) => {
	const [entryType, setEntryType] = useState('');
	const [rItem, setRItem] = useState('');
	const [rAmount, setRAmount] = useState('');
	const [rNotes, setRNotes] = useState('');
	const [eItem, setEItem] = useState('');
	const [eAmount, setEAmount] = useState('');
	const [eNotes, setENotes] = useState('');
	const [revenue, setRevenue] = useState([]);
	const [expenses, setExpenses] = useState([]);
	const [totalRev, setTotalRev] = useState(0);
	const [totalExp, setTotalExp] = useState(0);
	const [startBal, setStartBal] = useState(0);
	const [startBalInput, setStartBalInput] = useState(0);
	const [hidden, setHidden] = useState(true);
	const formattedDate = dayjs(new Date().toDateString()).format('M/D/YYYY');
	const profit = totalRev - totalExp;
	const endBal = startBal + profit;
	const dispatch = useDispatch();

	useEffect(() => {
		setTotalRev(accounting(month?.revenue));
		setTotalExp(accounting(month?.expenses));
		setStartBal(month?.startBal);
	}, [month]);

	const accounting = (array, newObj) => {
		let forMath = [];
		if (newObj) {
			const acctMath = [...array, newObj];
			acctMath.forEach((item) => {
				forMath.push(parseFloat(item.amount));
			});
			const math = forMath.reduce((a, b) => a + b, 0);
			return math;
		} else {
			array.forEach((item) => {
				forMath.push(parseFloat(item.amount));
			});
			const math = forMath.reduce((a, b) => a + b, 0);
			return math;
		}
	};

	const handleAddStartBal = () => {
		const newStartBal = {
			startBal: startBalInput,
		};

		dispatch(addStartBal(month._id, newStartBal));
		setHidden(true);
	};

	const handleAddRevenue = () => {
		const newRev = {
			date: formattedDate,
			item: rItem,
			amount: parseFloat(rAmount),
			notes: rNotes,
		};

		dispatch(addRevenue(month._id, newRev));
		setRevenue([...month?.revenue, newRev]);
		setTotalRev(accounting(revenue, newRev));
		setRItem('');
		setRAmount('');
		setRNotes('');
	};

	const handleAddExpense = () => {
		const newExp = {
			date: formattedDate,
			item: eItem,
			amount: parseFloat(eAmount),
			notes: eNotes,
		};

		dispatch(addExpense(month._id, newExp));
		setExpenses([...expenses, newExp]);
		setTotalExp(accounting(expenses, newExp));
		setEItem('');
		setEAmount('');
		setENotes('');
	};

	return (
		<div className='month'>
			<div className='month-header'>
				<h2 className='month-title'>{month?.month + ' ' + month?.year}</h2>
			</div>
			<div className='month-overview'>
				<div className='overview-row-1'>
					<div className='sbal'>
						<label htmlFor='sbal' className='overview-row-label'>
							Starting Balance
						</label>
						$
						<input
							type='number'
							className='overview-start-bal-input'
							onChange={(e) => {
								console.log('val', e.target.value);
								e.target.value === ''
									? setStartBalInput(0)
									: setStartBalInput(parseFloat(e.target.value));
							}}
							onFocus={() => setHidden(false)}
							value={!startBalInput ? startBal : startBalInput}
						/>
						<FontAwesomeIcon
							icon='plus-circle'
							onClick={handleAddStartBal}
							className={
								hidden
									? 'overview-start-bal-input-btn-hidden'
									: 'overview-start-bal-input-btn'
							}
						/>
					</div>
					<div className='rev'>
						<label htmlFor='rev' className='overview-row-label'>
							Revenue
						</label>
						<p id='rev'>${totalRev.toFixed(2)}</p>
					</div>
				</div>
				<div className='overview-row-2'>
					<div className='exp'>
						<label htmlFor='exp' className='overview-row-label'>
							Expenses
						</label>
						<p id='exp'>${totalExp.toFixed(2)}</p>
					</div>
				</div>
				<div className='overview-row-3'>
					<div className='ebal'>
						<label htmlFor='ebal' className='overview-row-label'>
							Ending Balance
						</label>
						<p id='ebal'>${endBal.toFixed(2)}</p>
					</div>
					<div className='profit'>
						<label htmlFor='profit' className='overview-row-label'>
							Profit
						</label>
						<p id='profit'>${profit.toFixed(2)}</p>
					</div>
				</div>
			</div>
			<div className='month-body-mobile'>
				<div className='month-entry-select-container'>
					<select
						value={entryType}
						onChange={(e) => setEntryType(e.target.value)}
						className='month-entry-select'
					>
						<option value=''>Choose</option>
						<option value='rev'>Revenue</option>
						<option value='exp'>Expense</option>
					</select>
				</div>
				{entryType && (
					<div className='month-entry'>
						<div className='card month-entry-card'>
							<div
								className={
									entryType === 'rev'
										? 'month-entry-card-header rev-h'
										: entryType === 'exp'
										? 'month-entry-card-header exp-h'
										: null
								}
							>
								<h3 className='month-entry-card-title'>
									{entryType === 'rev'
										? 'REVENUE'
										: entryType === 'exp'
										? 'EXPENSES'
										: null}
								</h3>
								{(entryType === 'rev' && !rItem) ||
								(entryType === 'rev' && !rAmount) ||
								(entryType === 'rev' && !rNotes) ||
								(entryType === 'exp' && !eItem) ||
								(entryType === 'exp' && !eAmount) ||
								(entryType === 'exp' && !eNotes) ? (
									<FontAwesomeIcon
										icon='plus-square'
										className='month-entry-card-add-icon'
									/>
								) : (
									<FontAwesomeIcon
										icon='plus-square'
										className='month-entry-card-add-icon'
										onClick={
											entryType === 'rev'
												? handleAddRevenue
												: entryType === 'exp'
												? handleAddExpense
												: null
										}
									/>
								)}
							</div>
							<div className='card-body'>
								<div className='month-entry-card-table-headers'>
									<div className='section'>Date</div>
									<div className='section'>Item</div>
									<div className='section'>Amount</div>
									<div className='section'>Notes</div>
								</div>
								<div className='month-entry-card-table-data'>
									<div className='section'>{formattedDate}</div>
									<div className='section'>
										<input
											type='text'
											className='month-entry-card-input'
											onChange={
												entryType === 'rev'
													? (e) => setRItem(e.target.value)
													: entryType === 'exp'
													? (e) => setEItem(e.target.value)
													: null
											}
											value={
												entryType === 'rev'
													? rItem
													: entryType === 'exp'
													? eItem
													: null
											}
										/>
									</div>
									<div className='section'>
										<input
											type='number'
											className='month-entry-card-input'
											onChange={
												entryType === 'rev'
													? (e) => setRAmount(e.target.value)
													: entryType === 'exp'
													? (e) => setEAmount(e.target.value)
													: null
											}
											value={
												entryType === 'rev'
													? rAmount
													: entryType === 'exp'
													? eAmount
													: null
											}
										/>
									</div>
									<div className='section'>
										<input
											type='text'
											className='month-entry-card-input'
											onChange={
												entryType === 'rev'
													? (e) => setRNotes(e.target.value)
													: entryType === 'exp'
													? (e) => setENotes(e.target.value)
													: null
											}
											value={
												entryType === 'rev'
													? rNotes
													: entryType === 'exp'
													? eNotes
													: null
											}
										/>
									</div>
								</div>
							</div>
							{entryType === 'rev' &&
								month?.revenue.map((lineItem) => (
									<div
										key={lineItem.item}
										className='month-entry-card-table-data'
									>
										<div className='section'>{lineItem.date}</div>
										<div className='section'>{lineItem.item}</div>
										<div className='section'>
											${parseFloat(lineItem.amount).toFixed(2)}
										</div>
										<div className='section'>{lineItem.notes}</div>
									</div>
								))}
							{entryType === 'exp' &&
								month?.expenses.map((lineItem) => (
									<div
										key={lineItem.item}
										className='month-entry-card-table-data'
									>
										<div className='section'>{lineItem.date}</div>
										<div className='section'>{lineItem.item}</div>
										<div className='section'>
											${parseFloat(lineItem.amount).toFixed(2)}
										</div>
										<div className='section'>{lineItem.notes}</div>
									</div>
								))}
							<div className='month-entry-card-footer'>
								<label htmlFor='total'>
									{entryType === 'rev'
										? 'TOTAL REVENUE'
										: entryType === 'exp'
										? 'TOTAL EXPENSES'
										: null}
								</label>
								<p>
									$
									{entryType === 'rev'
										? parseFloat(totalRev).toFixed(2)
										: entryType === 'exp'
										? parseFloat(totalExp).toFixed(2)
										: null}
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
			<div className='month-body-full'>
				<div className='month-revenue'>
					<div className='card month-entry-card'>
						<div className='month-entry-card-header rev-h'>
							<h3 className='month-entry-card-title'>REVENUE</h3>
							{!rItem || !rAmount || !rNotes ? (
								<FontAwesomeIcon
									icon='plus-square'
									className='month-entry-card-add-icon'
								/>
							) : (
								<FontAwesomeIcon
									icon='plus-square'
									className='month-entry-card-add-icon'
									onClick={handleAddRevenue}
								/>
							)}
						</div>
						<div className='card-body'>
							<div className='month-entry-card-table-headers'>
								<div className='section'>Date</div>
								<div className='section'>Item</div>
								<div className='section'>Amount</div>
								<div className='section'>Notes</div>
							</div>
							<div className='month-entry-card-table-data'>
								<div className='section'>{formattedDate}</div>
								<div className='section'>
									<input
										type='text'
										className='month-entry-card-input'
										onChange={(e) => setRItem(e.target.value)}
										value={rItem}
									/>
								</div>
								<div className='section'>
									<input
										type='number'
										className='month-entry-card-input'
										onChange={(e) => setRAmount(e.target.value)}
										value={rAmount}
									/>
								</div>
								<div className='section'>
									<input
										type='text'
										className='month-entry-card-input'
										onChange={(e) => setRNotes(e.target.value)}
										value={rNotes}
									/>
								</div>
							</div>
						</div>
						{month?.revenue &&
							month?.revenue.map((lineItem) => (
								<div
									key={lineItem.item}
									className='month-entry-card-table-data'
								>
									<div className='section'>{lineItem.date}</div>
									<div className='section'>{lineItem.item}</div>
									<div className='section'>
										${parseFloat(lineItem.amount).toFixed(2)}
									</div>
									<div className='section'>{lineItem.notes}</div>
								</div>
							))}
						<div className='month-entry-card-footer'>
							<label htmlFor='rev-total'>TOTAL REVENUE</label>
							<p>${parseFloat(totalRev).toFixed(2)}</p>
						</div>
					</div>
				</div>
				<div className='month-expenses'>
					<div className='card month-entry-card'>
						<div className='month-entry-card-header exp-h'>
							<h3 className='month-entry-card-title'>EXPENSES</h3>
							{!eItem || !eAmount || !eNotes ? (
								<FontAwesomeIcon
									icon='plus-square'
									className='month-entry-card-add-icon'
								/>
							) : (
								<FontAwesomeIcon
									icon='plus-square'
									className='month-entry-card-add-icon'
									onClick={handleAddExpense}
								/>
							)}
						</div>
						<div className='card-body'>
							<div className='month-entry-card-table-headers'>
								<div className='section'>Date</div>
								<div className='section'>Item</div>
								<div className='section'>Amount</div>
								<div className='section'>Notes</div>
							</div>
							<div className='month-entry-card-table-data'>
								<div className='section'>{formattedDate}</div>
								<div className='section'>
									<input
										type='text'
										className='month-entry-card-input'
										onChange={(e) => setEItem(e.target.value)}
										value={eItem}
									/>
								</div>
								<div className='section'>
									<input
										type='number'
										className='month-entry-card-input'
										onChange={(e) => setEAmount(e.target.value)}
										value={eAmount}
									/>
								</div>
								<div className='section'>
									<input
										type='text'
										className='month-entry-card-input'
										onChange={(e) => setENotes(e.target.value)}
										value={eNotes}
									/>
								</div>
							</div>
						</div>
						{month?.expenses &&
							month?.expenses.map((lineItem) => (
								<div
									key={lineItem.item}
									className='month-entry-card-table-data'
								>
									<div className='section'>{lineItem.date}</div>
									<div className='section'>{lineItem.item}</div>
									<div className='section'>
										${parseFloat(lineItem.amount).toFixed(2)}
									</div>
									<div className='section'>{lineItem.notes}</div>
								</div>
							))}
						<div className='month-entry-card-footer'>
							<label htmlFor='total-exp'>TOTAL EXPENSES</label>
							<p>${parseFloat(totalExp).toFixed(2)}</p>
						</div>
					</div>
				</div>
			</div>
			<Link
				to='/main'
				className='back-btn'
				onClick={() => dispatch({ type: types.CLEAR_MONTH })}
			>
				<FontAwesomeIcon
					icon={'arrow-alt-circle-left'}
					className='back-btn-icon'
				/>
			</Link>
			<Link to='/'>
				<button
					type='button'
					className='btn logout'
					onClick={() => dispatch(logout())}
				>
					Logout
				</button>
			</Link>
		</div>
	);
};

export default Month;

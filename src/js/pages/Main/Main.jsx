import './main.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import dayjs from 'dayjs';

import { logout, setMonth, getRecords, createNewYear } from './actions';

const Main = ({ records }) => {
	const [year, setYear] = useState(undefined);
	const formattedDate = parseInt(
		dayjs(new Date().toDateString()).format('YYYY')
	);
	let years = [];
	for (let i = formattedDate; years.length < 12; i++) {
		years.push(i);
	}
	const dispatch = useDispatch();

	const doTheMath = (array) => {
		let forMath = [];
		array.forEach((item) => {
			forMath.push(parseFloat(item.amount));
		});
		const math = forMath.reduce((a, b) => a + b, 0);
		return math;
	};

	const handleUpdateSumaryYear = (e) => {
		if (isNaN(e.target.value)) {
			setYear(undefined);
		} else {
			setYear(e.target.value);
			dispatch(getRecords(`/?year=${e.target.value}`));
		}
	};

	const handleAddNewYear = () => {
		dispatch(createNewYear(formattedDate + 1));
		setYear(formattedDate + 1);
	};

	return (
		<div className='main'>
			<div className='main-card'>
				<div className='main-card-header'>
					<div className='main-select-container'>
						<select
							value={year}
							onChange={handleUpdateSumaryYear}
							className='main-select'
						>
							<option defaultValue={undefined}>Choose</option>
							{years &&
								years.map((singleYear) => (
									<option key={singleYear} value={singleYear}>
										{singleYear}
									</option>
								))}
						</select>
					</div>
					<h3 className='main-card-title'>
						{year === undefined ? formattedDate : year} Year Summary
					</h3>
					<button className='btn main-new-year-btn' onClick={handleAddNewYear}>
						New Year
					</button>
				</div>
				<div className='main-card-body'>
					<div className='main-card-table-headers'>
						<div className='section'>Month</div>
						<div className='section'>Revenue</div>
						<div className='section'>Expenses</div>
						<div className='section'>Profit</div>
					</div>
					{records &&
						records.map((record) => {
							const rev = doTheMath(record?.revenue).toFixed(2);
							const exp = doTheMath(record?.expenses).toFixed(2);
							const pro = (rev - exp).toFixed(2);
							let revBackground;
							let revText;
							let expBackground;
							let expText;
							let proBackground;
							let proText;

							if (records.indexOf(record) > 0) {
								const prevMonth = records.indexOf(record) - 1;
								const prevMonthRev = doTheMath(
									records[prevMonth].revenue
								).toFixed(2);
								const prevMonthExp = doTheMath(
									records[prevMonth].expenses
								).toFixed(2);
								const prevMonthPro = (prevMonthRev - prevMonthExp).toFixed(2);

								if (rev == 0) {
									revBackground = 'inherit';
								} else if (parseFloat(rev) === parseFloat(prevMonthRev)) {
									revBackground = 'yellow';
									revText = 'black';
								} else if (parseFloat(rev) > parseFloat(prevMonthRev)) {
									revBackground = 'green';
								} else if (parseFloat(rev) < parseFloat(prevMonthRev)) {
									revBackground = 'red';
								}

								if (exp == 0) {
									expBackground = 'inherit';
								} else if (parseFloat(exp) === parseFloat(prevMonthExp)) {
									expBackground = 'yellow';
									expText = 'black';
								} else if (parseFloat(exp) > parseFloat(prevMonthExp)) {
									expBackground = 'green';
								} else if (parseFloat(exp) < parseFloat(prevMonthExp)) {
									expBackground = 'red';
								}

								if (exp == 0) {
									expBackground = 'inherit';
								} else if (parseFloat(exp) === parseFloat(prevMonthExp)) {
									expBackground = 'yellow';
									expText = 'black';
								} else if (parseFloat(exp) > parseFloat(prevMonthExp)) {
									expBackground = 'green';
								} else if (parseFloat(exp) < parseFloat(prevMonthExp)) {
									expBackground = 'red';
								}

								if (pro == 0) {
									proBackground = 'inherit';
								} else if (parseFloat(pro) === parseFloat(prevMonthPro)) {
									proBackground = 'yellow';
									proText = 'black';
								} else if (parseFloat(pro) > parseFloat(prevMonthPro)) {
									proBackground = 'green';
								} else if (parseFloat(pro) < parseFloat(prevMonthPro)) {
									proBackground = 'red';
								}
							}

							return (
								<div key={record._id} className='main-card-table-data'>
									<div className='section'>
										<Link
											to={`/month/${record.month}`}
											className='link'
											onClick={() => dispatch(setMonth(record))}
										>
											{record.month}
										</Link>
									</div>
									<div
										className='section'
										style={{ backgroundColor: revBackground, color: revText }}
									>
										${rev}
									</div>
									<div
										className='section'
										style={{ backgroundColor: expBackground, color: expText }}
									>
										${exp}
									</div>
									<div
										className='section'
										style={{ backgroundColor: proBackground, color: proText }}
									>
										${pro}
									</div>
								</div>
							);
						})}
				</div>
			</div>
			<button
				type='button'
				className='btn logout'
				onClick={() => dispatch(logout())}
			>
				Logout
			</button>
		</div>
	);
};

function mapStoreToProps(store) {
	return {
		records: store.auth.records,
	};
}

export default connect(mapStoreToProps)(Main);

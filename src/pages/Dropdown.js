

import React, { useState } from 'react'; 
import { Form } from 'react-bootstrap'; 
const SelectDropdown = () => { 
	const [select_Courses, set_Select_Courses] = 
		useState([]); 
	const [isOpen, setIsOpen] = useState(false); 
	const courses = [ 
		{ id: 1, label: 'Wasim' }, 
		{ id: 2, label: 'Diwakar' }, 
		{ id: 3, label: 'Sahil' }, 
		{ id: 4, label: 'Aakash' }, 
		{ id: 5, label: 'Ankit' } 
	]; 
	const dropDownShow = () => { 
		setIsOpen(!isOpen); 
	}; 
	const courseChange = (event) => { 
		const courseId = 
			parseInt(event.target.value); 
		const choosen = event.target.checked; 

		if (choosen) { 
			set_Select_Courses( 
				[...select_Courses, courseId]); 
		} else { 
			set_Select_Courses( 
				select_Courses.filter((id) => 
					id !== courseId)); 
		} 
	}; 
	return ( 
		<div> 
			<div className="d-flex justify-content-center"> 
				<div className="custom-dropdown"> 
					<button 
						className= 
							"custom-dropdown-toggle green-button"
						type="button"
						id="multiSelectDropdown"
						onClick={dropDownShow} style={{width:'100%'}}>
						Select Students
					</button> 
					{isOpen && ( 
						<div className= 
								{`custom-dropdown-menu 
									${isOpen ? 'show' : ''}`} 
								aria-labelledby="multiSelectDropdown" style={{marginTop:'1rem'}}> 
							{courses.map((option) => ( 
								<Form.Check 
									className="custom-checkbox"
									key={option.id} 
									type="checkbox"
									id={`option_${option.id}`} 
									label={option.label} 
									checked= 
										{select_Courses.includes(option.id)} 
									onChange={courseChange} 
									value={option.id} 
								/> 
							))} 
						</div> 
					)} 
				</div> 
				{/* <div style={{ marginLeft: '20px', width: '50%' }}> 
					<h2>Selected Items:</h2> 
					<ul> 
						{select_Courses.map((optionId) => ( 
							<li key={optionId}> 
								{courses.find(option => 
									option.id === optionId)?.label} 
							</li> 
						))} 
					</ul> 
				</div>  */}
			</div> 
		</div> 
	); 
}; 

export default SelectDropdown;

import React from 'react';
import Navbar from '../../features/nav/Navbar';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import { Container } from 'semantic-ui-react';

const App = () => {
	return (
		<>
			<Navbar />
			<Container className='main'>
				<EventDashboard />
			</Container>
		</>
	);
};

export default App;

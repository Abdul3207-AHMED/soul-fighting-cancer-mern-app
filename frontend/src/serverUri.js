export default process.env.REACT_APP_ENV === 'DEVELOPMENT'
	? 'http://localhost:5000'
	: '';

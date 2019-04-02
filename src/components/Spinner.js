import styled from 'styled-components'

export default styled.div`
	display: inline-block;
	width: 50px;
	height: 50px;
	border: 3px solid rgba(255, 255, 255, 0.3);
	border-radius: 50%;
	border-top-color: #101010;
	animation: spin 1s ease-in-out infinite;
	-webkit-animation: spin 1s ease-in-out infinite;

	@keyframes spin {
		to {
			-webkit-transform: rotate(360deg);
		}
	}
	@-webkit-keyframes spin {
		to {
			-webkit-transform: rotate(360deg);
		}
	}
`
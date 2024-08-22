import { React } from "react";
// import ClipLoader from "react-spinners/ClipLoader";

import PropagateLoader from "react-spinners/PropagateLoader";

const override = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	margin: "100px auto",
};

const Spinner = ({ loading }) => {
	return (
		<PropagateLoader
			color="#4338ca"
			loading={loading}
			cssOverride={override}
			size={20}
		/>
	);
};

export default Spinner;

import { React } from "react";
// import ClipLoader from "react-spinners/ClipLoader";

import PropagateLoader from "react-spinners/PropagateLoader";

const override = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	margin: "100px auto",
};

const PageLoader = ({ loading }) => {
	return (
		<PropagateLoader
			color="#839bcf"
			loading={loading}
			cssOverride={override}
			size={20}
		/>
	);
};

export default PageLoader;

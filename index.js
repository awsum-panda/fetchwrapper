/**
*   @constructor
*   @param {string} url - Is required, must be a non-empty string.
*   @param {object} options  - Defaults to simple GET with json, otherwise takes fetch options object.
*   @param {string} custom_err_msg - Optional, defaults to null.
*/

module.exports = async function fetchWrapper(
	url,
	// DEFAULT options
	options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		}
	},
	// DEFAULT custom_err_msg
	custom_err_msg = null) {
	if (!url || typeof url !== "string") {
		const msg = typeof url === "string" && !url.length ? "empty string" : typeof url;
		throw new Error("fetchWrapper() url expects string, but got '" + msg + "'");
	}
	return fetch(url, options)
		.then((resp) => {
			if (!resp.ok) {
				throw new Error(resp.statusText); // INFO Option 1
				// throw new Error(resp.status) // INFO Option 2
			}
			// HANDLE no content response
			if (resp.status === 204) {
				return "no content";
			}
			// HANDLE not json
			try {
				const json = resp.json();
				return json;
			} catch (error) {
				console.error(error);
				return resp.text();
			}
		})
		.then((data) => {
			return data;
		})
		.catch((err) => {
			// HANDLE errors and custom error messages, must be a string
			if (typeof custom_err_msg === "string") {
				console.error(`${custom_err_msg}`, err);
				return `${custom_err_msg}\n${err}`; // INFO Option 1
				// return `${custom_err_msg}\n${err.statusText}`; // INFO Option 2
			} else {
				return err; // INFO Option 1
				// INFO Option 2
				// if (err.toString().substr(7, err.length) == 404) {
				// 	return "Not found";
				// } else {
				// 	return err;
				// }
			}
		});
}
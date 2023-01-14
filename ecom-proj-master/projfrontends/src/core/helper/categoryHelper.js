const { API } = require("../../backend");

//get all categories
export const getCategoryById = (Info) => {
    return fetch(`${API}/products/category`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body:JSON.stringify(Info)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  
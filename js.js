"use strict";
const create = document.querySelector(".create");
const update = document.querySelector(".update");
const deleted = document.querySelector(".delete");
const post = { title: "foo", body: "bar", userID: 1 };
const postArr = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(post),
};
const patchArr = {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "boo" }),
};
const deleteArr = {
  method: "DELETE",
};

async function fetchApi(optionObj, url) {
  try {
    const response = await fetch(url, optionObj);
    manageErrors(response);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    alert(error);
  }
}

function fetchApiThen(optionObj, url) {
  try {
    fetch(url, optionObj)
      .then((fetched) => manageErrors(fetched))
      .then((response) => response.json())
      .then((data) => console.log(data));
  } catch (error) {
    alert(error);
  }
}

function manageErrors(response) {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
}

create.addEventListener("click", function () {
  fetchApiThen(postArr, "https://jsonplaceholder.typicode.com/posts");
});
update.addEventListener("click", function () {
  fetchApi(patchArr, "https://jsonplaceholder.typicode.com/posts/{}");
});
deleted.addEventListener("click", function () {
  fetchApi(deleteArr, "https://jsonplaceholder.typicode.com/posts/1");
});

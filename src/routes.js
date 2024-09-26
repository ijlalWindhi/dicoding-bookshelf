import {
  addBooks,
  getAllBooks,
  getBooksById,
  editBooksById,
  deleteBooksById,
} from "./handler.js";

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBooks,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooks,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBooksById,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: editBooksById,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBooksById,
  },
];

export default routes;

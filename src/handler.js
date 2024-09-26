import { nanoid } from "nanoid";
import books from "./books.js";

const addBooks = (request, h) => {
  // Mendapatkan data dari body request
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  //   Jika client tidak melampirkan properti name pada request body, maka server harus merespons dengan gagal dan status code 400.
  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  //   Jika client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount, maka server harus merespons dengan gagal dan status code 400.
  if (Number(readPage) > Number(pageCount)) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  //   Mendefinisikan properti yang akan dimasukkan ke dalam array books
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBooks = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  //   Menambahkan data buku baru ke dalam array books
  books.push(newBooks);

  //   Mengecek apakah buku berhasil ditambahkan ke dalam array books
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  //   Jika buku berhasil ditambahkan, server harus merespons dengan berhasil dan status code 201.
  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
};

const getAllBooks = (_request, h) => {
  const filteredBooks = books;

  const response = h.response({
    status: "success",
    data: {
      books: filteredBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

const getBooksById = (request, h) => {
  const { bookId } = request.params;
  //   Mendapatkan data buku berdasarkan id yang diberikan oleh client
  const book = books.filter((n) => n.id === bookId)[0];

  //   Jika buku ditemukan, server harus merespons dengan berhasil dan status code 200.
  if (book !== undefined) {
    const response = h.response({
      status: "success",
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }

  //   Jika buku tidak ditemukan, server harus merespons dengan gagal dan status code 404.
  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editBooksById = (request, h) => {
  //  Mendapatkan data dari parameter path
  const { bookId } = request.params;

  //   Mendapatkan data dari body request
  const { name, year, author, summary, publisher, pageCount, readPage } =
    request.payload;

  //   Mendefinisikan properti updatedAt
  const updatedAt = new Date().toISOString();

  //   Mendapatkan index buku berdasarkan id yang diberikan oleh client
  const index = books.findIndex((book) => book.id === bookId);

  //   Jika buku ditemukan, maka server harus merespons dengan berhasil dan status code 200.
  if (index !== -1) {
    if (name && readPage <= pageCount) {
      books[index] = {
        ...books[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        updatedAt,
      };
      //   Jika buku berhasil diperbarui, server harus merespons dengan berhasil dan status code 200.
      const response = h.response({
        status: "success",
        message: "Buku berhasil diperbarui",
      });
      response.code(200);
      return response;
    } else if (!name) {
      // Jika client tidak melampirkan properti name pada request body, maka server harus merespons dengan gagal dan status code 400.
      const response = h.response({
        status: "fail",
        message: "Gagal memperbarui buku. Mohon isi nama buku",
      });
      response.code(400);
      return response;
    } else if (readPage > pageCount) {
      //   Jika client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount, maka server harus merespons dengan gagal dan status code 400.
      const response = h.response({
        status: "fail",
        message:
          "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
      });
      response.code(400);
      return response;
    }
  } else {
    //  Jika buku tidak ditemukan, server harus merespons dengan gagal dan status code 404.
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    });
    response.code(404);
    return response;
  }
};

const deleteBooksById = (request, h) => {
  // Mendapatkan data dari parameter path
  const { bookId } = request.params;

  //   Mendapatkan index buku berdasarkan id yang diberikan oleh client
  const bookIndex = books.findIndex((book) => book.id === bookId);

  //   Jika buku ditemukan, maka server harus merespons dengan berhasil dan status code 200.
  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  //   Jika buku tidak ditemukan, server harus merespons dengan gagal dan status code 404.
  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

export { addBooks, getAllBooks, getBooksById, editBooksById, deleteBooksById };

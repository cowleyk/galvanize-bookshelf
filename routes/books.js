'use strict';

const express = require('express');
// const boom = require('boom');
// eslint-disable-next-line new-cap
const router = express.Router();
var knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');


// YOUR CODE HERE

router.get('/books', (_req, res, next) => {
  knex('books')
    .orderBy('title')
    .then((rows) => {
      const books = camelizeKeys(rows);
      res.send(books);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/books/:id', (req, res, next) => {
    knex('books')
    .where('id', req.params.id)
    .first()
    .then((rows) => {
      const books = camelizeKeys(rows);
      if (!books) {
        return next();
      }

      res.send(books);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/books/', (req,res,next) => {
  // console.log(req);
  knex('books')
  .insert({
    title:req.body.title,
    author:req.body.author,
    genre:req.body.genre,
    description:req.body.description,
    cover_url:req.body.coverUrl
  }, '*')
  // .first()
  .then((rows) => {
    const books = camelizeKeys(rows);
    res.send(books[0]);
  })
  .catch((err) => {
    next(err);
  });
});

router.patch('/books/:id', (req,res,next) => {
  knex('books')
  .where('id', req.params.id)
  .first()
  .then((rows) => {
    const books = camelizeKeys(rows);
    if (!books) {
      return next();
    }

    return knex('books')
      .update({
        author: req.body.author,
        cover_url: req.body.coverUrl,
        description: req.body.description,
        genre: req.body.genre,
        title: req.body.title
      }, '*')
      .where('id', req.params.id);
  })
  .then((rows) => {
    const books = camelizeKeys(rows);
    res.send(books[0]);
  })
  .catch((err) => {
    next(err);
  });
});

router.delete('/books/:id', (req, res, next) => {
  let book;

  knex('books')
    .where('id', req.params.id)
    .first()
    .then((row) => {

      if (!row) {
        return next();
      }

      book = camelizeKeys(row);

      return knex('books')
        .del()
        .where('id', req.params.id);
    })
    .then(() => {
      delete book.id;
      res.send(book);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;

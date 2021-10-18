const Koa = require('koa');
const koaRouter = require('koa-router')();
const koaBodyParser = require('koa-bodyparser');
const koaJson = require('koa-json');
const koaCors = require('koa-cors');
const sqlite = require('sqlite3').verbose();

let db = new sqlite.Database('../db/thermal.db', e => {
  if (e) {
    throw e
  }
})

const app = new Koa();

app.use(koaJson());
app.use(koaCors());

koaRouter.get('/temperature', async (ctx, next) => {
  let sql = `select temperature as data, create_date as createDate from thermal`;
  let rowData = await new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    })
  })
  ctx.body = rowData;
})

koaRouter.get('/humidity', async (ctx, next) => {
  let sql = `select humidity as data, create_date as createDate from thermal`;
  let rowData = await new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    })
  })
  ctx.body = rowData;
})

koaRouter.get('/pressure', async (ctx, next) => {
  let sql = `select pressure as data, create_date as createDate from thermal`;
  let rowData = await new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      }
      rows.forEach(item => {
        item.data = item.data / 1000
      })
      resolve(rows);
    })
  })
  ctx.body = rowData;
})

koaRouter.get('/altitude', async (ctx, next) => {
  let sql = `select altitude as data, create_date as createDate from thermal`;
  let rowData = await new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    })
  })
  ctx.body = rowData;
})

app.use(koaRouter.routes());
app.use(koaRouter.allowedMethods());

app.listen(5000, () => { });
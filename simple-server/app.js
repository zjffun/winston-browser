const render = require("./lib/render");
const koaLogger = require("koa-logger");
const router = require("koa-router")();
const koaBody = require("koa-body");
const uuidv1 = require("uuid/v1");
const Koa = require("koa");
const {
  createLogger,
  format,
  transports,
  config: winstonConfig
} = require("winston");

const app = (module.exports = new Koa());

const defaultLevel = "info";

// middleware

app.use(koaLogger());

app.use(render);

app.use(koaBody());

// route definitions

router
  .get("/", list)
  .get("/api/list", apiList)
  .get("/log/new", add)
  .get("/log/:id", show)
  .all("/inputs/:token/tag/:tags", inputs);

app.use(router.routes());

// logger
const { combine, timestamp, json } = format;
const logger = createLogger({
  level: "info",
  levels: winstonConfig.syslog.levels,
  format: combine(timestamp(), json()),
  transports: [new transports.File({ filename: "combined.log" })]
});

async function inputs(ctx) {
  try {
    const { token, tags } = ctx.params;
    const body = ctx.request.body;
    const content = typeof body === "object" ? body : { data: body };
    const level = content.level || defaultLevel;

    const log = {
      ...content,
      level,
      tags: tags.split(","),
      id: uuidv1(),
      token
    };

    logger.log(log);
  } catch (e) {
    ctx.throw(400, e);
  }

  ctx.body = { response: "ok" };
}

async function list(ctx) {
  const options = {
    from: new Date() - 30 * 24 * 60 * 60 * 1000,
    until: new Date(),
    limit: 999,
    start: 0,
    order: "desc"
  };

  const logs = await new Promise((res, rej) =>
    logger.query(options, function(err, results) {
      if (err) {
        rej(err);
      }
      res(results);
    })
  );
  await ctx.render("list", { logs: logs.file });
}

async function apiList(ctx) {
  const options = {
    from: new Date() - 36 * 30 * 24 * 60 * 60 * 1000,
    until: new Date(),
    limit: 999,
    start: 0,
    order: "desc"
  };

  const logs = await new Promise((res, rej) =>
    logger.query(options, function(err, results) {
      if (err) {
        rej(err);
      }
      res(results);
    })
  );
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.body = logs;
}

async function add(ctx) {
  await ctx.render("new");
}

async function show(ctx) {
  const id = ctx.params.id;
  const options = {
    from: new Date() - 30 * 24 * 60 * 60 * 1000,
    until: new Date(),
    limit: 999,
    start: 0,
    order: "desc"
  };

  const logs = await new Promise((res, rej) =>
    logger.query(options, function(err, results) {
      if (err) {
        rej(err);
      }
      res(results);
    })
  );

  if (!logs.file.length) ctx.throw(404, "invalid post id");

  const log = logs.file.find(d => d.id === id);
  await ctx.render("show", { log });
}

// listen

if (!module.parent) app.listen(3000);

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// 生成session
var session = require("express-session");
// 将sessionId存入mongodb中
var MongoStore = require("connect-mongo");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var loginRouter = require("./routes/login");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// TODO:注册session中间件，创建session
app.use(
    session({
        name: "backstage",
        secret: "xxxx",
        cookie: {
            maxAge: 1000 * 60 * 60,
            secure: false,
        },
        resave: true,
        saveUninitialized: true,
        // TODO:创建数据库存储session
        store:MongoStore.create({
            mongoUrl:"mongodb://127.0.0.1:27017/backstage_session",
            ttl: 1000 * 60 * 60, //过期时间
        })
    })
);
// TODO:设置中间件，session过期校验
app.use((req, res, next) => {
    // TODO:排除login相关的接口和路由，放行login
    if (req.url.includes("login")) {   
        next();
        return;
    }
    if (req.session.user) {
        // TODO:重新设置session
        req.session.mydate=Date.now();
        next();
    } else {
        // TODO:是接口就返回错误码，不是接口就重定向
        req.url.includes("api")
            ? res.status(401).send({ok: 0})
            : res.redirect("/login");
    }
});

app.use("/", indexRouter);
app.use("/api", usersRouter);
app.use("/login", loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
